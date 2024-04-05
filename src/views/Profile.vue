<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import {  createOutline, calendarNumberOutline, settingsOutline } from 'ionicons/icons';
import Avatar from '@/assets/avatar.jpg'
import pen from '@/assets/pen.png'
import Location from '@/assets/location.svg'
import calendar from '@/assets/calendar.svg'
import Authorize from '@/components/Authorize.vue'
import { supabase } from '@/supabase'

const router = useRouter();

const LoggedIn = ref(false)
const loading = ref(true)
const studentId = ref(null)
const profile = ref({
  full_name: 'O\'quvchi',
  email: '',
  avatar_url: Avatar,
  joinedAt: ''
})

function getStoredProfile() {
  const storedProfile = localStorage.getItem('profile');
  if (storedProfile) {
    return JSON.parse(storedProfile);
  }
  return null;
}

function storeProfileInStorage(profileData) {
  localStorage.setItem('profile', JSON.stringify(profileData));
}

function clearStoredProfile() {
  localStorage.removeItem('profile');
}

async function fetchData() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log('Tizimga kiring')
      LoggedIn.value = false
      loading.value = false
      return
    }
    studentId.value = data.session.user.id
    getProfile()
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  const isOnline = await networkService.getCurrentStatus();
  if (!isOnline.connected) {
    const storedProfile = getStoredProfile();
    if (storedProfile) {
      profile.value = storedProfile;
      LoggedIn.value = true;
      loading.value = false;
    } else {
      console.log('No stored profile data available.');
      loading.value = false;
    }
  } else {
    fetchData();
  }
});

async function getProfile() {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`*`)
      .eq('id', studentId.value)
      .single()
    if (error && status !== 406) throw error

    if (data) {
      LoggedIn.value = true;
      loading.value = false;
      const formattedProfile = {
        full_name: data.display_name,
        email: data.email,
        avatar_url: data.avatar_url,
        joinedAt: formatTimestamp(data.created_at)
      };
      storeProfileInStorage(formattedProfile);
      profile.value = formattedProfile;
    }
  } catch (error) {
    console.error(error);
  }
}

function formatTimestamp(timestamp) {
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", 
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
  ];
  const date = new Date(timestamp);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

function goSettings() {
  router.push('/settings', 'forward')
}

onUnmounted(() => {
  clearStoredProfile();
});
</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border ion-padding" v-show="LoggedIn">
  <ion-toolbar color="light">
    <div class="relative" slot="start">
               <img :src="profile.avatar_url" class="w-[70px] h-[70px] rounded-full bg-gray-400 border-2 border-gray-300">
               <img :src="pen" class="absolute right-[-8px] bottom-[15px] cursor-pointer">
    </div>
    <div slot="end">
          <ion-icon :icon="settingsOutline" @click="goSettings" class="text-2xl"></ion-icon>
    </div>
  </ion-toolbar>
  <div>
            <h1 class="text-xl font-bold">{{ profile.full_name }}</h1>
            <div class="flex items-start gap-x-2">
              <img :src="Location" class="w-5 h-5"/>
              <p class="text-[#515960]">Navoiy, Uzbekistan</p>
            </div>
            <div class="flex items-start gap-x-2">
              <img :src="calendar" class="w-4 h-4"/>
              <p  class="text-[#515960]"> {{ profile.joinedAt }} </p>
            </div>
        </div>
</ion-header>
  <ion-content scroll-y="false">  
<div v-show="loading"  class="flex flex-col justify-center items-center">
<Authorize/>
</div>
  <ion-grid v-show="!loading && LoggedIn">
   <ion-row class="ion-align-items-center ion-justify-content-between">
     <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="flex flex-col justify-start px-6">
    <p class="font-bold text-xl">Kurslarim</p>
     </ion-col>
   </ion-row>
  </ion-grid>
</ion-content>
 </ion-page>
 </template>

