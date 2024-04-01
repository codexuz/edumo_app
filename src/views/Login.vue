<script setup>
import { ref, onMounted } from 'vue'
import sms from '@/assets/sms.png'
import Lock from '@/assets/Lock.png'
import Logo from '@/assets/logo.png'
import GoogleIcon from '@/assets/GoogleIcon.png'
import {  loadingController, toastController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

onMounted(() => {
  GoogleAuth.initialize();
});

const router = useRouter()
const email = ref('')
const password = ref('')

async function googleAuth() { 

  const response = await GoogleAuth.signIn();
  console.log(response);
  if(response){
    const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.authentication.idToken,
    nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
  })

  if(data){
    console.log(data)
    router.push('home', 'forward')
  }
  }

}


//PasswordToggle
const showPassword = ref(false);
const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
};


const getUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  if(!error){
    console.log('Tizimga kiring')
    return
  }
  
  if(data){
    console.log(data)
    router.push('/home', 'forward')
  }
  
  
  
}

onMounted(getUser)

//Login
  const  doLogin = async () => {

        const toast = await toastController.create({ duration: 2500 })
        const loading = await loadingController.create({});

      if (!email.value || !password.value) {
        toast.message = 'Barcha maydonlar to\'ldirilishi shart!'
        await toast.present()
        return
    } 

     try {
    
          loading.present();

          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
          })

          if (error) throw error
         
          if(data){
            router.push('/home', 'forward')
          }

          

        } catch (error) {
          toast.message = error.error_description || error.message
          await toast.present()
        } finally {
          await loading.dismiss()
        }
      
        
};




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
          <button @click="googleAuth" class="py-3 rounded-xl bg-[#E3EDFF] flex items-center justify-center gap-x-2 px-4 text-white w-full text-[#263038]">
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