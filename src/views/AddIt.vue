<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons>
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true" class="ion-padding">
     
     <ion-list>
    <ion-item>
      <ion-input v-model="title" label="Kurs nomi" placeholder="Kurs nomini kiriting"></ion-input>
    </ion-item>

  </ion-list>
    <ion-button @click="addData" shape="round">Qo'shish</ion-button>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { call } from 'ionicons/icons';
import { supabase } from '@/supabase.js'
import { RouterLink, useRoute, useRouter, RouterView } from 'vue-router'

const router = useRouter() 
const title = ref('')
import {  loadingController } from '@ionic/vue';




async function addData(){
  console.log(joined.value)
  if(!title.value){
    alert("Maydonni to'ldiring")
    return
  }

  const loading = await loadingController.create({
    message: 'Yaratilmoqda...',
  });
  loading.present();

  const { data, error } = await supabase
  .from('courses')
  .insert([
    { title: title.value},
  ])
  .select()
  
  if(data){
     loading.dismiss();
     window.location.href='/'
  }
  else{
    loading.dismiss();
    alert('Xatolik sodir bo\'ldi')
  }

}

</script>