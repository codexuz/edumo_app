<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, settingsOutline, chatboxEllipses, notificationsOutline } from 'ionicons/icons';
import { onAuthStateChange, signOutUser  } from "@/firebase.js";
import Authorize from '@/components/Authorize.vue'




//Network Status
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

  </ion-content>
 </ion-page>
 </template>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>