<script setup>
import { ref, onMounted } from 'vue';
import { getDoc, doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { db } from '@/firebase'; // Import your Firebase setup here
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

  const messageId = route.params.id;
  // Fetch the message details by ID
  try {
    const messageDoc = await getDoc(doc(db, 'messages', messageId));
    if (messageDoc.exists()) {
      message.value = messageDoc.data();
    } else {
      console.error('Message not found');
    }
  } catch (error) {
    console.error('Error fetching message:', error);
    // Handle error
  } finally {
    loading.value = false;
  }
});
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
    <ion-content :fullscreen="true" scroll-y="false">
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

