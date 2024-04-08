<script setup>
import { ref, onMounted } from 'vue'
import sms from '@/assets/sms.svg'
import Lock from '@/assets/lock.svg'
import Logo from '@/assets/logo.svg'
import GoogleIcon from '@/assets/google.svg'
import {  loadingController, toastController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { supabase, trackUserActivityStart } from '@/supabase'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { networkService } from '@/lib/networkService.js';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'

const networkStatus = ref(null)

const checkOfflineStatus = async () => {
  const isOnline = await networkService.getCurrentStatus();
  networkStatus.value = isOnline;
  return isOnline;
}

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
    const isLoggedIn = JSON.parse(localStorage.getItem('sb-bkxhwaeluswfwfxavmpt-auth-token'));
    if(isLoggedIn){
      router.push('home', 'forward')
    }
    
  }
  }

}


//PasswordToggle
const showPassword = ref(false);
const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
};


const getUser = async () => {
  const userLoggedIn = JSON.parse(localStorage.getItem('sb-bkxhwaeluswfwfxavmpt-auth-token'))
  
  if(!userLoggedIn){
    console.log('You are not sign it')
  }
  
  //console.log(userLoggedIn)
   router.push('/home', 'forward')
  
}

onMounted(getUser)

//Login
  const  doLogin = async () => {
       
        const toast = await toastController.create({ duration: 5000, position: 'top', class: 'custom-toast' })
        const loading = await loadingController.create({});

        const isOnline = await checkOfflineStatus();
        if (!isOnline.connected) {
           toast.message = "Internetga ulanmagansiz"
           await toast.present()
           return
        }

        

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
            //console.log(data.user.id)
            localStorage.setItem('isLoggedIn', true)
            const res = await trackUserActivityStart(data.user.id, 'Login')
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
          <input :type="showPassword ? 'text' : 'password'"  required v-model="password" class="w-full border-none outline-none" placeholder="Parol" autocomplete="true">
          <ion-icon class="text-2xl" @click="togglePasswordVisibility" :icon="showPassword ? eyeOffOutline :  eyeOutline"></ion-icon>
       </div>
       <div class="flex flex-col items-center">
          <button class="py-3 rounded-xl bg-[#2563EB] px-4 text-white w-full">Kirish</button>
       </div>
      <p class="text-gray-700 text-center mt-6"><b>Parolni unutdingizmi?</b> <span class="text-[#2563EB]text-sm"><router-link to="/forgot-password">Parolni tiklash</router-link></span></p>
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
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar color="light">
      <div class="w-full flex items-center justify-center pb-10">
        <p class="text-[#515960]">Hisobingiz yo'qmi? <span class="font-medium text-[#2563EB]"><router-link to="/register">Ro'yxatdan o'tish</router-link></span></p>
    </div>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

<style scoped>
  ion-toast.custom-toast {
    --background: #fa0c0456;
    --box-shadow: 3px 3px 10px 0 rgba(240, 240, 240, 0.2);
    --color: #f70000;
  }

</style>