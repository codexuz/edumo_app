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

## Buildings


1. **Where do you live?**

I live in one-bedroom apartment on the 3rd floor of the apartment block in the central neighborhood in my hometown. The accommodation here is considered one of the best in the entire city, so I am lucky on this.

- **What building is considered famous in your town?**

There’s this department store called ‘New life’ at the central market in Navoi. It’s a white 5 story building with somewhat catchy and unique design. They incorporated a lot of white color and glass to make it look modern.

- **What types of buildings are there in your living area?**

Since Navoi is a young growing city, we can some examples of Soviet architechture as well modern buildings at the same place. I think it’s really good to see them in one place as this allows you to visually see the differences in generations as well as demands and techniques used in architecture in different periods of time.
`

const renderedMarkdown = md.render(markdownContent)
</script> 