<script setup>

import { person, home, school, statsChart } from 'ionicons/icons';

</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Asosiy</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="courses" href="/courses">
          <ion-icon :icon="school" />
          <ion-label>Kurslar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="result" href="/result">
          <ion-icon :icon="statsChart" />
          <ion-label>Natijalarim</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
