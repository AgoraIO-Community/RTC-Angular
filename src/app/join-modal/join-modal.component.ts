import { Component, ElementRef, EventEmitter, AfterViewInit, Output, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgoraService } from '../agora.service';


@Component({
  selector: 'app-join-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './join-modal.component.html',
  styleUrl: './join-modal.component.css'
})
export class JoinModalComponent implements AfterViewInit {

  @ViewChild('modalOverlay') modalOverlay!: ElementRef<HTMLDivElement>;
  @ViewChild('joinChannelForm') joinChannelForm!: ElementRef<HTMLFormElement>;
  @Output() joinChannel = new EventEmitter<void>();

  constructor(private agoraService: AgoraService) {}

  ngAfterViewInit () {
    // show the modal once the page has loaded
    this.modalOverlay.nativeElement.classList.add('show')
  }

  async onSubmit(channelName: string, agoraToken?: string, userID?: string) {
    await this.agoraService.joinChannel(channelName, agoraToken ?? null, userID ?? null)
    this.joinChannel.emit() // notify the app to hide the model and show the local video
  }
}
