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

## Free time

1. **What do you enjoy doing in your free time?**

Since I am in charge of my time fully, I have plenty of free time, however I just try to make sure that I don’t have any free time, so that I won’t be doing anything unproductive or time-wasting. The more free time you have, the more stupid you spend it, as it’s been proven.

- **How much time do you have each week for doing these things?**

Again, I try to make sure I don’t have free time at all. I am constantly grinding on my own.

- **Why do you like doing these activities?**

The reason why I don’t let myself chill even for a second is because I am young and strong and have a sharp mind, which I am using to guarantee myself a better future. I know for sure that I won’t be this good for a long time, so try to use all of the time in my command to make it in time.

`

const renderedMarkdown = md.render(markdownContent)
</script> 