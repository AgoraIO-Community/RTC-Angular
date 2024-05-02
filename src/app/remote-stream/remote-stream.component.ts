import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core'
import { AgoraService } from '../agora.service';
import { IAgoraRTCClient, IAgoraRTCRemoteUser, UID } from 'agora-rtc-sdk-ng';
import { RemoteUserComponent } from '../remote-user/remote-user.component';

@Component({
  selector: 'app-remote-stream',
  standalone: true,
  imports: [],
  templateUrl: './remote-stream.component.html',
  styleUrl: './remote-stream.component.css'
})
export class RemoteStreamComponent implements OnInit, OnDestroy {
  client: IAgoraRTCClient;
  remoteUserComponentRefs: Map<string, ComponentRef<RemoteUserComponent>>;
 
  @ViewChild('remoteVideoContainer', { read: ViewContainerRef }) remoteVideoContainer!: ViewContainerRef;

  constructor(private agoraService: AgoraService) {
    this.client = this.agoraService.getClient()
    this.remoteUserComponentRefs = new Map()
  }

  ngOnInit(): void {
    // add listeners when component mounts
    this.client.on('user-published', this.handleRemoteUserPublished)
    this.client.on('user-unpublished', this.handleRemoteUserUnpublished)
  }

  ngOnDestroy(): void {
    // remove listeners when component is removed
    this.client.off('user-published', this.handleRemoteUserPublished)
    this.client.off('user-unpublished', this.handleRemoteUserUnpublished)
  }

  private handleRemoteUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel") => {
    await this.client.subscribe(user, mediaType)
    if (mediaType === 'audio') {
      user.audioTrack?.play()
    } else if (mediaType === 'video') {
      const uid = user.uid
      // create <div/> for remote user and add to DOM
      const remoteUserComponentRef: ComponentRef<RemoteUserComponent> = this.remoteVideoContainer.createComponent(RemoteUserComponent)
      remoteUserComponentRef.instance.uid = uid
      remoteUserComponentRef.instance.onReady = (remoteUserDiv) => {
        user.videoTrack?.play(remoteUserDiv)
      }
      this.remoteUserComponentRefs.set(uid.toString(), remoteUserComponentRef)
    }
  }

  private handleRemoteUserUnpublished = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel") => {
    if(mediaType === 'video') {
      const remoteUserUid = user.uid.toString()
      // retrieve the div from remoteUserComponentRefs and remove it from DOM
      const componentRef = this.remoteUserComponentRefs.get(remoteUserUid)
      if(componentRef) {
        const viewIndex = this.remoteVideoContainer.indexOf(componentRef?.hostView)
        this.remoteVideoContainer.remove(viewIndex)
        // remove entry from remoteUserComponentRefs
        this.remoteUserComponentRefs.delete(remoteUserUid)
      } else {
        console.log(`Unable to find remoteUser with UID: ${user.uid}`)
      }
    }
  }

  clearRemoteUsers():void {
    this.remoteVideoContainer.clear();
    this.remoteUserComponentRefs.clear();
  }
}
