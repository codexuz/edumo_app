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

## Daily Routine


1. **When do you usually get up in the morning?**

**Answer –**Well, I am a morning riser, and I usually get up at 6;30 am. Getting up early in the morning makes me feel fresh.

2. **Do you usually have the same routine every day?**

**Answer –**Actually, I am a working person, and on weekdays my routine is the same but weekends make me a lazy person. So, I get up late in the morning.

3. **What is your daily routine?**

**Answer –**Well, in the morning, I get up early to have a light breakfast and hit the gym about 7 am. After the one hour workout, I leave the gym and go to the supermarket to buy some fruits and vegetables. Then, I came back home and got ready for work at 10 am.

4. **Do you ever change your routine?**

**Answer –**Yes, I underwent a change about two months ago because I had a tight schedule and was struggling to manage my targets.

5. **Is your routine the same today as it was when you were a child?**

**Answer –**Actually, I can say that there’s a vast difference between my life then and my present life. You know, when I was a child, besides focusing on study, I had much free time to pursue my interests like watching television and listening to music. But now, my routine and time management has become strict.

`

const renderedMarkdown = md.render(markdownContent)
</script> 