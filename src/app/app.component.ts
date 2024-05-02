import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { JoinModalComponent } from './join-modal/join-modal.component';
import { RemoteStreamComponent } from './remote-stream/remote-stream.component';
import { LocalStreamComponent } from './local-stream/local-stream.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterOutlet, 
    JoinModalComponent, 
    RemoteStreamComponent, 
    LocalStreamComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild('remoteStreamsContainer') remoteStreamsComponent!: RemoteStreamComponent;
  title = 'agora-angular-demo';

  isJoinModalVisible = true;
  isLocalStreamVisible = false;

  handleJoinChannel() {
    this.isJoinModalVisible = false;
    this.isLocalStreamVisible = true;
  }

  handleLeaveChannel() {
    this.isLocalStreamVisible = false;
    this.isJoinModalVisible = true;
    this.remoteStreamsComponent.clearRemoteUsers()
  }
}
