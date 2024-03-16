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

## Emails


**1\. Do you write many letters or emails?**

Yes, I use email nearly everyday to contact my friends all over the world. But I write letters not so often, maybe once a month.

**2\. What are the differences between emails and letters?**

There are a few differences. Emails are very free, convenient, and most importantly, veryfast, but emails cannot contain your emotion, and we hardly review emails later. Letters are different. They are inconvenient, and need a long time to be received, but letters may convey your emotions better.

**3\. What kind(s) of letter/email do you think is (are) the hardest to write?**

I think emails to professors are the hardest to write, because I will be afraid if I don't use the proper word or make him or her feel uncomfortable. But as for friends, we can write to each other quite freely.

**4\. How do you feel when you receive a letter or email?**

I will be very glad to receive a letter or email, because it means that there is someone who remembers me, and sends me something for greetings, or if they have something to discuss with me, I am also pleased to reply to them.

**5\. What kinds of emails (or letters) do you receive that make you feel happy?**

Whatever I receive, I will be glad. Of course, if my friends tell me some happy news about them such as weddings, or being admitted to a good university, such as Stanford, I will bereally glad to share the happiness with them.

**6\. Do you think people will still write letters in the future?**

Yes, I think so. Because I think emails cannot take place of your emotions filled in the writing letter, and that's why you can see people still sending postcards, or writing letters toeach other even they are really far away.

**7\. Do you keep letters?**

Yes. I kept a lot of letters from elementary school until now in my drawer. When I have freetime, I will take the letters out and review them. It seems that I return to that time, so I value the letters I keep.

**8. How do you get on the internet?**

I use the broad band of Uzbek Telecom to get on the internet. There're actually two computers in my home. Now we use a router so that two computers can get online at the same time. Recently, I bought a smart phone, which can enable me to get online even when I'm outside.

**9. Is the internet very popular in Uzbekistan?**

The internet is very popular in Uzbekistan. Now, we use the internet in every aspect of our life.We use it to entertain and search for information. It's also a very important way for us tocommunicate with each other. To be honest, because of the internet, I haven't written a real letter for more than ten years.

**10. How can people learn things on the internet?**

A lot of people post their own experience on the internet and sometimes, you could also findsome video clips that teach you how to do things. For me, I love reading Wikipedia to gain knowledge and solve my questions. Also, a lot of people use online courses to get theirdegrees without going to the campus, which is really convenient for our life.

**11. Do you write letters to your parents often?**

Not really. Now, I use the cell phone all the time because I could receive the respond immediately so that I could communicate with my parents easier. If I write letters, I have to wait for a while to receive the reply, which will make me feel anxious. However, I sometimes write emails to friends that I haven't heard from for a long time.


`

const renderedMarkdown = md.render(markdownContent)
</script> 