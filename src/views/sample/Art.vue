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

## Art


1. **Do you like art?**

As an artistically inclined person, I can say yes. I love art in general, specifically I have a strong liking for music.

2. **Do you think art classes are necessary? Why?**

I believe so. Art classes foster creativity and allows young minds to learn to express themselves via different art disciplines.

3. **How often do you visit art galleries?**

It’s a pity we don’t have one in my hometown. However, there are virtual excursions for people like me and I enjoy them from time to time.

4. **Do you like modern art or traditional art?**

As an artistic nature, I appreciate both. Traditional art is an all-time classic, serving both as a foundation base for any further development in art and as a reference point for any artistic experiments, which are in turn the core of modern art. The latter can not exist without the former as they are interrelated, so I’d say I like both classic portraits and an art-house installation at the same time.


5. **Do you think it would be interesting for you to be an artist?**

I do produce some music of my own. Mostly it’s electronic music, as you only need a laptop and a pair of decent headphones for that. Nothing serious for now, but I am looking forward to releasing some singles and albums and making a name for myself in the industry.

6. **Is there any artwork on the wall in your room?**

I like my walls plain, but I have this baroque style wallpapers on them, so technically, there are some colorful patterns on my wall.

7. **Have you ever visited an art gallery?**

I’ve been to a local museum, a youth center, and an art gallery here in my hometown and saw all the installations and saw all the installations and exhibits there. While it was entertaining, there was nothing that would have made me think for a long time.

`

const renderedMarkdown = md.render(markdownContent)
</script> 