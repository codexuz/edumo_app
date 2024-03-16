<script setup>
import { ref, onMounted } from 'vue'
import {auth} from '@/firebase.js'
import { updateProfile, updatePassword  } from "firebase/auth";
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { arrowBackOutline } from 'ionicons/icons';
import {  loadingController } from '@ionic/vue';

const router = useRouter()
const name = ref(null)
const email = ref(null)
const newPassword = ref(null)
const currentUser = auth.currentUser;

const user = auth.currentUser;
if (user !== null) {
  name.value = user.displayName;
  email.value = user.email;
}

const updateNewPassword = async () => {
  if (!currentUser) {
    return;
  }
let loading = await loadingController.create({
  message: 'Saqlanmoqda...',
});
loading.present();

  updatePassword(currentUser, newPassword.value).then(() => {
   loading.dismiss()
   }).catch((error) => {
   loading.dismiss()
   alert('Xatolik sodir bo\'ldi!')
});
};

async function profileUpdate(){
      try {
        updateNewPassword()
        await updateProfile(currentUser, {
          displayName: name.value
        });
        console.log("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    
   };


</script>

<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar color="primary">
<ion-buttons>
<ion-back-button default-href="/settings"></ion-back-button>
</ion-buttons>
<ion-title>Profilni tahrirlash</ion-title>
</ion-toolbar>
</ion-header>
<ion-content scroll-y="false">
<ion-grid>
<ion-row class="ion-justify-content-center">
<ion-col size-sm="12" size-md="6" size-lg="5" size-xl="4">
<ion-list>
<ion-item>
<ion-input label="Ismingiz" v-model="name"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Yangi parol" v-model="newPassword"></ion-input>
</ion-item>
<ion-item>
<ion-input :readonly="true" label="Emailingiz" v-model="email"></ion-input>
</ion-item>
<ion-button shape="round" @click="profileUpdate" class="mx-auto ml-2 mt-4">Saqlash</ion-button>
</ion-list>
</ion-col>
</ion-row>
</ion-grid>
</ion-content>
</ion-page>
</template>