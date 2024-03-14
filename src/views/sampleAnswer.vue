<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons>
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true" class="ion-padding">

    <ion-accordion-group>
    <ion-accordion v-for="(sample, index) in sampleAnswers" :key="index"  :value="index">
      <ion-item slot="header" color="light">
        <ion-label>{{ sample.url.toUpperCase()}}</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content" v-html="sample.content"></div>
    </ion-accordion>
  </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup>
import sampleAnswers from '@/assets/vocabulary.json'


</script>