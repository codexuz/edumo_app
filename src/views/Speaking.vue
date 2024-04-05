<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase.js'

const questions = ref('')

async function fetchQuestions(){

  try {

    let { data, error } = await supabase
  .from('speaking_tests')
  .select(`*`)

  if(data){
    console.log(data)
    questions.value = data
  }

  }
  catch (error) {
    console.log(error)
  }
}

onMounted(fetchQuestions)

</script>
<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
       <ion-title class="ion-text-left">Speaking Tests</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true">
    <ion-grid>
      <ion-row class="ion-align-items-center ion-justify-content-center">
        <ion-col size="12" size-lg="5" size-xl="4" size-md="6" v-for="(question, index) in questions" :key="index">
        <div>
        <ion-card  class="bg-blue-600 rounded-3xl">
         <ion-card-header class="relative" :router-link="`mock-tests/${question.id}`">
          <h3 class="text-sm text-white font-medium">{{ question.topic }}</h3>
          <div class="absolute right-3 top-3 bg-white rounded-full px-2.5 py-[1px] text-blue-500">{{ question.title}}</div>
         </ion-card-header>
        </ion-card>
      </div>
        </ion-col>
      </ion-row>
    </ion-grid>
      
    </ion-content>
  </ion-page>
</template>
