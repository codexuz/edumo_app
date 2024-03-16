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

## Computers


**1.Do you use computers?**  
I have an HP laptop and I just love it. Can't imagine how I could live without it.

**2.What do you use a computer to do?**  
I use it to scroll on social media, to work on Microsoft Office apps, do some audio and video editing, check my emails. Nothing extraordinary honestly.

**3.Do you think computers changed your life a lot?**  
Yeah, I mean I have gigabytes of personal data on my hardware not to mention, I use to access my pages on social media. They are sort of my technical extension, so to speak.


`

const renderedMarkdown = md.render(markdownContent)
</script> 