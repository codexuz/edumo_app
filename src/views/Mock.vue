<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { chevronBackOutline } from 'ionicons/icons'
import { supabase } from '@/lib/supabaseClient.js'

const route = useRoute();
const testId = route.params.id;

const questions = ref([])
const isLoading = ref('Yuklanmoqda')
let test;

const fetchSpeaking = async () => {
  try {
    const { data, error } = await supabase
      .from('tests')
      .select(`*,
      part1(
        *
      ),
      part2(
        *
      )`)
      .eq('id', testId)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }

    if (data) {
      // Assuming 'tests' table has an array of questions under 'questions' field
      questions.value = data; // Assuming 'questions' is an array in the retrieved data
      isLoading.value = "";
      console.log( questions.value )
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    isLoading.value = "Internet aloqasi yo'q"
  }
};

onMounted(fetchSpeaking)

</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/speaking"></ion-back-button>
        </ion-buttons>
       <ion-title>{{ questions.title }}.  {{ questions.topic }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true">
     <ion-grid>
       <ion-row>
         <ion-col size="12" size-md="8" size-lg="6" size-xl="4" class="mx-auto flex flex-col items-center justify-center">
           <p>{{ isLoading }}</p>
         </ion-col>
       </ion-row>
     </ion-grid> 
    </ion-content>
  </ion-page>
</template>

