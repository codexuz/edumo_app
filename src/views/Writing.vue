<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="warning">
        <ion-title>Word Spelling Challenge</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <button class="btn btn-warning" @click="speakSentence(correctAnswer)">
        <ion-icon :icon="volumeMedium"  class="text-2xl"></ion-icon>
      </button>


      <ion-item>
        <ion-input v-model="userInput" @click="hideKeyboard" inputmode="none" readonly="true"></ion-input>
        <ion-icon :icon="backspace" color="dark" @click="clearText"></ion-icon>
      </ion-item>

      <main class="mt-6 flex justify-center flex-col items-center">
        <div class="flex items-center justify-center gap-1" v-for="(row, index) in keyboard" :key="index">
          <div  v-for="(letter, letterIndex) in row" :key="letterIndex">
            <button class="btn px-4 w-12 h-10 bg-gray-200 m-[3px] rounded-xl" @click="selectLetter(letter)" :disabled="!letter">{{ letter }}</button>
          </div>
        </div>
        <button @click="spaceBar" class="btn  w-[50%] bg-gray-200 m-[3px] rounded-xl">Spacebar</button>
      </main>

      
    

    </ion-content>
    <ion-footer class="ion-no-border">
    <ion-toolbar color="light">
      <div v-show="falseAnswer" class="flex flex-col justify-center items-start px-5  py-3 bg-rose-300/30 sm:w-[400px] mx-auto rounded-t-xl">
        <div class="mx-3">
          <h3 class="text-rose-600 text-2xl">Xato!</h3>
          <p class="text-rose-600 text-sm font-bold mb-3">
            To'g'ri javob: 
          </p>
          <p class="text-rose-600 text-sm mb-3">
            {{ correctAnswer.toUpperCase() }}
          </p>
        </div>
        <button class=" w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-error  rounded-2xl">Davom etish</button>
      </div>
      <div v-show="trueAnswer" class="flex flex-col justify-center items-start px-5  py-3 bg-emerald-300/30 sm:w-[400px] mx-auto rounded-t-xl">
        <div class="mx-3">
          <h3 class="text-emerald-600 text-2xl">To'g'ri!</h3>
        </div>
        <button class=" w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-accent  rounded-2xl">Davom etish</button>
      </div>
       <div v-show="checkBtn" class="flex flex-col justify-center items-center mb-3">
        <button @click="checkAnswer" class="w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-warning rounded-2xl">
         Tekshirish
        </button>
      </div>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import {backspace, volumeMedium} from 'ionicons/icons';
import { supabase } from '@/supabase'
import { Keyboard } from '@capacitor/keyboard';

const words = ref('')
const userInput = ref('');
const selectedLetters = ref([]);
const correctAnswer = ref('')
const falseAnswer = ref(false)
const trueAnswer = ref(false)
const checkBtn = ref(true)

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
            console.log(words.value[0].en)
            correctAnswer.value = words.value[2].en
            
        }

        }
    catch(error) {
    console.log(error)
    }
}


onMounted(()=>{
          fetchWords()
    
})



const speakSentence  = async (correctAnswer) => {
  await TextToSpeech.speak({
    text: correctAnswer,
    lang: 'en-US',
    rate: 1,
    pitch: 1,
    volume: 1.0,
    category: 'ambient',
  });
};




const keyboard = [
  ['Q', 'W', 'E', 'R', 'T' ],
  ['Y', 'U', 'I', 'O', 'P'],
  [  'A', 'S', 'D', 'F', 'G'],
  ['H', 'J', 'K', 'L', 'M'],
  ['Z', 'X', 'C', 'V', 'B'],
  ['N', ',', '.' ]
];



const selectLetter = (letter) => {
  userInput.value += letter;
  selectedLetters.value.push(letter);
};

const checkAnswer = () => {
  const userAnswer = userInput.value.trim().toLowerCase();
  if (userAnswer === correctAnswer.value.trim().toLowerCase()) {
   trueAnswer.value = true
   checkBtn.value = false
    // You can add logic to move to the next question or do something else here
  } else {

    falseAnswer.value = true
    checkBtn.value = false
    // Clear the selected letters
    userInput.value = '';
    selectedLetters.value = [];
  }
};

function clearText(){
 userInput.value =  userInput.value.slice(0, -1)
}

function spaceBar(){
 userInput.value = userInput.value+=' '
}

function hideKeyboard(){
  Keyboard.hide()
}
</script>

<style scoped>
ion-button {
  margin: 5px;
}
</style>
