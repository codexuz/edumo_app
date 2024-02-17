<script setup>
import { ref } from 'vue'
import { logOutOutline, personCircle, shareSocialOutline, chatbubblesOutline, powerOutline } from 'ionicons/icons';
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { signOutUser } from "@/firebase.js";
import { Share } from '@capacitor/share';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const notLoggin = ref(false)

const router = useRouter()



const logOutUser = async () => {
  try {
    await FirebaseAuthentication.signOut();
    router.push('/home', 'back')
     notLoggin.value = true
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    // Handle error gracefully, such as displaying an error message to the user
  }
};


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

    <ion-content class="ion-padding">  
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
        <ion-item @click="logOutUser" color="danger" class="rounded-2xl">
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