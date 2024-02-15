<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, chatboxEllipses
, chevronBackOutline, notificationsOutline, micOutline } from 'ionicons/icons';
import { db, onAuthStateChange, signOutUser  } from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const messages = ref([])

async function fetchMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const fetchedMessages = [];
    querySnapshot.forEach((doc) => {
      const message = doc.data();
      message.id = doc.id;
      fetchedMessages.push(message);
    });
    messages.value = fetchedMessages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    // Handle error
  }
}

fetchMessages();

import Authorize from '@/components/Authorize.vue'
import MemberCard from '@/components/MemberCard.vue'
import Features from '@/components/Features.vue'
  

// Network Status
networkService.getCurrentStatus().then(status => {
  console.log('Current network status:', status);
});


const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

const router = useRouter();

const isLoading = ref(true)
const notLoggin = ref(false)
const username = ref("O'quvchi")
let profilePicture;

// Example usage of onAuthStateChanged
onMounted(()=>{
onAuthStateChange(user => {
  if (user) {
     const { uid, displayName, email } = user;
     profilePicture = user.photoURL
     username.value = displayName;
     isLoading.value = false

  } else {
    console.log('You are not authorized')
    isLoading.value = false
    notLoggin.value = true
  }
});
})


const logOutUser = async()=>{
   signOutUser()
  .then(() => {
    notLoggin.value = true
    console.log('You sign out')
  })
  .catch(error => {
    // Handle sign out error
    console.error(error.message);
  });
};


</script>

<template>
  <ion-page v-if="!isLoading">
    <ion-header class="ion-no-border">
     <ion-toolbar color="primary" class="flex items-center ion-padding-vertical">
    <img slot="start" class="w-10 mx-2 rounded-full" alt="Avatar" :src="profilePicture || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'" />
    <ion-icon @click="setOpen(true)" slot="end" class="mx-2 w-7 h-7 cursor-pointer text-white bg-white/20  rounded-full p-2" :icon="notificationsOutline"></ion-icon>
    <p class="pt-3 text-xl ml-3 text-white font-bold">Salom, {{username}}</p>
    </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-top" scroll-y="true">
    <ion-modal :is-open="isOpen">
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-title class="text-center">Xabarnomalar</ion-title>
          <ion-buttons slot="start">
            <ion-button @click="setOpen(false)">
            <ion-icon :icon="chevronBackOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <Authorize v-if="notLoggin"/>
        <div v-else class="container bg-blue-50/20 rounded-xl p-3 text-center mx-auto px-4 flex items-center gap-3"
        v-for="message in messages" :key="message.id">
        <router-link class="flex items-center gap-3" :to="`/messages/${message.id}`">
         <ion-icon class="w-6 h-8 text-blue-500/60 bg-blue-50 py-1 px-2 rounded-full" :icon="chatboxEllipses"></ion-icon>
         <div class="text-left">
         <p class="text-2xl font-bold text-gray-700">{{ message.title}}</p>
         <span class="text-gray-400"><small>{{message.date}}</small></span>
         </div>
         </router-link>
        </div>
      </ion-content>
    </ion-modal>
      <ion-grid>
      <ion-row class="ion-justify-content-center">
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4">
         <MemberCard/>
         <div class="mt-4 pt-3">
         <Features />
         </div>
      </ion-col>
      </ion-row>
    </ion-grid>
    </ion-content>
  </ion-page>
  <div v-else class="text-center text-lg text-blue-600 mt-5"><ion-spinner name="lines-sharp" color="primary"></ion-spinner></div>
</template>
