<script setup>
import AuthIcon from '@/assets/authorize.svg'


</script>
<template>
<div class="flex flex-col items-center justify-center">
 <img :src="AuthIcon" class="w-[50%] sm:w-[200px]"/>
 <p class="font-medium text-lg text-center">Ilovadan foydalanishda davom etish uchun <br>tizimga kiring</p>
 <ion-button class="shadow-sm text-white" shape="round" color="warning" router-link="/login" router-direction="back">Kirish</ion-button>
</div>
</template>