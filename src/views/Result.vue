<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, settingsOutline, chatboxEllipses, notificationsOutline } from 'ionicons/icons';
import Authorize from '@/components/Authorize.vue'
  

// Network Status
networkService.getCurrentStatus().then(status => {
  console.log('Current network status:', status);
});


const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

const router = useRouter();

const notLoggin = ref(null)









</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Natijalarim</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content>
  <template  v-if="!notLoggin">
  <ion-grid>
   <ion-row>
     <ion-col class="ion-align-items-center">
        
     </ion-col>
   </ion-row>
  </ion-grid>
  </template>
  <template v-else>
 <div class="container mt-10 mx-auto px-4">
<Authorize/>
</div>
</template>
  </ion-content>
 </ion-page>
 </template>


