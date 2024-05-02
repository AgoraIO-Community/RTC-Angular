import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core'
import { ILocalTrack, IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { AgoraService } from '../agora.service';
import { MediaControlsComponent } from '../media-controls/media-controls.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-local-stream',
  standalone: true,
  imports: [MediaControlsComponent],
  templateUrl: './local-stream.component.html',
  styleUrl: './local-stream.component.css'
})
export class LocalStreamComponent implements AfterViewInit {
  @ViewChild('localVideo', { static: true }) localVideo!: ElementRef<HTMLDivElement>;
  @Output() leaveChannel = new EventEmitter<void>();
  private localMicTrack!: ILocalTrack;
  private localVideoTrack!: ILocalTrack;
  // private localScreenTracks?: ILocalTrack[];

  private client: IAgoraRTCClient;

  private channelJoined: boolean = false;
  private subscription: Subscription = new Subscription();

  private localTracksActive = {
    audio: false,
    video: false,
    screen: false,
  }

  constructor(private agoraService: AgoraService) {
    this.client = this.agoraService.getClient()
  }

  async ngAfterViewInit(): Promise<void> {
    [ this.localMicTrack, this.localVideoTrack ] = await this.agoraService.setupLocalTracks();
    this.localTracksActive.audio = this.localMicTrack ? true : false
    this.localTracksActive.video = this.localVideoTrack ? true : false
    // play video track in localStreamComponent div
    this.localVideoTrack.play(this.localVideo.nativeElement);
    this.subscription.add(this.agoraService.channelJoined$.subscribe(status => {
      this.channelJoined = status
      if(status) {
        this.publishTracks() // publish the tracks once we are in the channel
      }
    }))
  }

  async ngOnDestroy() {
    // leave the channel if the component unmounts
    this.handleLeaveChannel()
  }

  getTrackState(trackName: string): boolean | undefined {
    switch (trackName) {
      case 'mic':
        return this.localTracksActive.audio
      case 'video':
        return this.localTracksActive.video
      case 'screen':
        return this.localTracksActive.screen
      default:
        console.log(`Get Track State Error: Unknown trackName ${trackName}`)
        return
    }
  }

  setTrackState(trackName: string, state: boolean): void {
    switch (trackName) {
      case 'mic':
        this.localTracksActive.audio = state
        break;
      case 'video':
        this.localTracksActive.video = state
        break;
      case 'screen':
        this.localTracksActive.screen = state
        break;
      default:
        console.log(`Set Track State Error: Unknown trackName ${trackName}`)
    }
  }

  async publishTracks() {
    await this.client.publish([ this.localMicTrack, this.localVideoTrack ])
  }

  async unpublishTracks() {
    await this.client.publish([ this.localMicTrack, this.localVideoTrack ])
  }

  async muteTrack(trackName: string, enabled: boolean): Promise<boolean> {
    const track = trackName === 'mic' ? this.localMicTrack : this.localVideoTrack;
    await track.setEnabled(enabled);
    this.setTrackState(trackName, enabled)
    return enabled;
  }

  async startScreenShare(): Promise<boolean> {
    // TODO: add start screenshare
    // Listen for screen share ended event (from browser ui button)
    // this.localScreenTracks[0]?.on("track-ended", () => {
    //   this.stopScreenShare()
    // })    
    return true;
  }

  async stopScreenShare(): Promise<boolean> {
    // TODO: add stop screenshare
    return false;
  }

  async handleLeaveChannel(): Promise<void> {
    if(this.channelJoined) {
      const tracks = [this.localMicTrack, this.localVideoTrack]
      tracks.forEach(track => {
        track.close()
      })
      await this.client.unpublish(tracks)
      await this.agoraService.leaveChannel()
    }
    this.leaveChannel.emit()
  }

}
