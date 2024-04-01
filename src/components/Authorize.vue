<script setup>
import AuthIcon from '@/assets/authorize.svg'


</script>
<template>
<div class="flex  flex-col items-center justify-center">
 <img :src="AuthIcon" class="w-[50%] sm:w-[200px]"/>
 <p class="px-5 font-medium text-lg text-center">Ilovadan to'liq foydalanish  uchun <br>tizimga kiring</p>
 <ion-button class="shadow-sm" shape="round" color="primary" router-link="/login" router-direction="root">Kirish</ion-button>
</div>
</template>