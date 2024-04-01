<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { Filesystem } from '@capacitor/filesystem';
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { walletOutline, calendarOutline, cardOutline,diamondOutline, logOutOutline, createOutline, settingsOutline, chevronBackOutline, chatboxEllipses, notificationsOutline, personCircle, shareSocialOutline, chatbubblesOutline, powerOutline } from 'ionicons/icons';
import Avatar from '@/assets/avatar.jpg'
import Authorize from '@/components/Authorize.vue'
import { supabase } from '@/supabase'


// Network Status
networkService.getCurrentStatus().then(status => {
  console.log('Current network status:', status);
});


const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

const router = useRouter();

const LoggedIn = ref(null)
const studentId = ref(null)

const profile = ref({
        full_name: 'O\'quvchi',
        email: '',
        avatar_url: Avatar,
        joinedAt: ''
    })
      

onMounted( async ()=>{
  const { data, error } = await supabase.auth.getSession()
  if(!data){
    console.log('Tizimga kiring')
    LoggedIn.value = false
    return
  }
  studentId.value = data.session.user.id
  getProfile()
})


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

async function getProfile(){

  try{

    const { data, error } = await supabase
            .from('students')
            .select(`*`)
            .eq('id', studentId.value)
            .single()

            if (error && status !== 406) throw error


          if(data){
         // console.log(data)
          LoggedIn.value = true
          profile.value = {
          full_name: data.display_name,
          email: data.email,
          avatar_url: data.avatar_url,
          joinedAt: formatTimestamp(data.created_at)
          
    }

}

  }
  catch(error){
     
  }

}











</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Profil</ion-title>
  <ion-button v-show="LoggedIn" router-link="/settings" router-direction="forward" slot="end" fill="clear">
  <ion-icon color="light" :icon="settingsOutline"  size="large"></ion-icon>
  </ion-button>
  </ion-toolbar>
  </ion-header>
  <ion-content scroll-y="false">  
  <template v-if="LoggedIn">   
  <ion-grid>
   <ion-row class="ion-align-items-center ion-justify-content-center">
     <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="flex flex-col items-center  justify-center">
       <img :src="profile.avatar_url" class="mb-3 mx-auto w-16 h-16 rounded-full border-2 border-blue-600">
       <input id="upload" type="file" @change="handleFileChange" accept="image/*" hidden ref="fileInput">
      <label class="px-5 py-1 rounded-2xl border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-lg font-medium" for="upload">
      <ion-icon :icon="createOutline" slot="start"></ion-icon>
      Rasmni o'zgartirish
      </label>
       <h1 class="text-3xl font-bold">{{ profile.full_name }}</h1>
       <p>Qo'shilgan: {{ profile.joinedAt }} </p>
 
     </ion-col>
   </ion-row>
  </ion-grid>
  </template>
  <template v-else>
<div  class="container mt-10 mx-auto px-4">
<Authorize/>
</div>
</template>
</ion-content>
 </ion-page>
 </template>

