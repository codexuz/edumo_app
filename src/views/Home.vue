<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-title>Kurslar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true">
    
    <ion-list v-for="(course, index) in courses" :key="course.id">
    <router-link :to="`/course/${course.id}`">
    <ion-item  detail="true">
      <ion-label>
      {{ course.title }} <br>
      <span class="px-2 rounded-xl text-sm bg-blue-200/50 text-blue-500">O'quvchilar: {{ course.students.length}}</span>
      </ion-label>
    </ion-item>
    </router-link>
    </ion-list>
     

    <ion-fab  router-link="/add" router-direction="forward" slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { add } from 'ionicons/icons';
import { supabase } from '@/supabase.js'
import { RouterLink, useRouter, RouterView } from 'vue-router'

const router = useRouter() 
const courses = ref()

async function fetchData(){
  let { data, error } = await supabase
  .from('courses')
  .select(`*,
      students(
        *
      )`)
  
  courses.value = data
  console.log(courses.value)
}

onMounted(fetchData)
</script>
