<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService } from '@/lib/networkService.js';
import {notificationsOutline} from 'ionicons/icons';
import Offline from '@/components/Offline.vue'
import Avatar from '@/assets/avatar.jpg'
import MemberCard from '@/components/MemberCard.vue'
import Features from '@/components/Features.vue'
import { supabase } from '@/supabase'

const networkStatus = ref(null)
const studentId = ref(null)

const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

const router = useRouter();

const profile = ref({
  full_name: 'O\'quvchi',
  email: '',
  avatar_url: Avatar,
})

// Function to check and set offline status
const checkOfflineStatus = async () => {
  const isOnline = await networkService.getCurrentStatus();
  networkStatus.value = isOnline;
  return isOnline;
}

// Function to get profile data
async function getProfile() {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`*`)
      .eq('id', studentId.value)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      profile.value = {
        full_name: data.display_name,
        email: data.email,
        avatar_url: data.avatar_url,
      }
    }

  } catch (error) {
    console.error(error);
  }
}

// On mounted, check if online, then get profile data
onMounted(async () => {
  const isOnline = await checkOfflineStatus();
  if (!isOnline.connected) {
    const storedProfile = getStoredProfile();
    if (storedProfile) {
      profile.value = storedProfile;
    } else {
      console.log('No stored profile data available.');
    }
  } else {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log('Tizimga kiring')
      return
    }
    if (data) {
      studentId.value = data.session.user.id
      getProfile()
    }
  }
});

// Function to retrieve profile data from localStorage
function getStoredProfile() {
  const storedProfile = localStorage.getItem('profile');
  return storedProfile ? JSON.parse(storedProfile) : null;
}
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border py-2 px-1">
      <ion-toolbar color="light" class="flex items-center">
        <img slot="start" class="w-10 h-10 mx-2 rounded-full" alt="Avatar" :src="profile.avatar_url" />
        <ion-icon slot="end" class="mx-2 w-7 h-7 cursor-pointer text-gray-800  rounded-full p-2" :icon="notificationsOutline"></ion-icon>
        <p class="text-xl mx-3 text-gray-900 font-bold">Salom, {{profile.full_name}}</p>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" scroll-y="true">
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
