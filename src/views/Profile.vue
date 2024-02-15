<script setup>
import { ref, onMounted } from 'vue'
import { Filesystem } from '@capacitor/filesystem';
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, createOutline, settingsOutline, chevronBackOutline, chatboxEllipses, notificationsOutline } from 'ionicons/icons';
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
const notLoggin = ref(false)
const username = ref("O'quvchi")
const profilePicture = ref(null)
let joinedAt = ref(null)

function formatTimestamp(timestamp) {
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", 
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
  ]; // Azerbaijani month names

  const date = new Date(timestamp);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
    return `${month} ${day}, ${year}`;

}

// Example usage of onAuthStateChanged
onMounted(()=>{
  onAuthStateChange(user => {
  if (user) {
     const { uid, displayName, email } = user;
     profilePicture.value = user.photoURL
     username.value = displayName;
     isLoading.value = false
     joinedAt = formatTimestamp(user.metadata.creationTime)
     
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


//Avatar Uptade

const pickImage = async () => {
  try {
    const image = await Filesystem.pickFile({
      types: [Filesystem.FilePickerFileType.Images],
      displayable: true,
      title: 'Select Image'
    });

    if (image) {
      profilePicture.value = image.uri;
    }
  } catch (error) {
    console.error('Error picking file:', error);
  }
}
</script>

<template>
  <ion-page v-if="!notLoggin">
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Profil</ion-title>
  <ion-icon  @click="setOpen(true)" :icon="settingsOutline" slot="end" size="large"></ion-icon>
  </ion-toolbar>
  </ion-header>

  <ion-content scroll-y="true">
    <ion-modal :is-open="isOpen">
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-title class="text-center">Sozlamalar</ion-title>
          <ion-buttons slot="start">
            <ion-button @click="setOpen(false)">
            <ion-icon :icon="chevronBackOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
          reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
          dicta.
        </p>
      </ion-content>
    </ion-modal>
  <ion-grid>
   <ion-row class="ion-align-items-center ion-justify-content-center">
     <ion-col class="mt-4 flex flex-col items-center justify-center">
       <img :src="profilePicture" class="mb-3 mx-auto w-16 h-16 rounded-full border-2 border-blue-600">
       <ion-button @click="pickImage" siz="large" fill="outline">
       <ion-icon :icon="createOutline" slot="start"></ion-icon>Avatarni o'zgartirish</ion-button>
       <h1 class="text-3xl font-bold">{{ username }}</h1>
       <p>Qo'shilgan: {{ joinedAt }}</p>
     </ion-col>
   </ion-row>
  </ion-grid>
  </ion-content>
 </ion-page>
<div v-else class="flex min-h-screen flex-col justify-center items-center">
<Authorize/>
</div>
 </template>


