<script setup>
import { ref, onMounted } from 'vue'
import sms from '@/assets/sms.png'
import Lock from '@/assets/Lock.png'
import Logo from '@/assets/logo.png'
import GoogleIcon from '@/assets/GoogleIcon.png'
import {  loadingController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { firebaseApp } from '@/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
const auth = useFirebaseAuth()


const router = useRouter()
const email = ref('')
const password = ref('')
const showToast = ref(false);
const toastMessage = ref("");

onMounted(()=>{
  const user = useCurrentUser()
  if (user) {
     //router.push('/home', 'forward')
  } else {
    console.log('You are not authorized')
  }
})

//PasswordToggle
const showPassword = ref(false);
const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
};


//Login
let doLogin;
onMounted(()=>{
    doLogin = async () => {
      if (!email.value || !password.value) {
      showToast.value=true;
      toastMessage.value="Please enter email and password."
      return
    } 
      const loading = await loadingController.create({
          message: 'Logging in...',
        });
     
     loading.present();
    
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
         loading.dismiss()
         router.push('/home', 'forward')
        })
        .catch((error) => {
           loading.dismiss()
           showToast.value=true;
           toastMessage.value = "Login yoki parol xato"
           console.log(error.message);
        });
        
};
})


</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="light">
       <ion-buttons slot="start">
        <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-top" scroll-y="false">
    <ion-grid>
      <ion-row class="ion-justify-content-center">
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4">
      <div class="mx-auto mt-4">
        <img :src="Logo" class="sm:w-32 mx-auto" alt="Logo"/>
        <p class="text-center my-2"><small>Powered by <span class=" text-blue-600 font-bold">EDUMO</span></small></p>
      </div>
      <form class="flex flex-col gap-2 mt-3"  @submit.prevent="doLogin">
       <div class="flex items-center gap-x-3 border-2 border-[#2563EB] h-[48px] rounded-xl placeholder-[#2E2E2E] text-[#2E2E2E] px-3 font-medium">
          <img :src="sms">
          <input type="email" required v-model="email" class="w-full border-none outline-none" placeholder="Email"/>
       </div>
       <div class="flex items-center gap-x-3 border-2 border-[#2563EB] h-[48px] rounded-xl placeholder-[#2E2E2E] text-[#2E2E2E] px-3 font-medium">
          <img :src="Lock">
          <input type="password" required v-model="password" class="w-full border-none outline-none" placeholder="Parol" autocomplete="true">
       </div>
       <div class="flex flex-col items-center">
          <button class="py-3 rounded-xl bg-[#2563EB] px-4 text-white w-full">Kirish</button>
       </div>
      <p class="text-gray-700 text-center mt-6"><b>Parolni unutdingizmi?</b> <span class="text-[#2563EB]text-sm"><router-link to="#">Parolni tiklash</router-link></span></p>
      <div class="flex items-center gap-x-2 mt-1">
        <div class="border-b border-[#F3F3F5] w-full"></div><span class="text-[#BEC1C4]">YOKI</span><div class="border-b border-[#F3F3F5] w-full"></div>
      </div>
    </form>
    <div class="flex flex-col items-center mt-3">
          <button class="py-3 rounded-xl bg-[#E3EDFF] flex items-center justify-center gap-x-2 px-4 text-white w-full text-[#263038]">
            <img :src="GoogleIcon"/>
             Google orqali kirish
          </button>
       </div>
      </ion-col>
      </ion-row>
    </ion-grid>
    <div class="w-full absolute bottom-10 flex items-center5 justify-center">
       <p class="text-[#515960]">Hisobingiz yo'qmi? <span class="font-medium text-[#2563EB]"><router-link to="/register">Ro'yxatdan o'tish</router-link></span></p>
    </div>
   
  </ion-content>
  </ion-page>
</template>
