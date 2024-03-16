<script setup>
import { ref } from 'vue'
import AuthIcon from '../assets/auth.svg'
import { personCircleOutline, personOutline, chevronBackOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { register, updateUserProfile } from "@/firebase.js";
import {  loadingController } from '@ionic/vue';
import { useRouter } from 'vue-router';

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
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
        <ion-back-button default-href="/login">
        </ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-top" scroll-y="false">
    <ion-grid>
      <ion-row class="ion-justify-content-center">
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4">
      <div class="mx-auto">
        <img :src="AuthIcon" class="w-[40%] sm:w-32 mx-auto" alt="Logo"/>
        
      </div>
      <ion-item class="relative flex items-end">
        <ion-label position="floating">Ism</ion-label>
        <ion-icon :icon="personOutline" slot="start"></ion-icon>
        <ion-input  v-model="name"></ion-input>
      </ion-item>
      <ion-item class="relative flex items-end">
        <ion-label position="floating">Email</ion-label>
        <ion-icon :icon="mailOutline" slot="start"></ion-icon>
        <ion-input type="email" v-model="email"></ion-input>
      </ion-item>
      <ion-item class="relative flex items-end">
        <ion-label position="floating">Parol</ion-label>
        <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
        <ion-input v-model="password" type="password"></ion-input>
      </ion-item>
      <ion-button  @click="doRegister" class="ion-margin-top" expand="block">Hisob yaratish
        <ion-icon :icon="personCircleOutline" slot="end"></ion-icon>
      </ion-button>
      </ion-col>
      </ion-row>
    </ion-grid>
     <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      ></ion-toast>
  </ion-content>
  </ion-page>
</template>