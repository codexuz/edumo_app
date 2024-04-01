<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup>
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import Tabs from '@/components/Tabs.vue';
  

</script>

<style>
.dark{
  background: #252525;
  color: white;
}
</style>