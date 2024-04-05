<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { loadingController, toastController } from '@ionic/vue';
import { supabase } from '@/supabase'
import updateUser from '@/assets/updateUser.svg'
import { networkService  } from '@/lib/networkService.js';


const router = useRouter()
const name = ref(null)
const email = ref(null)
const newPassword = ref(null)
const studentId = ref(null)

let toast;
let loading;

// Function to check if the user is online
async function checkOnlineStatus() {
  const isOnline = await networkService.getCurrentStatus();
  return isOnline;
}

// Function to get user data
async function getUser() {
  const { data } = await supabase.auth.getUser()
  if (!data) {
    console.log('Tizimga kiring')
    return
  }

  studentId.value = data.user.id
  getProfile()
}

onMounted(async () => {
  const isOnline = await checkOnlineStatus();
  if (isOnline.connected) {
    getUser();
  } else {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      name.value = storedName;
    }
  }
})

// Function to get profile data
async function getProfile() {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`*`)
      .eq('id', studentId.value)
      .single()

    if (data) {
      name.value = data.display_name
      email.value = data.email
      localStorage.setItem('name', name.value)
    }

  } catch (error) {
    console.error(error);
  }
}

// Function to update user email and password
async function updateUserEmailandPassword() {
  toast = await toastController.create({ duration: 2500 })
  loading = await loadingController.create({});

  try {
    loading.present()
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword.value,
    })

    if (error) {
      toast.message = error.message
      await toast.present()
      loading.dismiss()
      return
    }

    if (data) {
      updateUserName()
      loading.dismiss()
    }

  } catch (error) {
    console.log(error)
    toast.message = error.message
    await toast.present()
    loading.dismiss()
  }
}

// Function to update user name
async function updateUserName() {
  toast = await toastController.create({ duration: 2500 })
  loading = await loadingController.create({});

  try {
    const { data, error } = await supabase
      .from('students')
      .update({ display_name: name.value })
      .eq('id', studentId.value)
      .select()

    if (error) {
      toast.message = error.message
      await toast.present()
      return
    }

    if (data) {
      toast.message = "Mufavaqqiyatli yangilandi"
      await toast.present()
      await window.location.reload()
    }

  } catch (error) {
    console.log(error)
    toast.message = error.message
    await toast.present()
  }

  // Update stored name in localStorage
  localStorage.setItem('name', name.value);
}
</script>

<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar color="light">
<ion-buttons slot="start">
<ion-back-button default-href="/settings"></ion-back-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content scroll-y="false">
<ion-grid>
<ion-row class="ion-justify-content-center">
<ion-col size-sm="12" size-md="6" size-lg="5" size-xl="4">
  <ion-title class="ion-text-center mb-3">Profilni tahrirlash</ion-title>
  <img :src="updateUser" class="mx-auto"/>
  <p class="text-center my-3 font-bold text-xl">Ma'lumotlarni tahrirlash</p>
  <form @submit.prevent="updateUserEmailandPassword">
<ion-list>
<input type="text" v-model="name" class="my-2 px-3 mx-[5%] w-[90%] py-2.5 focus:outline-2 outline-[#2563EB]  border border-[#2563EB] rounded-xl text-gray-700"/>
<input type="text" v-model="newPassword" placeholder="Yangi parol kiritish" class="my-2 px-3 mx-[5%] w-[90%] py-2.5 focus:outline-2 outline-[#2563EB]  border border-[#2563EB] rounded-xl text-gray-700"/>
<button class="my-2 px-3 mx-[5%] w-[90%] py-3 bg-[#2563EB] text-white border border-[#2563EB] rounded-xl text-gray-700">Parolni O'zgartirish</button>
</ion-list>
</form>
</ion-col>
</ion-row>
</ion-grid>
</ion-content>
</ion-page>
</template>
