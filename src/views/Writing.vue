<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="warning">
        <ion-title>Word Spelling Challenge</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <section v-show="!isFinished">
      <button class="btn btn-warning" @click="responseAudio(wordPronunce)">
        <ion-icon :icon="volumeMedium" class="text-2xl"></ion-icon>
        <span slot="end">{{ uzbek }}</span>
      </button>
      <ion-item>
        <ion-input v-model="userInput" @click="hideKeyboard" inputmode="none" readonly="true"></ion-input>
        <ion-icon :icon="backspace" color="dark" @click="clearText"></ion-icon>
      </ion-item>

      <main class="mt-6 flex justify-center flex-col items-center">
        <div class="flex items-center justify-center gap-1" v-for="(row, index) in keyboard" :key="index">
          <div v-for="(letter, letterIndex) in row" :key="letterIndex">
            <button class="btn px-4 w-12 h-10 bg-gray-200 m-[3px] rounded-xl" @click="selectLetter(letter)" :disabled="!letter">{{ letter }}</button>
          </div>
        </div>
        <button @click="spaceBar" class="btn w-[50%] bg-gray-200 m-[3px] rounded-xl">Spacebar</button>
      </main>
    </section>

    <section class="flex flex-col justify-center" v-show="isFinished">
      
      <Vue3Lottie
        :animationData="Completed"
        :height="250"
        :width="250"
        :loop="false"
    />
  <h1 class="text-3xl font-bold text-center mb-3">Vazifa Yakunlandi</h1>
  <router-link v-show="isFinished" to="/home" class="flex flex-col justify-center items-center mb-3">
            <button  class="w-[60%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-primary rounded-2xl">Kursga qaytish</button>
  </router-link>

    </section>

    </ion-content>
    <ion-footer class="ion-no-border" v-show="!isFinished">
      <ion-toolbar color="light">
        <template v-if="falseAnswer">
          <div class="flex flex-col justify-center items-start px-5 py-3 bg-rose-300/30 sm:w-[400px] mx-auto rounded-t-xl">
            <div class="mx-3">
              <h3 class="text-rose-600 text-2xl">Xato!</h3>
              <p class="text-rose-600 text-sm font-bold mb-3">To'g'ri javob:</p>
              <p class="text-rose-600 text-sm mb-3">{{ correctAnswer.toUpperCase() }}</p>
            </div>
            <button @click="continueGame" class="w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-error rounded-2xl">Davom etish</button>
          </div>
        </template>
        <template v-else-if="trueAnswer">
          <div class="flex flex-col justify-center items-start px-5 py-3 bg-emerald-300/30 sm:w-[400px] mx-auto rounded-t-xl">
            <div class="mx-3">
              <h3 class="text-emerald-600 text-2xl">To'g'ri!</h3>
            </div>
            <button @click="continueGame" class="w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-accent rounded-2xl">Davom etish</button>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col justify-center items-center mb-3">
            <button :disabled="!userInput" @click="checkAnswer" class="w-[80%] sm:w-[300px] mx-auto px-8 text-xl text-white btn btn-warning rounded-2xl">Check</button>
          </div>
        </template>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { backspace, volumeMedium } from 'ionicons/icons';
import { supabase } from '@/supabase';
import { Keyboard } from '@capacitor/keyboard';
import correctSound from '@/assets/sounds/correct.mp3';
import incorrectSound from '@/assets/sounds/incorrect.mp3';
import { Vue3Lottie } from 'vue3-lottie'
import Completed from '@/assets/completed.json'
import { RouterLink } from 'vue-router';
import { LocalNotifications } from '@capacitor/local-notifications'

LocalNotifications.schedule({
  notifications: [
    {
      title: 'Hello',
      body: 'This is a local notification!',
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) } // in 5 seconds from now
    }
  ]
});

LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
  console.log('Notification clicked!', notification);
});


async function requestPermission() {
      try {
        const status = await LocalNotifications.requestPermission();
        if (status.granted) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }

    requestPermission()

const words = ref('');
const userInput = ref('');
const correctAnswer = ref('');
const falseAnswer = ref(false);
const trueAnswer = ref(false);
const currentWordIndex = ref(0);
const uzbek = ref('')
const wordPronunce = ref('')
const isFinished = ref(false)




const keyboard = [
  ['Q', 'W', 'E', 'R', 'T'],
  ['Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G'],
  ['H', 'J', 'K', 'L', 'M'],
  ['Z', 'X', 'C', 'V', 'B'],
  ['N', ',', '.']
];

const fetchWords = async () => {
  try {
    let { data, error } = await supabase
      .from('word_challange')
      .select(`*,
        word_list (
          *
        )
      `)
      .order('created_at', { ascending: true });

    if (data) {
      words.value = data[0].word_list;
      nextQuestion()
    }
  } catch (error) {
    console.log(error);
  }
};


onMounted(() => {
  fetchWords();
});

const speakSentence = async (text) => {
  await TextToSpeech.speak({
    text,
    lang: 'en-US',
    rate: 1,
    pitch: 1,
    volume: 1.0,
    category: 'ambient',
  });
};

const selectLetter = (letter) => {
  userInput.value += letter;
};

const checkAnswer = () => {
  const userAnswer = userInput.value.trim().toLowerCase();
  if (userAnswer === correctAnswer.value.trim().toLowerCase()) {
    trueAnswer.value = true;
    responseAudio(correctSound);
  } else {
    falseAnswer.value = true;
    responseAudio(incorrectSound);
  }
};

const continueGame = () => {
  userInput.value = '';
  trueAnswer.value = false;
  falseAnswer.value = false;
  nextQuestion()
};

const clearText = () => {
  userInput.value = userInput.value.slice(0, -1);
};

const spaceBar = () => {
  userInput.value += ' ';
};

const hideKeyboard = () => {
  Keyboard.hide();
};

const responseAudio = (audioURL) => {
  const audio = new Audio(audioURL);
  audio.play();
};

const nextQuestion = () => {
  if (currentWordIndex.value < words.value.length) {
    correctAnswer.value = words.value[currentWordIndex.value].en;
    uzbek.value = words.value[currentWordIndex.value].uz
    wordPronunce.value = words.value[currentWordIndex.value].audio
    currentWordIndex.value++;
  } else {
    isFinished.value = true
  }
};
</script>

<style scoped>
ion-button {
  margin: 5px;
}
</style>
