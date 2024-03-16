<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, settingsOutline, chatboxEllipses, notificationsOutline } from 'ionicons/icons';
import { onAuthStateChange, signOutUser  } from "@/firebase.js";
import Authorize from '@/components/Authorize.vue'
  

// Network Status
networkService.getCurrentStatus().then(status => {
  console.log('Current network status:', status);
});


const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

const router = useRouter();

const isLoading = ref(true)
const notLoggin = ref(null)
const username = ref("O'quvchi")
let profilePicture;

// Example usage of onAuthStateChanged
onMounted(()=>{
  onAuthStateChange(user => {
  if (user) {
     const { uid, displayName, email } = user;
     profilePicture = user.photoURL
     username.value = displayName;
     isLoading.value = false
     notLoggin.value = false

  } else {
    console.log('You are not authorized')
    isLoading.value = false
    notLoggin.value = true
  }
});
})



const logOutUser = async()=>{
   signOutUser()
  .then(() => {
    notLoggin.value = true
    console.log('You sign out')
  })
  .catch(error => {
    // Handle sign out error
    console.error(error.message);
  });
};


</script>

<template>
  <ion-page>
  <ion-header class="ion-no-border">
  <ion-toolbar color="primary" class="px-2">
  <ion-title>Natijalarim</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content scroll-y="true">
  <template  v-if="!notLoggin">
  <ion-grid>
   <ion-row>
     <ion-col class="ion-align-items-center">
        
     </ion-col>
   </ion-row>
  </ion-grid>
  </template>
  <template v-else>
 <div class="flex min-h-screen flex-col justify-center items-center">
<Authorize/>
</div>
</template>
  </ion-content>
 </ion-page>
 </template>


