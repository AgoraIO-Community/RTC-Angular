import { Routes } from '@angular/router';
import { VideoQuickstartComponent } from './video-quickstart/video-quickstart.component';
import { AgoraVideoComponent } from './agora-video/agora-video.component';

export const routes: Routes = [
  { path: 'video-quickstart', component: VideoQuickstartComponent },
  { path: 'agora-video', component: AgoraVideoComponent },
];
