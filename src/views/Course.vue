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
    <h1 class="text-blue-500 text-3xl border-b border-gray-200">{{ students.title }}</h1>
      
      <ion-list v-for="(student, index) in students.students" :key="student.id">
    <router-link :to="`/students/${student.id}`">
    <ion-item detail="true">
      <ion-label>
      <span class=" text-blue-500 mx-1">{{index+1}}.</span> {{ student.name }} <br>
      <span class="px-2 rounded-xl text-sm bg-rose-200/50 text-rose-500">{{ student.phone}}</span>
      </ion-label>
    </ion-item>
    </router-link>
    </ion-list>
    
    <ion-fab  id="open-modal" slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

   <ion-modal trigger="open-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
  <div class="pt-5 mt-5 w-full h-[300px] px-4 flex flex-col ">
    
     <ion-list>
    <ion-item>
      <ion-input v-model="name" label="Ism" placeholder="O'quvchi ismini yozing"></ion-input>
    </ion-item>

    <ion-item>
      <ion-input v-model="phone" label="Telefon" type="tel" placeholder="+998 ** *** ** **"></ion-input>
    </ion-item>
    <ion-item>
      <ion-input type="date" v-model="joined" ></ion-input>
    </ion-item>

  </ion-list>
    <ion-button @click="addData" shape="round">Qo'shish</ion-button>
</div>
    </ion-modal>

    </ion-content>
  </ion-page>
</template>

<style scoped>

  ion-modal {
    --height: auto;
  }
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { call, add } from 'ionicons/icons';
import { supabase } from '@/supabase.js'
import { RouterLink, useRoute, useRouter, RouterView } from 'vue-router'
import sampleAnswers from '@/assets/vocabulary.json'

console.log(sampleAnswers)
const router = useRouter() 
const route = useRoute();
const testId = route.params.id;
const students = ref('')

async function fetchData(){
  let { data, error } = await supabase
  .from('courses')
  .select(`*,
      students(
        *
      )`)
      .eq('id', testId)
      .single();
  
  students.value = data
}

onMounted(fetchData)

const name = ref('')
const phone = ref('')
const joined = ref('')
import {  loadingController } from '@ionic/vue';




async function addData(){
  if(!name.value || !phone.value || !joined.value){
    alert("Maydonlarni to'ldiring")
    return
  }

  const loading = await loadingController.create({
    message: 'Yaratilmoqda...',
  });
  loading.present();

  const { data, error } = await supabase
  .from('students')
   .insert([
    { name: name.value, phone: phone.value, course_id:  testId, joined: joined.value},
  ])
  .select()
  
  if(data){
     loading.dismiss();
     window.location.reload()
  }
  else{
    loading.dismiss();
    alert('Xatolik sodir bo\'ldi')
  }

}

</script>