import { Component } from '@angular/core';
import AgoraRTC from 'agora-rtc-sdk-ng';

interface RTC {
  localAudioTrack: any;
  localVideoTrack: any;
  client: any;
}

@Component({
  selector: 'app-agora-video',
  templateUrl: './agora-video.component.html',
  styleUrls: ['./agora-video.component.scss'],
})
export class AgoraVideoComponent {
  rtc: RTC = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };

  options = {
    appId: 'eb6b8be7752c44c0b3c9a0b7602ffdf3',
    channel: 'elliott-test',
    token:
      '007eJxTYPC+fqb8tvWH09kLutr+8PXWtpgXXa2IPdz47cWR6xcftK1SYEhNMkuySEo1Nzc1SjYxSTZIMk62TDRIMjczMEpLS0kzdnKWT2sIZGR4/3YKIyMDBIL4PAyuOTmZ+SUlugU5iZUMDADnEidX',
    uid: 123456,
  };

  async startBasicLiveStreaming() {
    this.rtc.client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

    window.onload = async () => {
      const hostJoinButton = document.getElementById('host-join');
      const audienceJoinButton = document.getElementById('audience-join');
      const leaveButton = document.getElementById('leave');

      if (hostJoinButton) {
        hostJoinButton.onclick = async () => {
          // Now you can use ClientRole from agora-rtc-sdk-ng
          this.rtc.client.setClientRole('host');
          await this.rtc.client.join(
            this.options.appId,
            this.options.channel,
            this.options.token,
            this.options.uid
          );
          console.log('here');

          this.rtc.localAudioTrack =
            await AgoraRTC.createMicrophoneAudioTrack();
          this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
          await this.rtc.client.publish([
            this.rtc.localAudioTrack,
            this.rtc.localVideoTrack,
          ]);

          const localPlayerContainer = document.createElement('div');
          localPlayerContainer.id = this.options.uid.toString();
          localPlayerContainer.textContent = 'Local user ' + this.options.uid;
          localPlayerContainer.style.width = '640px';
          localPlayerContainer.style.height = '480px';
          document.body.append(localPlayerContainer);

          this.rtc.localVideoTrack.play(localPlayerContainer);

          console.log('publish success!');
        };
      }

      if (audienceJoinButton) {
        audienceJoinButton.onclick = async () => {
          this.rtc.client.setClientRole('audience');
          await this.rtc.client.join(
            this.options.appId,
            this.options.channel,
            this.options.token,
            this.options.uid
          );

          this.rtc.client.on(
            'user-published',
            async (user: any, mediaType: string) => {
              await this.rtc.client.subscribe(user, mediaType);
              console.log('subscribe success');

              if (mediaType === 'video') {
                const remoteVideoTrack = user.videoTrack;
                const remotePlayerContainer = document.createElement('div');
                remotePlayerContainer.id = user.uid.toString();
                remotePlayerContainer.textContent =
                  'Remote user ' + user.uid.toString();
                remotePlayerContainer.style.width = '640px';
                remotePlayerContainer.style.height = '480px';
                document.body.append(remotePlayerContainer);

                remoteVideoTrack.play(remotePlayerContainer);
              }

              if (mediaType === 'audio') {
                const remoteAudioTrack = user.audioTrack;
                remoteAudioTrack.play();
              }
            }
          );

          this.rtc.client.on('user-unpublished', (user: any) => {
            const remotePlayerContainer = document.getElementById(user.uid);
            remotePlayerContainer && remotePlayerContainer.remove();
          });
        };
      }

      if (leaveButton) {
        leaveButton.onclick = async () => {
          this.rtc.localAudioTrack.close();
          this.rtc.localVideoTrack.close();

          this.rtc.client.remoteUsers.forEach((user: any) => {
            const playerContainer = document.getElementById(user.uid);
            playerContainer && playerContainer.remove();
          });

          await this.rtc.client.leave();
        };
      }
    };
  }

  constructor() {
    this.startBasicLiveStreaming();
  }
}
