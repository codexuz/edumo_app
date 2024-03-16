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

## Films


**1.What kind of movies do you like?**  
I love psychological thrillers that run shivers down my spine. They are not so vulgar and cliche as horrors, but there is something really gut-wrenching about them.

**2.Do you usually watch films alone or with others?**  
I like to watch my films alone. By doing so, I am sure I pay attention to every minute detail, every special effect and sound effect that is used in the movie.

**3.Which actor would you like to play you in a film?**  
I think it's Rami Malek, as he can portray pretty much all personality types.


`

const renderedMarkdown = md.render(markdownContent)
</script> 