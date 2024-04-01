<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { arrowBackOutline } from 'ionicons/icons';
import {  loadingController, toastController } from '@ionic/vue';
import { supabase } from '@/supabase'

const router = useRouter()
const name = ref(null)
const email = ref(null)
const newPassword = ref(null)
const studentId = ref(null)

let toast;
let loading;

const getUser = async () => {
  const { data} = await supabase.auth.getUser()
  if(!data){
    console.log('Tizimga kiring')
    return
  }

  studentId.value = data.user.id
  getProfile()
}

onMounted(getUser)


async function getProfile(){

try {

  const { data, error } = await supabase
          .from('students')
          .select(`*`)
          .eq('id', studentId.value)
          .single()

      if(data){
        //console.log(data)
        name.value = data.display_name
        email.value = data.email
        
      }

}
catch(error){
   console.log(error)
}

}


async function updateUserEmailandPassword(){
  toast = await toastController.create({ duration: 2500 })
  loading = await loadingController.create({});
 
  if(!newPassword.value){
      toast.message = "Maydon bo'sh qolishi mumkin emas"
      await toast.present()
      return
    }

  try {
      loading.present()
      const { data, error } = await supabase.auth.updateUser({
      password: newPassword.value,
    })

    if(error){
      toast.message = error.message
      await toast.present()
      loading.dismiss()
      return
    }

    if(data){
      updateUserName()
      loading.dismiss()
    }

  }

  catch(error){
  console.log(error)
  toast.message = error.message 
  await toast.present()
  loading.dismiss()
  }
}



async function updateUserName(){

  toast = await toastController.create({ duration: 2500 })
  loading = await loadingController.create({});

  if(!name.value){
      toast.message = "Maydon bo'sh qolishi mumkin emas"
      await toast.present()
      return
    }

  try {

    const { data, error } = await supabase
    .from('students')
    .update({ display_name: name.value})
    .eq('id', studentId.value)
    .select()

    if(error){
      toast.message = error.message
      await toast.present()
      return
    }

    if(data){
      toast.message = "Mufavaqqiyatli yangilandi"
      await toast.present()
    }

    

  }
  catch(error){
    console.log(error)
    toast.message = error.message 
    await toast.present()
  }
  
}
</script>

<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar color="primary">
<ion-buttons>
<ion-back-button default-href="/settings"></ion-back-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content scroll-y="false">
<ion-grid>
<ion-row class="ion-justify-content-center">
<ion-col size-sm="12" size-md="6" size-lg="5" size-xl="4">
<ion-list>
<ion-item>
<ion-input label="Ismingiz" v-model="name"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Yangi parol" placeholder="Yangi parol kiriting..." v-model="newPassword"></ion-input>
</ion-item>
<ion-item>
<ion-input readonly="true" label="Emailingiz" v-model="email"></ion-input>
</ion-item>
<ion-button shape="round" @click="updateUserEmailandPassword" class="mx-auto ml-2 mt-4">Saqlash</ion-button>
</ion-list>
</ion-col>
</ion-row>
</ion-grid>
</ion-content>
</ion-page>
</template>