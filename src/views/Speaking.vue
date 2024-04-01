<script setup>
import { ref, watchEffect } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
import questions from '@/assets/questions.json'
console.log(questions)
</script>
<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
       <ion-title class="ion-text-center">Speaking Tests</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true">
    <ion-grid>
      <ion-row class="ion-align-items-center ion-justify-content-center">
        <ion-col size="12" size-lg="5" size-xl="4" size-md="6" v-for="(question, index) in questions" :key="index">
        <div>
        <ion-card  class="bg-blue-600 rounded-xl">
         <ion-card-header class="relative" :router-link="`mock-tests/${question.id}`">
          <h3 class="text-xl text-white font-medium">{{ question.topic }}</h3>
          <div class="absolute right-3 top-3 bg-white rounded-full px-5 py-1 text-blue-500">{{ question.title}}</div>
         </ion-card-header>
        </ion-card>
      </div>
        </ion-col>
      </ion-row>
    </ion-grid>
      
    </ion-content>
  </ion-page>
</template>
