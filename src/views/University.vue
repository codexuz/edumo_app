<template>
    <ion-page>
    <ion-header class="ion-no-border">
        <ion-toolbar color="primary ion-padding" >
            <ion-searchbar class="border-none" placeholder="Qidirish..." color="primary" v-model="searchQuery" @ionInput="filterItems($event)"></ion-searchbar>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
    <ion-card class="shadow-sm border border-gray-200/30 rounded-2xl" v-for="university in paginatedUniversities" :key="university.id">
        <ion-card-header>
            <div v-if="university.ownership_form === 11">
                <ion-badge class="absolute right-2 top-2">Davlat</ion-badge>
            </div>
            <div v-else-if="university.ownership_form === 12">
                <ion-badge class="absolute right-2 top-2">Xususiy</ion-badge>
            </div>
            <div v-else="university.ownership_form === 13">
                <ion-badge class="absolute right-2 top-3">Xorijiy</ion-badge>
            </div>
           
            <ion-card-title class="mt-4"> {{ university.name_uz }}</ion-card-title>
            <p class="my-3">
                <b>Manzil: </b>{{ university.address }}
            </p>
            <div class="flex items-start my-2">
                <ion-icon :icon="location"></ion-icon>
                <a class="text-sm text-gray-500 underline" target="_blank" :href="university.location">Joylashuvi</a>
            </div>
            <div class="flex flex-col">
                <a :href="'tel:+' + university.phone_number">
                <ion-icon :icon="call"></ion-icon>
                {{ "+"+ university.phone_number }}
                </a>
                <a :href="university.website" target="_blank">
                    <span>Sayt:</span>
                    {{ university.website }}
                </a>
            </div>

            <div class="flex items-center mt-2 gap-x-3">
            <a :href="university.instagram" target="_blank">
                <ion-icon :icon="logoInstagram" class="text-rose-500 text-lg"></ion-icon>
            </a>

            <a :href="university.youtube" target="_blank">
                <ion-icon :icon="logoYoutube" class="text-rose-500 text-lg"></ion-icon>
            </a>
              
            </div>
            
        </ion-card-header>
    </ion-card>
    </div>
    <div class="flex justify-center mt-4">
        <fwb-pagination v-model="currentPage" :total-pages="totalPages" show-icons :show-labels="false"></fwb-pagination>
    </div>


    </ion-content>
</ion-page>
</template>

<script setup>
import { location, call, logoYoutube, logoInstagram } from 'ionicons/icons';
import { ref, computed } from 'vue';
import universitiesData from '@/assets/universities.json';
const searchQuery = ref('');
const universities = ref(universitiesData);
const itemsPerPage = 12;
const currentPage = ref(1);
import { FwbPagination } from 'flowbite-vue'


const filteredUniversities = computed(() => {
  if (!searchQuery.value) {
    return universities.value;
  }

  const query = searchQuery.value.toLowerCase();
  return universities.value.filter(university =>
    university.name_uz.toLowerCase().includes(query) ||
    university.address.toLowerCase().includes(query)   
    );
});

const totalPages = computed(() => Math.ceil(filteredUniversities.value.length / itemsPerPage));

const paginatedUniversities = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredUniversities.value.slice(startIndex, endIndex);
});

function filterItems(event) {
  searchQuery.value = event.target.value.toLowerCase();
  currentPage.value = 1; // Reset to first page when filtering
}

</script>

<style scoped>
ion-searchbar{
    --box-shadow: none;
    
}

</style>