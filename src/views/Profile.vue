<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { Filesystem } from '@capacitor/filesystem';
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { walletOutline, calendarOutline, cardOutline,diamondOutline, logOutOutline, createOutline, settingsOutline, chevronBackOutline, chatboxEllipses, notificationsOutline, personCircle, shareSocialOutline, chatbubblesOutline, powerOutline } from 'ionicons/icons';
import { db, auth, onAuthStateChange, signOutUser, updateUserProfile, uploadFile } from "@/firebase.js";
import { doc, getDoc, updateDoc  } from "firebase/firestore";



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
let userId = ref(null)
let balance = ref(null)
let status = ref(null)
let expiredDate = ref(null)
let tariff = ref(null)

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
     userId.value = uid
     profilePicture.value = user.photoURL
     username.value = displayName;
     isLoading.value = false
     notLoggin.value = false
     joinedAt = formatTimestamp(user.metadata.creationTime)
     
  } else {
    console.log('You are not authorized')
    isLoading.value = false
    notLoggin.value = true
  }
});

})




//Avatar Uptade

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const downloadURL = await uploadFile(file);
      profilePicture.value = downloadURL; // Assign the downloadURL directly
      updateUserProfile(username.value, downloadURL);
 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
};

// Define ref for theme toggle
    const themeToggle = ref(false);

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Add or remove the "dark" class on the document body
    const toggleDarkTheme = (shouldAdd) => {
      document.body.classList.toggle('dark', shouldAdd);
    };

    // Check/uncheck the toggle and update the theme based on isDark
    const initializeDarkTheme = (isDark) => {
      themeToggle.value = isDark;
      toggleDarkTheme(isDark);
    };

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));

    // Listen for the toggle check/uncheck to toggle the dark theme
    const toggleChange = (ev) => {
      toggleDarkTheme(ev.detail.checked);
    };



watchEffect(()=>{
  const fetchUserData = async ()=>{
      const docRef = doc(db, "users", userId.value);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        balance.value = userData.balance
        tariff.value = userData.tariff
        if(!userData.expiresAt){
           expiredDate.value = "Noma'lum"  
        }
        else{
          const expiresIn = userData.expiresAt.toMillis()
          const expire = new Date(expiresIn)

         expiredDate.value = expire.toLocaleDateString('uz-UZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        }
        if(userData.status === "paid"){
           status.value = "To'langan"
        }
        else{
          status.value = "To'lanmagan"
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
  }

  fetchUserData()

})


</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Profil</ion-title>
  <ion-button v-show="!notLoggin" router-link="/settings" router-direction="forward" slot="end" fill="clear">
  <ion-icon color="light" :icon="settingsOutline"  size="large"></ion-icon>
  </ion-button>
  </ion-toolbar>
  </ion-header>

  <ion-content scroll-y="false">  
  <template v-if="!notLoggin">   
  <ion-grid>
   <ion-row class="ion-align-items-center ion-justify-content-center">
     <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="flex flex-col items-center  justify-center">
       <img :src="profilePicture || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'" class="mb-3 mx-auto w-16 h-16 rounded-full border-2 border-blue-600">
       <input id="upload" type="file" @change="handleFileChange" accept="image/*" hidden ref="fileInput">
      <label class="px-5 py-1 rounded-2xl border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-lg font-medium" for="upload">
      <ion-icon :icon="createOutline" slot="start"></ion-icon>
      Rasmni o'zgartirish
      </label>
       <h1 class="text-3xl font-bold">{{ username }}</h1>
       <p>Qo'shilgan: {{ joinedAt }}</p>
    <ion-list class="w-[70%] sm:w-[200px]">
    <ion-item>
      <ion-icon color="primary" aria-hidden="true" :icon="cardOutline" slot="start"></ion-icon>
      <ion-label> {{ balance }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon color="primary" aria-hidden="true" :icon="diamondOutline" slot="start"></ion-icon>
      <ion-label> {{ status }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon color="primary" aria-hidden="true" :icon="calendarOutline" slot="start"></ion-icon>
      <ion-label> {{ expiredDate }}</ion-label>
    </ion-item>
      <ion-item>
      <ion-icon color="primary" aria-hidden="true" :icon="walletOutline" slot="start"></ion-icon>
      <ion-label> {{ tariff }}</ion-label>
    </ion-item>
    </ion-list>
     </ion-col>
   </ion-row>
  </ion-grid>
  </template>
  <template v-else>
<div  class="flex min-h-screen flex-col justify-center items-center">
<Authorize/>
</div>
</template>
</ion-content>
 </ion-page>
 </template>

