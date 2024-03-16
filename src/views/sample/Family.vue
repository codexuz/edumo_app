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

## Family


**1\. How many people are there in your immediate family?**

There are four people including me in my nuclear family and these are my dad, my mom, my younger sister and me.

**2\. Who do you get on best within your family?**

Surely it is my mom, because she is always there for me no matter what and also gives her valuable and experienced advice on any topic I would ask her.

**3\. What do you do together with your family?**

Everyone is usually busy with their own work and studies, so the only time when we spend some time together is catching up over the dinner. We usually watch TV, have a meal together and chat for a while around the laid table.


`

const renderedMarkdown = md.render(markdownContent)
</script> 