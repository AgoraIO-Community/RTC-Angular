# Simple 3-step integration of RTC SDK

1. Install and Run Angular

    1. Install [Node.js LTS](https://nodejs.org/en)

    1. Install [Angular CLI](https://angular.io/cli) or run the command `npm install -g @angular/cli` directly

    1. Create a new project locally `ng new my-app` (replace "my-app" with your project name)

    1. Navigate to the project directory `cd ~/my-app`

    1. Start the local server `ng serve`

    1. Open the browser URL [http://localhost:4200/](http://localhost:4200/), you should now see the following screen:

        ![Angular Home](./images/image-2.png)

    Step 1 is complete! 🎉

<hr>

2. Add RTC SDK

    1. Create component `ng generate component agora-video` and you will see the following directory:

        <img src="./images/image-5.png" alt="alt text" width="500">

    1. Install `npm i agora-rtc-sdk-ng`

        <img src="./images/image-6.png" alt="alt text" width="500">

    1. Copy the following code and overwrite it to `agora-video.component.ts`

        ```ts
        import { Component } from "@angular/core";
        import AgoraRTC from "agora-rtc-sdk-ng";

        interface RTC {
        localAudioTrack: any;
        localVideoTrack: any;
        client: any;
        }

        @Component({
        selector: "app-agora-video",
        templateUrl: "./agora-video.component.html",
        styleUrls: ["./agora-video.component.scss"],
        })
        export class AgoraVideoComponent {
        rtc: RTC = {
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
        };

        options = {
        appId: "Copy APP ID here",
        channel: "",
        token: "Copy temporary token here",
        uid: 123456,
        };

        async startBasicLiveStreaming() {
        this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

        window.onload = async () => {
        const hostJoinButton = document.getElementById("host-join");
        const audienceJoinButton = document.getElementById("audience-join");
        const leaveButton = document.getElementById("leave");
        if (hostJoinButton) {
        hostJoinButton.onclick = async () => {
        // Now you can use ClientRole from agora-rtc-sdk-ng
        this.rtc.client.setClientRole("host");
        await this.rtc.client.join(this.options.appId, this.options.channel, this.options.token, this.options.uid);
        console.log("here");
        this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);

        const localPlayerContainer = document.createElement("div");
        localPlayerContainer.id = this.options.uid.toString();
        localPlayerContainer.textContent = "Local user " + this.options.uid;
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);

        this.rtc.localVideoTrack.play(localPlayerContainer);

        console.log("publish success!");
        };
        }

        if (audienceJoinButton) {
        audienceJoinButton.onclick = async () => {
        this.rtc.client.setClientRole("audience");
        await this.rtc.client.join(this.options.appId, this.options.channel, this.options.token, this.options.uid);

        this.rtc.client.on("user-published", async (user: any, mediaType: string) => {
        await this.rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const remotePlayerContainer = document.createElement("div");
        remotePlayerContainer.id = user.uid.toString();
        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
        remotePlayerContainer.style.width = "640px";
        remotePlayerContainer.style.height = "480px";
        document.body.append(remotePlayerContainer);

        remoteVideoTrack.play(remotePlayerContainer);
        }

        if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
        }
        });

        this.rtc.client.on("user-unpublished", (user: any) => {
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
        ```

2.4 Copy the following code and overwrite `agora-video.component.html`

```html
<!-- agora-video.component.html -->
<div>
<button type="button" id="host-join">Join as host</button>
<button type="button" id="audience-join">Join as audience</button>
<button type="button" id="leave">Leave</button>
</div>
```

2.6 Copy the following code and overwrite `app.routes.ts`

```ts
import { Routes } from "@angular/router";
import { AgoraVideoComponent } from "./agora-video/agora-video.component";

export const routes: Routes = [{ path: "agora-video", component: AgoraVideoComponent }];
```

Step 2 is done! 🎉

<br>
<hr>
<br>
<br>


Step 3 is complete! 🎉

<br>
<hr>
<br>
<br>

## Effect test

Open the browser URL `http://localhost:4200/agora-video`
<img src="./images/image-7.png" alt="alt text" width="500">

Click the Join as host button to join the channel.

Open another window in the browser and click Join as audience to join the same channel.

In the Console, see the following log, the test is successful.

<img src="./images/image-8.png" alt="alt text" width="500">

<br>

Congratulations, integration is successful! 🎉🎉🎉
