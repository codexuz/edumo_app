<script setup>
import { ref, onMounted } from 'vue'
import LoginIcon from '../assets/login.svg'
import { logInOutline, eyeOutline, eyeOffOutline, logoGoogle } from 'ionicons/icons';
import { personCircleOutline, chevronBackOutline,
 mailOutline, lockClosedOutline } from 'ionicons/icons';
import {  loadingController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';


const router = useRouter()
const email = ref('')
const password = ref('')
const showToast = ref(false);
const toastMessage = ref("");


//PasswordToggle
const showPassword = ref(false);
const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
};



const doLogin = async () => {
  if (!email.value || !password.value) {
    showToast.value = true;
    toastMessage.value = "Iltimos, email va parolni kiriting";
    return;
  }

  const loading = await loadingController.create({
    message: 'Logging in...',
  });
  loading.present();

  try {
    const result = await FirebaseAuthentication.signInWithEmailAndPassword({
      email: email.value,
      password: password.value,
    });
    
    // If login is successful (result.user is not null), navigate to '/home'
    if (result.user) {
      router.push('/home'); // Pushing to '/home' route
    }
    
    return result.user;
  } catch (error) {
    showToast.value = true;
    toastMessage.value = error
  } finally {
    loading.dismiss();
  }
};



const signInWithGoogle = async () => {
  const result = await FirebaseAuthentication.signInWithGoogle();
  if (result.user) {
      router.push('/home'); // Pushing to '/home' route
    }
  return result.user;
};




</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
       <ion-buttons slot="start">
        <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding ion-margin-top" scroll-y="false">
    <ion-grid>
      <ion-row class="ion-justify-content-center">
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4">
      <div class="mx-auto">
        <img :src="LoginIcon" class="w-[40%] sm:w-32 mx-auto" alt="Logo"/>
        <div class="text-center">
        <h1 class="text-3xl text-blue-600 text-center font-bold ">Platformaga kirish</h1>
        <p class="text-gray-400">Ma'lumotlatingizni kiriting</p>
        </div>
      </div>
      <ion-item class="relative flex items-end">
        <ion-label position="floating">Email</ion-label>
        <ion-icon :icon="mailOutline" slot="start"></ion-icon>
        <ion-input type="email" v-model="email"></ion-input>
      </ion-item>
      <ion-item class="relative flex items-end">
        <ion-label position="floating">Parol</ion-label>
        <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
        <ion-input v-model="password" :type="showPassword ? 'text' : 'password'"></ion-input>
        <ion-icon  :icon="showPassword ? eyeOffOutline : eyeOutline" @click="togglePasswordVisibility" slot="end"></ion-icon>
      </ion-item>
      <ion-button  @click="doLogin" class="ion-margin-top" expand="block">Kirish
        <ion-icon :icon="logInOutline" slot="end"></ion-icon>
      </ion-button>
      <ion-button @click="signInWithGoogle" color="secondary" expand="block">Google orqali kirish
        <ion-icon :icon="logoGoogle" slot="start"></ion-icon>
      </ion-button>
      <p class="text-gray-700 text-center mt-6">Hisob yaratmaganmisiz? <span class="text-sky-400"><router-link to="/register">Ro'yxatdan o'tish</router-link></span></p>
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