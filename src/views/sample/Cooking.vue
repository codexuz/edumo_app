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

## Cooking


**Do you like cooking?**

I think I can say that I am a good cook, so yes, I like the process. It just works as a meditation for me, like when I am cutting the veggies and I can have some time to rethink some of the things which I can’t consider any other time. Also, it is super fun and creative process, which makes me happy about it.

**How often do you cook?**

Everyday! I cook for my main meals myself and try to come up with different options for snacks in between them. I believe it helps to keep my creativity on a high level.

**What dishes are you best at cooking?**

I am flawless at spaghetti Bolognese, which is my favorite meal both to cook and to eat. My friends from Portugal once made this dish for me and ever since that, I am in love with this dish.


`

const renderedMarkdown = md.render(markdownContent)
</script> 