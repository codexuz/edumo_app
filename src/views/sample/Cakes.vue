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

## Cakes & Deserts


1. **Do you like eating cakes?**

Not as much as I liked it ago. I mean, there is nothing wrong with having them every once in a while, on special occasions, however, I don’t really think they do any good if eaten more frequently.

- **Did you like cakes or desserts when you were a child?**

As any other child out there, I also like cakes because they are so festive and do not look like anything else you usually get from the store. There was something special about them which got me captivated by them.

- **Do you know how to bake cakes?**

No, I am not into baking cakes. It’s a rather difficult process and I think not everyone can do it not to mention making a living on it.


`

const renderedMarkdown = md.render(markdownContent)
</script> 