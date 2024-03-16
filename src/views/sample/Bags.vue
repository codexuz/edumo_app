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

## Bags

**Is a bag an ideal gift?**

Highly doubt it. It could be supposing it’s an LV, Gucci, Prada, or any other major brand bag. But then again, there’s no accounting for taste.

**Do you often change your bags?**

No. I usually pick up one, carry it around until it’s worn out, and then buy the substitute. For me, if I have one durable and comfy backpack, that’s enough for like until it gets expired.

**Do you like bags? What type of bags do you like?**

I’m really into backpacks and waist bags. Depending on the amount of stuff that I usually carry around, I usually end up between these two.

**Do you have different bags for different occasions?**

No. My rucksack is universal, and as a man, I don’t see any practical point in having multiple bags for different occasions. Besides I don’t go out that much, so there’s no real need either.

**Do you usually carry a bag when you go out?**

No, I usually prefer going out hands-free. Everything that I need including my phone and keys goes into my pockets, hopefully, they’re deep enough to store all of it.

**What do you put in your bag?**

Usually, these are my laptop, my journal, a pen or two, wet napkins just in case, a case of my glasses if I’m wearing a pair, my headphones, and a charger for my laptop and I’m good to go.

**When you are buying a bag, what factors do you consider?**

Not so many things actually. Firstly, whether it’s a brand stuff or not because despite the price brand bags do last for a long time, like my Vans backpack. Secondly, how many sections it has, here the more the merrier. Lastly, I check out if it is good to carry around and if it will be still good if fully loaded.

`

const renderedMarkdown = md.render(markdownContent)
</script> 