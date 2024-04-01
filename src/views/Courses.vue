<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { star, videocam, settingsOutline, chatboxEllipses, notificationsOutline } from 'ionicons/icons';
import Authorize from '@/components/Authorize.vue'
import Cap from '@/assets/cap.png'

const courses = ref([
  {
    id: 1,
    title: 'Writing Task 2',
    fee: 'Free',
    desc: '',
    author:'Sarvar Khatamov',
    lessons: 12,
    liked: 200,
    level: 'Intermediate',
    star: 5,
    progress: '0.1'
  },
  {
    id: 2,
    title: 'Writing Task 1',
    fee: 'Free',
    desc: '',
    author:'Teacher Muzaffar',
    lessons: 12,
    level: 'Pre-Intermediate',
    star: 3,
    progress: '0.7'

  },
  {
    id: 3,
    title: 'Speaking',
    fee: 'Free',
    desc: '',
    author:'Kubayev Javlon',
    lessons: 12,
    level: 'Pre-Intermediate',
    star: 4.5,
    progress: '0.4'
  },
  {
    id: 4,
    title: 'Reading',
    fee: 'Free',
    desc: '',
    author:'Alisher Sadullayev',
    lessons: 12,
    level:'Elementary',
    star: 3.4,
    courseBase:[
      {id: 1, title: 'Part 1', video: '', pdf: ''}
    ]
  }
])

console.log(courses)


//Network Status
networkService.getCurrentStatus().then(status => {
  console.log('Current network status:', status);
});



const router = useRouter();




</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Kurslar</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content scroll-y="true">
   <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
  <router-link v-for="course in courses" :to="`/course/${course.id}`" :key="course.id">
    <ion-card class="shadow-sm border border-gray-200/30 rounded-2xl">
    <ion-card-content>
      <div class="flex items-center gap-x-4">
        <div class="bg-gradient-to-r from-[#00CFE8] to-[#1CE7FF] p-2 rounded-xl">
          <img :src="Cap"/>
        </div>
        
        <div class="flex flex-col items center">
          <ion-card-title>{{ course.title }}</ion-card-title>
          <ion-card-subtitle>{{ course.author }}</ion-card-subtitle>
          <div class="flex items-center gap-x-2">
           <span class="flex items-center justify-center"><ion-icon slot="start" :icon="star" color="warning"></ion-icon> {{ course.star }}</span> 
            <p class="text-sm text-gray-400"><small>{{ course.author }}</small></p>
            <p><small>{{ course.level }}</small></p>
          </div>
          <ion-progress-bar class="rounded-full py-1 my-2" :value="course.progress"></ion-progress-bar>
        </div>
      </div>
    </ion-card-content>
    </ion-card>
  </router-link>
   </div>
  </ion-content>
 </ion-page>
 </template>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>