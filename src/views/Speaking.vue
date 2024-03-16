<script setup>
import { ref, watchEffect } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'

const questions = ref([])
const isLoading = ref(true)
const errorMessage = ref(false)

const fetchSpeaking = async () => {
  try {
    const { data, error } = await supabase
      .from('tests')
      .select('*')

    if (error) {
      console.error('Error fetching data:', error.message)
      errorMessage.value = true
      isLoading.value = false
      return
    }

    if (data) {
      // Assuming 'tests' table has an array of questions under 'questions' field
      questions.value.push(data)
      isLoading.value = false
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
    errorMessage.value = true
    isLoading.value = false
  }
}

watchEffect(fetchSpeaking)

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
        <ion-col size="12" size-lg="5" size-xl="4" size-md="6">
         <p v-show="errorMessage" class="text-center">Yuklab bo'lmadi! Internetingizni tekshiring</p>
          <template v-if="isLoading">
          <div class="flex justify-center">
            <ion-spinner color="primary" name="lines-sharp"></ion-spinner>
          </div>
           </template>
        <template v-else>
        <div v-for="(questionList, index) in questions" :key="index">
        <ion-card  class="bg-blue-600 rounded-xl py-1" v-for="(question, questionIndex) in questionList" :key="questionIndex">
         <ion-card-header class="relative" :router-link="`mock-tests/${question.id}`">
          <h3 class="text-2xl text-white font-medium">{{ question.topic }}</h3>
          <div class="absolute right-3 top-1 bg-white rounded-full px-5 py-1 text-blue-500">{{ question.title}}</div>
         </ion-card-header>
        </ion-card>
      </div>
    </template>
        </ion-col>
      </ion-row>
    </ion-grid>
      
    </ion-content>
  </ion-page>
</template>
