<script setup>
import Waiting from '@/assets/waiting.json'
import { Vue3Lottie } from 'vue3-lottie'


</script>
<template>
<div class="flex  flex-col items-center justify-center">
    <Vue3Lottie class="mx-auto" :animationData="Waiting" :height="400" :width="400" />
</div>
</template>