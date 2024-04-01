<script setup>
import { ref } from 'vue'
import { logOutOutline, personCircle, shareSocialOutline, chatbubblesOutline, powerOutline } from 'ionicons/icons';
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { Share } from '@capacitor/share';
import { supabase } from '@/supabase'
import {  toastController, loadingController } from '@ionic/vue';
import { Dialog } from '@capacitor/dialog';



const notLoggin = ref(false)

const router = useRouter()



const confirmExit = async () => {
  const { value } = await Dialog.confirm({
    title: 'Chiqish',
    message: `Hisobingizdan chiqmoqchimisiz?`,
  });

  if(!value){
    return
  }

  logOutUser()
};


const logOutUser = async () => {
  const toast = await toastController.create({ duration: 2500 })
  
  try{
    const { error } = await supabase.auth.signOut()
    if(error){
      toast.message = error
      await toast.present()
      return
    }
    router.push('/login', 'back')
  }
  catch(error){
   toast.message = error.error_description || error.message
   await toast.present()
  }
  

}


async function shareApp(){
  try {
    await Share.share({
      title: 'ExamOnline Edumo',
      text: 'Multilevel imtihoniga tayyorlanuvchilar uchun ilova',
      url: 'https://play.google.com/store/apps/details?id=vercel.multiexam.app&hl=en&gl=US',
      dialogTitle: 'Do\'stlaringiz bilan ulashing',
    });
  } catch (error) {
    // Handle the error here
    console.error('Error sharing app:', error);
    // You can also provide feedback to the user if needed
    // For example: alert('Failed to share the app');
  }
}


</script>

<template>
 <ion-page>
    <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
            <ion-buttons>
                <ion-back-button default-href="/profile"></ion-back-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" scroll-y="false">  
        <ion-grid>
   <ion-row class="ion-align-items-center ion-justify-content-center">
     <ion-col size-sm="12" size-xl="4" size-lg="5" size-md="8">
    <ion-list-header>Profil ma'lumotlari</ion-list-header>
    <ion-list :inset="true">
      <ion-item :button="true" router-link="/update" router-direction="forward">
        <ion-icon :icon="personCircle" slot="start"></ion-icon>
        Profilni tahrirlash
      </ion-item>
      <ion-item :button="true" @click="shareApp">
        <ion-icon :icon="shareSocialOutline" slot="start"></ion-icon>
        Do'stlarga ulashish 
      </ion-item>
      <ion-item :button="true" href="https://t.me/javlon_developer" target="_blank">
        <ion-icon :icon="chatbubblesOutline" slot="start"></ion-icon>
        Yordam so'rash 
      </ion-item>
    </ion-list>
    <ion-list :inset="true">
        <ion-item @click="confirmExit" color="danger" class="rounded-2xl mx-6">
          <ion-icon :icon="powerOutline" slot="start"></ion-icon>
          Chiqish
        </ion-item>
    </ion-list> 
        </ion-col>
      </ion-row>
    </ion-grid>
      </ion-content>
 </ion-page>   
</template>