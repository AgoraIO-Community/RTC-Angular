import { Component, ElementRef, ViewChild } from '@angular/core'
import { LocalStreamComponent } from '../local-stream/local-stream.component';

@Component({
  selector: 'app-media-controls',
  standalone: true,
  imports: [],
  templateUrl: './media-controls.component.html',
  styleUrl: './media-controls.component.css'
})
export class MediaControlsComponent {
  // Buttons
  @ViewChild('micButton', { static: true }) micButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('videoButton', { static: true }) videoButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('screenShareButton', { static: true }) screenShareButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('leaveButton', { static: true }) leaveButton!: ElementRef<HTMLButtonElement>;

  constructor (private localStream: LocalStreamComponent) {}

  handleMicToggle(e: Event): void {
    const isActive = this.localStream.getTrackState('mic') // get active state
    this.localStream.muteTrack('mic', !isActive)
    this.toggleButtonActiveState(e.target as HTMLDivElement)
  }

  handleVideoToggle(e: Event): void {
    const isActive = this.localStream.getTrackState('video') ?? false// get active state
    this.localStream.muteTrack('video', !isActive)
    this.toggleButtonActiveState(e.target as HTMLDivElement)
  }

  toggleButtonActiveState(button: HTMLDivElement): void {
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
