<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { RouterLink } from 'vue-router';
const list_test = ref()



async function getListening(){

try {

  const { data, error } = await supabase
          .from('listening_practice')
          .select(`*`)
          .order('created_at', { ascending: true })

      if(data){
       // console.log(data)
        list_test.value = data
       
        
      }

}
catch(error){
   console.log(error)
}

}




onMounted(getListening)

</script>

<template>
<ion-page>
  <ion-header class="ion-no-border">
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>Listening</ion-title>
    </ion-toolbar>
  </ion-header>
    <ion-content class="ion-padding">
    <div class="grid grid-cols-1 w-full sm:grid-cols-5  mx-auto sm:px-4">
        <ion-card v-for="ques in list_test" :key="ques.id" color="primary" class="shadow-xl rounded-xl">
          <ion-card-header :router-link="`/listening/${ques.id}`">
          <ion-card-title>{{ ques.title }}</ion-card-title>
          <ion-card-subtitle>{{ ques.level + '-'}} {{ ques.type }}</ion-card-subtitle>
        </ion-card-header>        
      </ion-card>
      
    </div>
    </ion-content>
</ion-page>
</template>