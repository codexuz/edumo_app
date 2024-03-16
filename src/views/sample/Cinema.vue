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

## Cinema


**1.How often do you go to the cinema?**  
I do'nt go at all. I prefer watching movies at home, on my laptop.

**2.Are cinema tickets expensive in your country?**  
They are reasonable, but cinema industry is not that popular in my country.

**3.What are the advantages of seeing a film at the cinema?**  
I guess it's all about the atmosphere. people go to cinema to watch the movie on a big screen, on IMAX or 3D, however, these are available for home viewers as well. I believe it's a matter of perspectives.



`

const renderedMarkdown = md.render(markdownContent)
</script> 