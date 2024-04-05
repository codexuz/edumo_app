<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase.js'
import { startRecording, pauseRecording, stopRecording } from '@/microphone.js'
import moment from 'moment'



const hidden = ref(true)
const mainPage = ref(false)
const question = ref(null)
const fontSize = ref(16)
const countdown = ref('00:00');
const currentQuestion = ref(0)
const questionId = ref(null)
const indicatorOne = ref(true)
const indicatorTwo = ref(false)
const indicatorThree = ref(false)


const part1 = ref('')
const part2 = ref('')
const part3 = ref('')
const route = useRoute();
const testId = route.params.id;


async function fetchQuestions(){

  try {

    let { data, error } = await supabase
  .from('speaking_tests')
  .select(`
    *,
    speaking_part1(
      *
    ),
    speaking_part2(
      *
    ),
    speaking_part3(
      *
    )
  `)
  .eq('id', testId)
  .single()

  if(data){
    part1.value = data.speaking_part1
    console.log(part1.value[currentQuestion.value].question)
  }

  }
  catch (error) {
    console.log(error)
  }
}

onMounted(fetchQuestions)

// Function to transition UI
const hideHome = () => {
    hidden.value = false;
    mainPage.value = true;
    initializeFirstQuestion();
};


function sizeScale(){
    fontSize.value ++
}

function sizeShrink(){
    fontSize.value --
}


// Function to play audio for the current question
const playQuestionAudio = () => {
    const audio = new Audio(part1.value[currentQuestion.value].audio);
    audio.play();
    audio.onended = () => {
        // Start countdown after question audio ends
        startCountdown();
    };
};

// Function to initialize the first question
const initializeFirstQuestion = () => {
    question.value = part1.value[currentQuestion.value].question;
    questionId.value = part1.value[currentQuestion.value].id
    playQuestionAudio();
};


// Function to start countdown for user response
const startCountdown = () => {
    let targetTime = moment().add(5, 'seconds');

    const countdownInterval = setInterval(() => {
        const currentTime = moment();
        const secondsRemaining = targetTime.diff(currentTime, 'seconds');

        const formattedTime = moment.utc(secondsRemaining * 1000).format('mm:ss');
        countdown.value = formattedTime;

        if (secondsRemaining <= 0) {
            clearInterval(countdownInterval);
            playBeep();
        }
    }, 1000);
};

// Function to play beep sound
const playBeep = () => {
    const beep = new Audio('/beep.m4a');
    beep.play();
    beep.onended = () => {
        startRecording();
        startRecordingCountdown();
    };
};


// Function to advance to the next question
const nextQuestion = () => {
    if (currentQuestion.value < part1.value.length - 1) {
        currentQuestion.value++;
        question.value = part1.value[currentQuestion.value].question;
        questionId.value = part1.value[currentQuestion.value].id;
        playQuestionAudio();
    } else {
        indicatorTwo.value = true;
        transitionPartTwo()
    }
};



// Function to start countdown for recording
const startRecordingCountdown = () => {
    let targetTime = moment().add(30, 'seconds');

    const countdownInterval = setInterval(() => {
        const currentTime = moment();
        const secondsRemaining = targetTime.diff(currentTime, 'seconds');

        const formattedTime = moment.utc(secondsRemaining * 1000).format('mm:ss');
        countdown.value = formattedTime;

        if (secondsRemaining <= 0) {
            clearInterval(countdownInterval);
            pauseRecording();
            nextQuestion(); // Proceed to the next question
        }
    }, 1000);
};


//part2 Transtion

function transitionPartTwo(){
    question.value = ""
    var audio = new Audio('https://examonline-rouge.vercel.app/mock-tests/test01/part2/intro.mp3')
    questionId.value =""
    audio.play()
    audio.onended = ()=>{
     speakingPart2()
    }
}


function speakingPart2(){
    questionId.value = 7
    question.value = "Describe a piece of technology that you use a lot. You should say:\nWhat is it? \nWhat you use it for \nhow long you have been using it \nand say how you would feel without it"
    const audio = new Audio('https://examonline-rouge.vercel.app/mock-tests/test01/part2/1.mp3');
    audio.play();
    audio.onended = () => {
     startCountdown60();
    };
}

window.addEventListener("popstate", (event) => {
    console.log(
    `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
  );
});

</script>

<template>
  <ion-page >
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary">
  <ion-title>Test 1</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content  scroll-y="false">
  <section v-show="hidden">
      <main class="py-5 text-center flex flex-col justify-start items-center">
      <div class="text-lg text-gray-800 my-3 container mx-auto px-4">
      <p>Gapirish bo'limi <b>3 ta qismdan</b> iborat:</p>
      <ul>
          <li>Part 1: 6 ta savol</li>
          <li>Part 2: Maxsus savol (davomiyligi: 2 daqiqa)</li>
          <li>Part 3: 5 ta savol (Part 2 ga oid savollar)</li>
        </ul>
      
      <p class="text-red-600">Ushbu bo'limda oldingi savolga yoki oldingi qismga qaytishning imkoni yo'q.<br>Mikrofon avtomatik ravishda yoqiladi va o'chiriladi.</p>
      
      <p><u>Savol uchun ajratilgan vaqt tugagach, keyingi savol avtomatik tarzda ochiladi.</u></p>
      </div>
      
      <button @click="hideHome" class="bg-emerald-500 rounded  text-gray-800 font-semibold text-xl px-8 my-2 py-2 shadow-lg"> ⚠️ Imtihonni boshlash</button>
      
      </main>
  </section>
  <section v-show="mainPage">
  <div class="flex text-center mt-6 items-center justify-center text-white">
      <div class="rounded py-1 px-5 flex items-center justify-center shadow-lg mx-2" :class="{active: indicatorOne}">Part 1</div> 
      <div  class="rounded py-1 px-5 bg-blue-500 flex items-center justify-center shadow-lg mx-2" :class="{active: indicatorTwo}">Part 2</div> 
      <div class="rounded py-1 px-5  bg-blue-500 flex items-center justify-center  shadow-lg mx-2" :class="{active: indicatorThree}">Part 3</div> 
  </div>
  
  <main class="main container mx-auto px-4  mb-4 py-6 shadow-xl rounded justify-between items-start">
      <div class="right-side bg-gray-100 rounded-lg p-6 my-4">
        <div class="flex justify-bewteen items-center">
          <button class="bg-blue-600 text-white rounded-xl py-2 font-bold px-4 w-full">Question# {{ questionId }}<span id="q-number"></span></button>
        </div>
        <div class="my-3 border-b border-gray-300"></div>
        <div class="flex justify-center items-center text-white font-bold">
          <button class="bg-blue-600 py-2 px-3 rounded-lg text-center mx-3" @click="sizeShrink">A-</button>
          <button  class="bg-blue-600 py-2 px-3 rounded-lg text-center mx-3" @click="sizeScale">A+</button> 
        </div>
        <div class="my-3 border-b border-gray-300"></div>
        <p class="text-gray-800 text-center" :style="{ 'font-size': fontSize+'px'}">{{ question }}</p>
      </div>
      <!----Left side-->
      <div class="left-side bg-gray-100 rounded-lg p-6 ">
          <button class="w-full rounded py-2 text-gray-800 text-xl bg-gray-300" id="timer" style="font-family:monospace;">{{ countdown }}</button>
          <div class="hidden w-full my-3 bg-gray-600 p-4 rounded flex justify-center items-center" id="recorder-blink">
              <button class="px-5 py-3 rounded-lg bg-gray-700">
                  <div class="recording w-6 h-6 rounded-full bg-red-600 border shadow-lg border-red-700"></div>
              </button>
          </div>
      </div>
  
  </main>
  </section>
  </ion-content>
  </ion-page>
  </template>
  
  <style scoped>
      .active{
          background-color: #0fd464;
      }
  </style>