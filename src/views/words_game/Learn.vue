<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { flagSharp, volumeHigh, volumeHighOutline } from 'ionicons/icons'
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { supabase } from '@/supabase'
import Fire from '@/assets/Fire.png'
import Chart from '@/assets/Chart.png'


const words = ref('')
const english = ref('')
const uzbek = ref('')
const currentWord = ref(0)
const showbtn = ref(true)
const failedFetch = ref(false)
const audioURL = ref('')
const transcript = ref('')
const isLoading = ref(true)



const phonetics = ref('')
const audioPlayer = ref(null);

const speakSentence  = (audioURL) => {
 const audio = new Audio(audioURL)
 audio.play()
};

const Api = 'dict.1.1.20240330T130212Z.1a9f34ce4c6c5367.14d4ace11faa68a55a7f91fc7783de7795f60eaf'

async function getYandexDic(word) {
  const res = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${Api}&lang=en-en&text=${word}`)
  const data = await res.json()
  const define = data.def
  define.map(def=>{
    transcript.value = def.ts
    console.log(def.ts)
  })
}

async function getDictionary(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      if (data && data.length > 0) {
        phonetics.value = data[0].phonetics;
        failedFetch.value = false
        isLoading.value = false
      } else {
        phonetics.value = '';
      }
    } else {
      // Handle non-200 status codes
      console.error('Failed to fetch data. Status:', res.status);
      failedFetch.value = true
    }
  } catch (error) {
    // Handle fetch or JSON parsing errors
    console.error('Error:', error);
    failedFetch.value = true
  }
}



const audioPlayers = ref([]);

function playAudio(index) {
  const audio = audioPlayers.value[index];
  audio.play();
}


const fetchWords = async () => {
    try {

      let { data, error } = await supabase
      .from('word_challange')
      .select(`*,
        word_list (
          *
        )
      `)
       .order('created_at', { ascending: true })

        if(data){
            console.log(data)
            words.value = data[0].word_list
            english.value = words.value[currentWord.value].en
            uzbek.value = words.value[currentWord.value].uz
            getDictionary(english.value)
            getYandexDic(english.value)
            
        }

        }
    catch(error) {
    console.log(error)
    }
}


onMounted(()=>{
          fetchWords()
    
})


const nextQuestion = () => {

    if(currentWord.value === words.value.length-1){
        showbtn.value = false
        return
    }

    currentWord.value++
    english.value = words.value[currentWord.value].en
    uzbek.value = words.value[currentWord.value].uz
    audioURL.value = words.value[currentWord.value].audio
    speakSentence(audioURL.value)
    getDictionary(english.value)
    
   

}

const calculateProgress = () => {
    return (currentWord.value + 1) / words.value.length;
};

</script>

<template>
  <ion-page>
    <ion-header v-show="!isLoading" class="ion-no-border">
      <ion-toolbar color="light" class="flex justify-between items-center">
        <ion-buttons slot="start" class="bg-white shadow-sm rounded-xl text-gray-600">
          <ion-back-button  default-href="/home"></ion-back-button>
        </ion-buttons>
        <div class="flex items-center justify-around">
          <ion-progress-bar  :value="calculateProgress()" color="warning" class="rounded-xl mx-[5px] py-1"></ion-progress-bar>
            <div class="flex items-center gap-x-[3px] mr-5">
                 <img :src="Fire" class="w-6 h-6">
                 <span class="font-bold text-red-500">{{ currentWord+1 +'/'+ words.length }}</span>
            </div>
           
           </div> 
      </ion-toolbar>
    </ion-header>
    <div v-show="isLoading" class="text-center">Yuklanmoqda...</div>
    <ion-content v-show="!isLoading" scroll-y="auto" class="ion-padding">
     <ion-grid>
       <ion-row>

         <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="mx-auto flex flex-col items-center justify-center">

        <div class="mt-6 flex flex-col">
            <div class="flex items-center">
              
              <button class="w-[200px] mx-auto h-[200px] btn btn-light mx-3 rounded-3xl" @click="speakSentence(words[currentWord].audio)"> 
              <ion-icon class="mx-auto cursor-pointer text-gray-700 text-9xl" :icon="volumeHigh" ></ion-icon>
              </button>
            </div>
            <div class="text-left mt-9">
              <p class="text-gray-600 my-3">Inglizcha</p>
               <p class="text-left text-2xl uppercase text-gray-800 pb-5 border-b-2 border-gray-400 border-dotted">{{ english }}</p>
            </div>

            <div class="text-left mt-3 mb-5">
              <p class="text-gray-600  my-3">O'zbekcha</p>
               <p class="text-left text-2xl uppercase text-gray-600">{{ uzbek }}</p>
            </div>
        </div>
        
        <div class="flex items-center gap-3 mt-9" v-show="!failedFetch">
            <span v-for="(phonetic, index) in phonetics" :key="index">
                            <audio :src="phonetic.audio" v-show="phonetic.audio" ref="audioPlayers"></audio>
                            <button class="btn btn-ligt rounded-xl"  @click="playAudio(index)" v-show="phonetic.audio">
                                <ion-icon class="text-2xl" :icon="volumeHighOutline"></ion-icon>
                            </button>
            </span>
        </div>
        
        
         </ion-col>
       </ion-row>
     </ion-grid> 
    </ion-content>
    <ion-footer class="ion-no-border" v-show="!isLoading">
    <ion-toolbar color="light">
       <div class="flex justify-center items-center mb-3">
        <button @click="nextQuestion" v-show="showbtn" class="w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-warning rounded-2xl">
         Keyingisi
        </button>
      </div>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

