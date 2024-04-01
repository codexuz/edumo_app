<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { networkService  } from '@/lib/networkService.js';
import { logOutOutline, chatboxEllipses
, chevronBackOutline, notificationsOutline, micOutline } from 'ionicons/icons';
import Offline from '@/components/Offline.vue'
import Avatar from '@/assets/avatar.jpg'
import MemberCard from '@/components/MemberCard.vue'
import Features from '@/components/Features.vue'
import { supabase } from '@/supabase'

const networkStatus = ref(null)
const studentId = ref(null)
const LoggedIn = ref(null)




  

// Network Status
onMounted(()=>{
  networkService.getCurrentStatus().then(status => {
  networkStatus.value = status.connected
});
})



const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open)

function messageRedirect(){
 isOpen.value = false 
}

const router = useRouter();

const profile = ref({
        full_name: 'O\'quvchi',
        email: '',
        avatar_url: Avatar,
    })
      

onMounted( async ()=>{
  const { data, error } = await supabase.auth.getSession()
  if(error){
    console.log('Tizimga kiring')
    LoggedIn.value = false
    return
  }
  if(data){
    studentId.value = data.session.user.id
    getProfile()
  }
  
})


async function getProfile(){

try{

  const { data, error } = await supabase
          .from('students')
          .select(`*`)
          .eq('id', studentId.value)
          .single()

          if (error && status !== 406) throw error

         if(data){

        console.log(data)
        LoggedIn.value = true
        profile.value = {
              full_name: data.display_name,
              email: data.email,
              avatar_url: data.avatar_url,
            }
        
      }

}
catch(error){
   
}

}


 


</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border" v-show="LoggedIn">
     <ion-toolbar color="primary" class="flex items-center ion-padding-vertical">
    <img slot="start" class="w-10 h-10 mx-2 rounded-full" alt="Avatar" :src="profile.avatar_url" />
    <ion-icon @click="setOpen(true)" slot="end" class="mx-2 w-7 h-7 cursor-pointer text-white bg-white/20  rounded-full p-2" :icon="notificationsOutline"></ion-icon>
    <p class="pt-3 text-xl ml-3 text-white font-bold">Salom, {{profile.full_name}}</p>
    </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-top" scroll-y="true">
      <ion-grid>
      <ion-row class="ion-justify-content-center">
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4">
         <MemberCard/>
         <div class="mt-4 pt-3">
         <Features />
         </div>  

      </ion-col>
      </ion-row>
    </ion-grid>
    </ion-content>
  </ion-page>
</template>
