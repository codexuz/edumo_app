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

## Books


**1.Do you like reading books?**  
I am not much of a reader, but I like to read from time to time. Usually it's non-fiction and I am super picky about what I want to read.

**2.How often do you read?**  
Every once in a while, when I feel like to. Usually I do something else instead of reading.

**3.Do you have many books at home?**  
Oh yes, I have a huge collection of Russian and world literature. I haven't read all of them, but I know the main plot of each and every book.
`

const renderedMarkdown = md.render(markdownContent)
</script> 