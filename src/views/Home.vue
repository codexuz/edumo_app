<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, chatboxEllipses
, chevronBackOutline, notificationsOutline, micOutline } from 'ionicons/icons';
import { db, onAuthStateChange, signOutUser  } from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Offline from '@/components/Offline.vue'
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
const messages = ref([])
const networkStatus = ref(null)


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

import MemberCard from '@/components/MemberCard.vue'
import Features from '@/components/Features.vue'
  

// Network Status
onMounted(()=>{
  networkService.getCurrentStatus().then(status => {
  networkStatus.value = status.connected
});
})



const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

function messageRedirect(){
 isOpen.value = false 
}

const router = useRouter();

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
     notLoggin.value=false

  } else {
    console.log('You are not authorized')
    notLoggin.value=true
  }
});
})


</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
     <ion-toolbar color="primary" class="flex items-center ion-padding-vertical">
    <img slot="start" class="w-10 mx-2 rounded-full" alt="Avatar" :src="profilePicture || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'" />
    <ion-icon @click="setOpen(true)" slot="end" class="mx-2 w-7 h-7 cursor-pointer text-white bg-white/20  rounded-full p-2" :icon="notificationsOutline"></ion-icon>
    <p class="pt-3 text-xl ml-3 text-white font-bold">Salom, {{username}}</p>
    </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding ion-margin-top" scroll-y="true">
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
        <Offline v-if="!networkStatus"/>
        <template v-else>
        <div  class="container bg-blue-50/20 rounded-xl p-3 text-center mx-auto px-4 flex items-center gap-3"
        v-for="message in messages" :key="message.id">
        <router-link @click="messageRedirect"  class="flex items-center gap-3" :to="`/messages/${message.id}`">
         <ion-icon class="w-6 h-8 text-blue-500/60 bg-blue-50 py-1 px-2 rounded-full" :icon="chatboxEllipses"></ion-icon>
         <div class="text-left">
         <p class="text-2xl font-bold text-gray-700">{{ message.title}}</p>
         <span class="text-gray-400"><small>{{message.date}}</small></span>
         </div>
         </router-link>
        </div>
      </template>
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
</template>
