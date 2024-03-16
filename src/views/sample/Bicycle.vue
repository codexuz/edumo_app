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

## Bicycle

**Do you like riding a bicycle?**

I love cycling! Ever since I sat down to the seat at the age of 7, I have been doing nothing but getting a deep sense of pleasure whenever I go out for a ride.

**How often do you ride it?**

I used to have a bike but now I don’t. Luckily, we have a bike rental at the park, so I can go riding when I have some free time and when I feel like to.

**When do you think is the best time to ride a bicycle?**

It seems to me morning is the best time for a ride, at least from my perspective. It can be a good workout for an upcoming day and charges you with positive vibes throughout the day.

`

const renderedMarkdown = md.render(markdownContent)
</script> 