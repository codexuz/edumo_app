<script setup>
import { ref } from 'vue'
import AuthIcon from '../assets/auth.svg'
import {  loadingController, toastController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase'
import sms from '@/assets/sms.svg'
import Lock from '@/assets/lock.svg'
import Logo from '@/assets/logo.svg'
import User from '@/assets/user.svg'


const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

  
const doRegister = async () => {
        
  const toast = await toastController.create({ duration: 2500 })
  const loading = await loadingController.create({
                  message: 'Hisob yaratilmoqda...',
        });

  if (!email.value || !password.value || !name.value) {
    toast.message = 'Barcha maydonlar to\'ldirilishi shart!'
    await toast.present()
    return;
  }

  try {
    
    loading.present();

    const { user , error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
      data: {
      full_name: name.value,
      avatar_url: 'https://bkxhwaeluswfwfxavmpt.supabase.co/storage/v1/object/public/avatars/avatar.jpg'
          },
       },
    })

    if (error) {
      console.error('Error registering user:', error.message);
      toast.message = error.message
      await toast.present()
      return; // Exit early if there's an error
        } 

        router.push('/home', 'forward')
    

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
        <h1 class="font-bold text-2xl text-center mb-3">Welcome to SpeakUp!</h1>
      </div>
      <form class="flex flex-col gap-2 mt-5"  @submit.prevent="doRegister">
        <div class="flex items-center gap-x-3 border-2 border-[#2563EB] h-[48px] rounded-xl placeholder-[#2E2E2E] text-[#2E2E2E] px-3 font-medium">
          <img :src="User">
          <input type="text" required v-model="name" class="w-full border-none outline-none" placeholder="F.I.O"/>
       </div>
       <div class="flex items-center gap-x-3 border-2 border-[#2563EB] h-[48px] rounded-xl placeholder-[#2E2E2E] text-[#2E2E2E] px-3 font-medium">
          <img :src="sms">
          <input type="email" required v-model="email" class="w-full border-none outline-none" placeholder="Email"/>
       </div>
       <div class="flex items-center gap-x-3 border-2 border-[#2563EB] h-[48px] rounded-xl placeholder-[#2E2E2E] text-[#2E2E2E] px-3 font-medium">
          <img :src="Lock">
          <input type="password" required v-model="password" class="w-full border-none outline-none" placeholder="Parol" autocomplete="true">
       </div>
       <div class="flex flex-col items-center">
          <button class="py-3 rounded-xl bg-[#2563EB] px-4 text-white w-full">Hisob yaratish</button>
       </div>   
    </form>
      </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar color="light">
      <div class="w-full flex items-center justify-center pb-10">
       <p class="text-[#515960]">Hisobingiz bormi? <span class="font-medium text-[#2563EB]"><router-link to="/login">Kirish</router-link></span></p>
    </div>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>