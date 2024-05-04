<div align="center">
  <img src="./images/agora.png" alt="Agora" width="200" height="auto" style="margin:10px 0;">
  <!-- Agora  -->
  <p>
    <a href="https://www.agora.io/en/join-slack/"><img src="https://img.shields.io/badge/slack-@RTE%20Dev-blue.svg?logo=slack"></a>
    <a href="https://www.agora.io/en"><img src="https://img.shields.io/static/v1?label=RTE&message=Real-Time Engagement&color=yellow" alt="Agora RTE" /></a>
    <a href="https://www.agora.io/en/products/video-call/"><img src="https://img.shields.io/static/v1?label=RTC&message=Video Call SDK&color=orange" alt="Agora RTC" /></a>
    <a href="https://www.agora.io/en/products/chat/"><img src="https://img.shields.io/static/v1?label=RTM&message=Agora Chat&color=success" alt="Agora Chat"/></a>
  </p>
</div>

# RTC-Angular with Agora Live Video 

Typescript implmentation of the Agora Video SDK for Web v4.20 using the Angular framework

The [Guide.md](Guide.md) contains a walk-through of the project, including setup and code.

## Demo
Test the build: []()

## Setup

1. Clone the repo
1. Add [Agora API Key](#how-to-aquire-an-agora-appid) to the [`environments.ts`](src/environments/environments.ts) file

## Test in Dev mode
1. Follow steps in setup
1. Open the terminal and navigate to repo folder
1. Use this command to run dev mode with local webserver: 

   ```bash
   ng serve
   ```

### How to aquire an Agora AppID

1. Register and log in to [Agora Console](https://console.agora.io).

1. Navigate to the **Project Management** tab. 

1. Find your project and click **Configure**. 

1. Copy your APP ID, 

1. Scroll down and generate a temporary Token (if security is enable).

![Agora Console: Project Details](./images/image-3-en.png)