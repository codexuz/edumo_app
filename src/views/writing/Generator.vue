
<template>
<ion-page>
    <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
                <ion-title>Essay Generator</ion-title>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <main class="container px-4 mx-auto">
    
      <div v-show="rawData" class="container px-4 mx-auto bg-gray-200 p-3 rounded text-gray-700 mb-4">{{ rawData }}</div>
      <p v-show="loader" class="mx-auto px-4 text-center text-sm">Essay yaratilmoqda...</p>
      <div v-show="answerData" class="container mx-auto px-4 my-3" v-html="answerData.split('\n').join('<br>') "></div>
      <span v-show="answerData" @click="writeToClipboard" class="float-right flex items-center gap-x-2 text-sm mb-3 pb-6"><small>Nusxalash</small> <ion-icon  :icon="copyOutline"></ion-icon></span> 
      
    </main>
      
    </ion-content>
    <ion-footer>
    <ion-toolbar>
        <div class="container mx-auto px-4 flex items-center gap-x-3">
           <ion-input @input="handleChange" v-model="textData"   placeholder="Essey savolini kiriting..."></ion-input>
            <button @click="sendChecking" :disabled="active"  class="px-4 py-3 flex items-center justify-center bg-blue-500 rounded-lg">
              <ion-icon  :icon="arrowUpOutline" color="light"></ion-icon>
            </button>
        </div>
      
    </ion-toolbar>
  </ion-footer>
</ion-page>
</template>

<script setup>
import { arrowUpOutline, copyOutline } from 'ionicons/icons';
import {ref, computed } from 'vue'
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import { CapacitorHttp } from '@capacitor/core';



const textData = ref('')
const rawData = ref('')
const answerData = ref('')
const loader = ref(false)

const active = ref(true)

const handleChange =  () => {
  if(!textData){
    active.value = true
    return
  }
 active.value = false
 
}


const sendChecking = async () => {

    try {  

    active.value = true
    loader.value = true    
    rawData.value = textData.value
    if(!rawData){
        return
    }

  textData.value = ''
  const question = rawData.value
  console.log(question)

  const options = {
    url: 'https://generate.edumoacademy.uz/generate',
    headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    },
    data: JSON.stringify({question}),
  };

const response = await CapacitorHttp.request({ ...options, method: 'POST' })
if(response){
  answerData.value = response.data.choices[0].text
  //console.log(answerData.value)
   active.value = false
   loader.value = false
}


} catch (error) {
console.error("Error sending JSON data:", error);
alert(error)
active.value = false
loader.value = false
}

}


const writeToClipboard = async () => {
   await Clipboard.write({
    string: answerData.value
  });
  showHelloToast()
};


const showHelloToast = async () => {
  await Toast.show({
    text: 'Nusxalandi',
  });
};
</script>