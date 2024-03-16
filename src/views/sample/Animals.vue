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

## Animals & Wild life


1. **Do you like wild animals?**

Yes. I would not probably like encountering with them, but I like to watch them from safe distance.

- **What is your favourite wild animal? Why?**

It’s honey badger. This animal does not know or does not have the word fear in its vocabulary. It’s really nasty, eager and no one likes it in animal kingdom to a degree that even lions do not mess with them.

- **Have you ever seen animals in the wild?**

No, my hometown is founded in a desert, so the wildest what ive seen so far is a pack of stray dogs in my neighborhood.

`

const renderedMarkdown = md.render(markdownContent)
</script>