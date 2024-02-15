<script setup>
import communityIcon from '@/assets/community.png'
</script>
<template>
<ion-card href="https://t.me/examonline_edumo" target="_blank" class="max-w-lg rounded-2xl mx-auto bg-blue-600">
    <div class="flex items-center justify-between">
    <div>
    <ion-card-header>
      <ion-card-title class="text-white">Telegram Community</ion-card-title>
      <ion-card-subtitle class="text-white">Join US Now!</ion-card-subtitle>
    </ion-card-header>
   <ion-button shape="round" color="light"  href="https://t.me/examonline_edumo" target="_blank" class="ion-margin-horizontal mb-3 rounded-2xl"><span class="text-blue-600">Join</span></ion-button>
    </div>
    <img :src="communityIcon" class="mr-5" slot="end" />
    </div>
  </ion-card>
</template>