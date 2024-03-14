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
     <ion-card class="ion-padding ion-text-center">
      <ion-card-title>{{ student.name }}</ion-card-title>
      <p class="text-sm my-3">Qo'shilgan: {{ student.joined }}</p>
      <a class="mt-3 flex items-center justify-center gap-x-2" :href="`tel:${student.phone}`">
      <ion-icon class="text-3xl" :icon="call"></ion-icon>
      <span class="text-xl">{{student.phone}}</span>
      </a>
      <div class="flex items-center justify-center text-2xl mt-5 mb-3 gap-2">
      <router-link :to="`/students/edit/${student.id}`">
      <p class="bg-emerald-200/50 text-emerald-500 flex items-center gap-x-2 text-sm rounded-full py-1 px-3"> <ion-icon :icon="create"></ion-icon>
      Tahrirlash</p>
      </router-link>
      <p @click="deleteUser" class="bg-rose-200/50 text-rose-500 flex items-center gap-x-2 text-sm rounded-full py-1 px-3">
      <ion-icon :icon="trash"></ion-icon>O'chirish</p>
      </div>
     </ion-card>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { call, trash, create } from 'ionicons/icons';
import { supabase } from '@/supabase.js'
import { RouterLink, useRoute, useRouter, RouterView } from 'vue-router'

const router = useRouter() 
const route = useRoute();
const testId = route.params.id;
const student = ref('')





async function fetchData(){
  let { data, error } = await supabase
  .from('students')
  .select('*')
      .eq('id', testId)
      .single();
  
  student.value = data
  console.log(student.value)
}

onMounted(fetchData)

async function deleteUser(){
   const action = confirm()
   if(!action){
    return
   }
   const { error } = await supabase
  .from('students')
  .delete()
  .eq('id', testId)
  window.location.href="/"
  
}

</script>