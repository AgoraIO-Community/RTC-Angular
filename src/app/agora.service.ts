import { Injectable } from '@angular/core';
import AgoraRTC, { ILocalTrack, IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { environment } from '../environments/environments';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  private client: IAgoraRTCClient;
  private appId = environment.AgoraAppId

  private channelJoinedSource = new BehaviorSubject<boolean>(false);
  channelJoined$ = this.channelJoinedSource.asObservable();

  constructor() { 
    if(this.appId == '')
      console.error('APPID REQUIRED -- Open AgoraService.ts and update appId ')
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp9'})
  }

  async joinChannel(channelName: string, token: string | null, uid: string | null) {
    await this.client.join(this.appId, channelName, token, uid)
    this.channelJoinedSource.next(true)
  }

  async leaveChannel() {
    await this.client.leave()
    this.channelJoinedSource.next(false)
  }

  setupLocalTracks(): Promise<ILocalTrack[]> {
    return AgoraRTC.createMicrophoneAndCameraTracks();
  }

  getClient() {
    return this.client
  }

}
