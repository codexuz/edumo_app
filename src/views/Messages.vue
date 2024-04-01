<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { networkService } from '@/lib/networkService.js'; // Import your network service
import { chevronBackOutline } from 'ionicons/icons'
import Offline from '@/components/Offline.vue'

const message = ref(true);
const loading = ref(false);
const networkStatus = ref(true); // Assuming network is initially available

const route = useRoute();

onMounted(async () => {
  // Check network status
  networkService.getCurrentStatus().then(status => {
    console.log('Current network status:', status);
    networkStatus.value = status;
  });

  if (!networkStatus.value) {
    loading.value = false; // Stop loading if no network
    return; // Don't fetch message if no network
  }
})


</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary" class="px-2">
      <ion-button router-link="/home" router-director="root" fill="clear" slot="start">
        <ion-icon class='text-2xl text-white' :icon="chevronBackOutline"></ion-icon>
      </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="false">
     <ion-grid>
       <ion-row>
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="mx-auto flex flex-col items-center justify-center">
          <Offline v-if="!networkStatus && !message"/>
          <template v-else>
        <h1 class="text-3xl font-bold">🔔 {{ message.title }}</h1>
        <p class="text-lg z">{{ message.text }}</p>
         </template>
         </ion-col>
       </ion-row>
     </ion-grid> 
    </ion-content>
  </ion-page>
</template>

