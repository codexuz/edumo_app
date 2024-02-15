<script>
import { chevronBackOutline } from 'ionicons/icons';

</script>
<template>
<ion-page>
  <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
        <ion-back-button :icon="chevronBackOutline" default-href="/login"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  <ion-content class="ion-padding">
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col size="12" size-lg="8" size-xl="8" >
        <div v-html="renderedMarkdown"></div>
      </ion-col>
    </ion-row>
  </ion-grid>
  </ion-content>
</ion-page>
</template>

<script setup>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
const markdownContent = `

## Apps
1. **What kinds of apps do you often use?**

I mostly use mix of built-in and side apps on my phone. These are music players like the phone my phone has and Spotify as well as some social media apps and native email app.

- **Is there any apps you would like to download?**

I don’t think so. I have all the apps that I need on my phone, so I am good.

- **What's the most popular app in your country?**

According to an online survey results, the number one app in Uzbekistan is Telegram which is a free, cross platform messenger used for work, business and other purposes.

`

const renderedMarkdown = md.render(markdownContent)
</script>