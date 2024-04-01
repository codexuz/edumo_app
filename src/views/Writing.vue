<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Word Spelling Challenge</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input v-model="userInput" readonly="true"></ion-input>
      </ion-item>

      <ion-grid>
        <div v-for="(row, index) in keyboard" :key="index">
          <ion-col v-for="(letter, letterIndex) in row" :key="letterIndex">
            <ion-button color="light" @click="selectLetter(letter)" :disabled="!letter">{{ letter }}</ion-button>
          </ion-col>
        </div>
      </ion-grid>

      <ion-button color="primary" @click="checkAnswer">Check Answer</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { TextToSpeech } from '@capacitor-community/text-to-speech';


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

const userInput = ref('');
const correctAnswer = 'hello'; // Set the correct answer here
const selectedLetters = ref([]);

const keyboard = [
  ['A', 'H', 'C', 'L', 'E', 'F', 'O']
];

const selectLetter = (letter) => {
  userInput.value += letter;
  selectedLetters.value.push(letter);
};

const checkAnswer = () => {
  const userAnswer = userInput.value.toLowerCase();
  if (userAnswer === correctAnswer) {
    speakSentence(correctAnswer)
    // You can add logic to move to the next question or do something else here
  } else {
    alert('Incorrect. Try again!');
    // Clear the selected letters
    userInput.value = '';
    selectedLetters.value = [];
  }
};
</script>

<style scoped>
ion-button {
  margin: 5px;
}
</style>
