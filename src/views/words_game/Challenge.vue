<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { volumeHigh } from 'ionicons/icons'
import { TextToSpeech } from '@capacitor-community/text-to-speech';


const route = useRoute();
const testId = Number(route.params.id);
import questions from '@/assets/questions.json'
const question = ref(questions.find(question => question.id === testId) || {});
const part1 = question.value.part1
const part2 = question.value.part2


const text = "What is your favourite meal?";
const words = ref([]);
const tarjima = ref('')
const showTrBtn = ref(true)
const isShown = ref(false)


function setTrue(){
 isShown.value = true
}


const speak = async (word) => {
  await TextToSpeech.speak({
    text: word,
    lang: 'en-US',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    category: 'ambient',
  });

  getDictionary(word)
  
};


const speakSentence  = async () => {
  await TextToSpeech.speak({
    text: text,
    lang: 'en-US',
    rate: 1,
    pitch: 1,
    volume: 1.0,
    category: 'ambient',
    onend: () =>{
      console.log('Hi')
    }
  });
};


onMounted(() => {
  words.value = text.split(" ");
});

const stop = async () => {
  await TextToSpeech.stop();
};

const URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const Api ='trnsl.1.1.20230710T104110Z.008413911fef112b.b91a322675e3cfb27eb572260cda1d86909276ae'

async function getTranslation(){
  const res = await fetch(`${URL}?key=${Api}&text=${text}&lang=en-uz`)
  const trans = await res.json()
  console.log(trans.text)
  tarjima.value = trans.text[0] 
  showTrBtn.value = false
}

async function getDictionary(word){
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const data = await res.json()
  console.log(data[0].phonetic)
}

</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="light" class="flex justify-between items-center">
        <ion-buttons slot="start" class="bg-white shadow-sm rounded-xl text-gray-600">
          <ion-back-button  default-href="/speaking"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="false" class="ion-padding">
     <ion-grid>
       <ion-row>
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="mx-auto flex flex-col items-center justify-center">

          <div class="m-0 flex flex-col items-center">
            <progress  class="mx-auto mb-4 progress progress-primary w-56" value="60" max="100"></progress>
             <h1>What’s the meaning of this sentence?</h1>
            <div class="flex items-center">
              <button class="btn btn-primary mx-3" @click="speakSentence"> 
              <ion-icon class="cursor-pointer text-white text-xl rounded-lg" :icon="volumeHigh" ></ion-icon>
              </button>

          <span  v-for="(word, index) in words" :key="index" @click="speak(word)">
            <p class="hover:underline decoration-dotted cursor-pointer decoration-2 decoration-blue-500">{{ word }}&nbsp;</p> 
          </span>
        </div>
          <span v-show="showTrBtn" class="text-gray-500 cursor-pointer" @click="getTranslation()"><small>Tarjimasini ko'rish</small></span>
          <span v-show="!showTrBtn" class="text-blue-500"><small>{{ tarjima }}</small></span>
        </div>

        <textarea  class="w-[80%] resize-none sm:w-[260px] mt-5 mb-2 px-5 py-2 mx-auto bg-[#F7F7F7] border border-[#C5BFBF] rounded-xl outline-none h-[150px] overflow-hidden text-gray-700">

        </textarea>

         </ion-col>
       </ion-row>
     </ion-grid> 
    </ion-content>
    <ion-footer class="ion-no-border">
    <ion-toolbar color="light">
      <div v-show="isShown" class="flex flex-col justify-center items-start px-5  py-3 bg-rose-300/30 sm:w-[400px] mx-auto rounded-t-xl">
        <div class="mx-3">
          <h3 class="text-rose-600 text-2xl">Xato!</h3>
          <p class="text-rose-600 text-sm font-bold mb-3">
            To'g'ri javob: 
          </p>
          <p class="text-rose-600 text-sm mb-3">
            Permisi, nama saya Asep 
          </p>
        </div>
        <button class=" w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-error  rounded-2xl">Davom etish</button>
      </div>
      <div v-show="false" class="flex flex-col justify-center items-start px-5  py-3 bg-emerald-300/30 sm:w-[400px] mx-auto rounded-t-xl">
        <div class="mx-3">
          <h3 class="text-emerald-600 text-2xl">To'g'ri!</h3>
        </div>
        <button class=" w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-accent  rounded-2xl">Davom etish</button>
      </div>
       <div v-show="!isShown" class="flex flex-col justify-center items-center mb-3">
        <button @click="setTrue" class="w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-primary rounded-2xl">
         Tekshirish
        </button>
      </div>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

