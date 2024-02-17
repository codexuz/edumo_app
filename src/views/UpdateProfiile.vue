<script setup>
import { ref, onMounted } from 'vue'
import {auth} from '@/firebase.js'
import { updateProfile } from "firebase/auth";
import { arrowBackOutline } from 'ionicons/icons';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const name = ref(null)
const email = ref(null)
const newPassword = ref(null)
const currentUser = auth.currentUser;

const user = auth.currentUser;
if (user !== null) {
  name.value = user.displayName;
  email.value = user.email;
}

const updatePassword = async () => {
  if (!currentUser) {
    return;
  }
  await FirebaseAuthentication.updatePassword({
    newPassword: newPassword.value,
  });
};

async function profileUpdate(){
      try {
        updatePassword()
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
<ion-button href="/settings" slot="start" fill="clear">
<ion-icon color="light" :icon="arrowBackOutline"></ion-icon>
</ion-button>
<ion-title>Profilni tahrirlash</ion-title>
</ion-toolbar>
</ion-header>
<ion-content>
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
<ion-button @click="profileUpdate">Saqlash</ion-button>
</ion-list>
</ion-content>
</ion-page>
</template>