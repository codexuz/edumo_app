<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { chevronBackOutline } from 'ionicons/icons'

const route = useRoute();
const testId = route.params.id;
console.log(testId)
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/speaking"></ion-back-button>
        </ion-buttons>
       <ion-title class="ion-text-center">Mock Tests</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" scroll-y="false">
     <ion-grid>
       <ion-row>
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="mx-auto flex flex-col items-center justify-center">
      
         </ion-col>
       </ion-row>
     </ion-grid> 
    </ion-content>
  </ion-page>
</template>

