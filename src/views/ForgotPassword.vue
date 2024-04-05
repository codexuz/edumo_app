<template>
    <ion-page>
    <ion-header class="ion-no-border">
    <ion-toolbar color="light">
    <ion-buttons slot="start">
    <ion-back-button default-href="/login"></ion-back-button>
    </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="false">
    <ion-grid>
    <ion-row class="ion-justify-content-center">
    <ion-col size-sm="12" size-md="6" size-lg="5" size-xl="4">
      <ion-title class="ion-text-center mb-3">Parolni qayta tiklash</ion-title>
      <img :src="ForgotPassword" class="mx-auto"/>
      <p class="text-center my-3 font-bold text-xl">Xavotirga tushmang</p>
      <p class="text-center my-3 text-sm">Hisobingiz ulangan <b>Email</b> manzilni kiriting.</p>
      <form @submit.prevent="resetPassword">
    <ion-list>
    <div class="my-2 px-3 mx-[5%] w-[90%] flex items-center gap-x-2 py-2.5 focus:outline-2 outline-[#2563EB]  border border-[#2563EB] rounded-xl text-gray-700">
          <img :src="sms">
          <input type="email" required v-model="email" class="w-full border-none outline-none" placeholder="Email"/>
       </div>
    <button :disabled="isDisabled" class="my-2 px-3 mx-[5%] w-[90%] py-3 bg-[#2563EB] text-white border border-[#2563EB] rounded-xl text-gray-700">Yuborish</button>
    </ion-list>
    </form>
    </ion-col>
    </ion-row>
    </ion-grid>
    </ion-content>
    </ion-page>
    </template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase.js'
import ForgotPassword from '@/assets/fogotpass.svg'
import sms from '@/assets/sms.svg'
const email = ref('')
import { toastController } from '@ionic/vue';
const isDisabled = ref(false)

async function resetPassword(){
    const toast = await toastController.create({ duration: 2500 })

const { data, error } = await supabase.auth.resetPasswordForEmail(email.value)
        if(error){
            toast.message = error || error.message
            await toast.present()
            return
        }

        toast.message = "Emailingizga parolni qayta tiklash uchun havola yuborildi!"
        await toast.present()
        isDisabled.value = true
}

</script>