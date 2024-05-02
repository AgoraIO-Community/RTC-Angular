import { Component, ElementRef, ViewChild } from '@angular/core'
import { AgoraService } from '../agora.service';
import { LocalStreamComponent } from '../local-stream/local-stream.component';

@Component({
  selector: 'app-media-controls',
  standalone: true,
  imports: [],
  templateUrl: './media-controls.component.html',
  styleUrl: './media-controls.component.css'
})
export class MediaControlsComponent {
  // Container
  @ViewChild('localmediaControls', { static: true }) localmediaControls!: ElementRef<HTMLDivElement>;
  // Buttons
  @ViewChild('micButton', { static: true }) micButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('videoButton', { static: true }) videoButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('screenShareButton', { static: true }) screenShareButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('leaveButton', { static: true }) leaveButton!: ElementRef<HTMLButtonElement>;

  constructor (private localStream: LocalStreamComponent) {}

  handleMicToggle(e: Event): void {
    console.log('++ <media-controls /> :: handleMicToggle()')
    const isActive = this.localStream.getTrackState('mic') // get active state
    this.localStream.muteTrack('mic', !isActive)
    this.toggleButtonActiveState(e.target as HTMLDivElement)
  }

  handleVideoToggle(e: Event): void {
    console.log('++ <media-controls /> :: handleVideoToggle()')
    const isActive = this.localStream.getTrackState('video') ?? false// get active state
    console.log(`++ <media-controls /> :: handleVideoToggle() -> isActive: ${isActive}`)
    this.localStream.muteTrack('video', !isActive)
    this.toggleButtonActiveState(e.target as HTMLDivElement)
  }

  toggleButtonActiveState(button: HTMLDivElement): void {
    console.log('++ <media-controls /> :: toggleButtonActiveState()')
    button.classList.toggle('media-active')    // Add/Remove active class
    button.classList.toggle('muted')           // Add/Remove muted class
  }

  handleScreenShare(e: Event): void {
    const isActive = this.localStream.getTrackState('screen') // get active state
    if (isActive) {
      this.localStream.startScreenShare()
    } else {
      this.localStream.stopScreenShare()
    }
    this.toggleButtonActiveState(e.target as HTMLDivElement)
  }

  handleLeaveChannel(): void {
    this.localStream.handleLeaveChannel()
  }
}
