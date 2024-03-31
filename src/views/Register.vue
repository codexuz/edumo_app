<script setup>
import { ref } from 'vue'
import { register, updateUserProfile } from "@/firebase.js";
import {  loadingController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import User from '@/assets/User.png'
import sms from '@/assets/sms.png'
import Lock from '@/assets/Lock.png'
import Logo from '@/assets/logo.png'


const router = useRouter()
const showToast = ref(false);
const toastMessage = ref("");
const name = ref('')
const email = ref('')
const password = ref('')

  
const doRegister = async () => {
  if (!email.value || !password.value || !name.value) {
    showToast.value = true;
    toastMessage.value = "Barcha maydonlarni to'ldirish shart";
    return;
  }

  const loading = await loadingController.create({
    message: 'Hisob yaratilmoqda...',
  });
  loading.present();

  try {
    const userCredential = await register(email.value, password.value);
    const user = userCredential.user;

    if (user) {
      await updateUserProfile(name.value, 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg');
      router.push('/home');
    }

    loading.dismiss();
  } catch (error) {
    loading.dismiss();
    const errorMessage = error.message || "Xatolik yuz berdi";
    showToast.value = true;
    toastMessage.value = errorMessage;
    console.error(error);
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
      <form class="flex flex-col gap-2 mt-5"  @submit.prevent="doLogin">
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
          <button class="py-3 rounded-xl bg-[#2563EB] px-4 text-white w-full">Kirish</button>
       </div>   
    </form>
      </ion-col>
      </ion-row>
    </ion-grid>
    <div class="w-full absolute bottom-10 flex items-center5 justify-center">
       <p class="text-[#515960] font-bold">Hisobingiz bormi? <span class="font-medium text-[#2563EB]"><router-link to="/login">Kirish</router-link></span></p>
    </div>
   
  </ion-content>
  </ion-page>
</template>
