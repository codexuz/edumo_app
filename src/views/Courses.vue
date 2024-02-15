<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, settingsOutline, chatboxEllipses, notificationsOutline } from 'ionicons/icons';
import { onAuthStateChange, signOutUser  } from "@/firebase.js";
import Authorize from '@/components/Authorize.vue'
  

// Network Status
networkService.getCurrentStatus().then(status => {
  console.log('Current network status:', status);
});


const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

const router = useRouter();

const isLoading = ref(true)
const username = ref("O'quvchi")
let profilePicture;

// Example usage of onAuthStateChanged
onAuthStateChange(user => {
  if (user) {
     const { uid, displayName, email } = user;
     profilePicture = user.photoURL
     username.value = displayName;
     isLoading.value = false

  } else {
    console.log('You are not authorized')
    isLoading.value = false
  }
});


</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Kurslar</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content scroll-y="true">
  <ion-grid>
   <ion-row>
     <ion-col class="ion-align-items-center">
     </ion-col>
   </ion-row>
  </ion-grid>
  </ion-content>
 </ion-page>
 </template>


