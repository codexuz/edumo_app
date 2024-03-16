<script setup>
import { ref } from 'vue'
import Avatar from '@/assets/favicon.png'
const messages = ref([])
const message = ref(null)

const user = ref({
    name: 'Javlon',
    avatar: Avatar
})

function sendMessage(){
    messages.value.push(message.value)
    message.value=""
}

</script>
<template>

<ion-list>
    <ion-item lines="none" v-for="(xabar, index) in messages" :key="index">
    <div class="relative  flex items-center gap-x-3">
    <img :src="user.avatar" class="w-5 h-5"/>
    <p>{{ xabar }}</p>
    </div>
    </ion-item>
    <ion-item>
        <ion-input v-model="message" placeholder="Enter message"></ion-input>
        <ion-button class="" @click="sendMessage">Send</ion-button>
    </ion-item>
</ion-list>
</template>