# 集成 RTC Web 到 Angular 框架

本文介绍如何开始在把 RTC JavaScript 集成到 Angular 中。

<Br/>
<Br/>

## 前提条件

开始之前，请按照以下要求准备开发环境：

- Windows 或 macOS 计算机，需满足以下要求：
  - 下载声网 Web SDK 支持的浏览器。声网强烈推荐使用最新稳定版 Google Chrome 浏览器。
  - 具备物理音视频采集设备。
  - 可连接到互联网。如果你的网络环境部署了防火墙，请参考应用企业防火墙限制以正常使用声网服务。
  - 搭载 2.2 GHz Intel 第二代 i3/i5/i7 处理器或同等性能的其他处理器。
- 安装 Node.js 及 npm

- 有效的声网账户
  和声网项目，请参考开通服务，从声网控制台获取以下信息：
  - App ID：声网随机生成的字符串，用于识别你的 App。
  - 临时 Token：你的 App 客户端加入频道时会使用 Token 对用户进行鉴权。临时 Token 的有效期为 24 小时。
  - 频道名称：用于标识频道的字符串。

<Br/>
<Br/>

## 创建 Web 项目

创建一个名为 agora_web_quickstart 的文件夹。一个 Web 客户端项目至少需包含以下文件：

- index.html: 用于设计 Web 应用的用户界面。
- basicEngagement.js: 通过 AgoraRTCClient 实现具体应用逻辑的代码。
- package.json: 安装并管理项目依赖。你可以通过命令行进入 agora_web_quickstart 目录并运行 npm init 命令来创建 package.json 文件。

<Br/>
<Br/>

## 集成 SDK

在 `package.json` 文件中的 `dependencies` 字段中添加 `agora-rtc-sdk-ng` 和版本号：

```JSON title
{
    "name": "agora_web_quickstart",
    "version": "1.0.0",
    "description": "",
    "main": "basic.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    =="dependencies": {==
      +"agora-rtc-sdk-ng": "latest"
    +},
    "author": "",
    "license": "ISC"
}
```

将以下代码复制到 `basicEngagement.js` 文件中，在你的项目中导入 `AgoraRTC` 模块。

=== test ===

> [!NOTE]
> This is a warning, use with caution.
