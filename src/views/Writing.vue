<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="light">
        <ion-title>Word Spelling Challenge</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <button class="btn btn-warning" @click="speakSentence(correctAnswer)">
        <ion-icon :icon="volumeMedium"  class="text-2xl"></ion-icon>
      </button>
      
      <ion-item>
        <ion-input v-model="userInput" readonly="true"></ion-input>
        <ion-icon :icon="backspace" color="dark" @click="clearText"></ion-icon>
      </ion-item>

      <main class="mt-6">
        <div class="flex items-center justify-center gap-1" v-for="(row, index) in keyboard" :key="index">
          <div  v-for="(letter, letterIndex) in row" :key="letterIndex">
            <button class="py-2 px-3 w-10 h-10 bg-gray-200 m-[3px] rounded-xl" @click="selectLetter(letter)" :disabled="!letter">{{ letter }}</button>
          </div>
        </div>
      </main>

      <button class="btn btn-warning"  @click="checkAnswer">Check Answer</button>
    

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import {backspace, volumeMedium} from 'ionicons/icons';


const userInput = ref('');
const correctAnswer = 'hello'; // Set the correct answer here
const selectedLetters = ref([]);


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
  ['H', 'J', 'K', 'L', 'Z'],
  ['X', 'C', 'V', 'B','N'],
  ['M']
];



const selectLetter = (letter) => {
  userInput.value += letter;
  selectedLetters.value.push(letter);
};

const checkAnswer = () => {
  const userAnswer = userInput.value.toLowerCase();
  if (userAnswer === correctAnswer) {
   // speakSentence(correctAnswer)
    // You can add logic to move to the next question or do something else here
  } else {
    //alert('Incorrect. Try again!');
    // Clear the selected letters
    userInput.value = '';
    selectedLetters.value = [];
  }
};

function clearText(){
 userInput.value =  userInput.value.slice(0, -1)
}
</script>

<style scoped>
ion-button {
  margin: 5px;
}
</style>
