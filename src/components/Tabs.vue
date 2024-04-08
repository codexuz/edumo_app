<script setup>

import { personOutline, homeOutline, bookOutline, diamondOutline, podiumOutline, bookmarkOutline } from 'ionicons/icons';
import SolarGraphNewBroken from '@/components/icons/Graph.vue';
import HomeIcon from './icons/HomeIcon.vue';
import BookMark from './icons/BookMark.vue';
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <HomeIcon/>
          <ion-label>Asosiy</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="courses" href="/courses">
          <ion-icon :icon="bookOutline" />
          <ion-label>Kurslar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="result" href="/result">
          <SolarGraphNewBroken/>
          <ion-label>Natijalarim</ion-label>
        </ion-tab-button> 
        
        <ion-tab-button tab="universities" href="/universities">
          <BookMark/>
          <ion-label>Saqlangan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="personOutline" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
