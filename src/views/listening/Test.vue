<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useRoute } from 'vue-router';
import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel,
} from 'flowbite-vue'

const list_test = ref('')

const route = useRoute()
const testId = route.params.id

async function getListening(){

try {

  const { data, error } = await supabase
          .from('listening_practice')
          .select(`*`)
          .eq('id', testId)
          .single()

      if(data){
        list_test.value = data
      }

}
catch(error){
   console.log(error)
}

}




onMounted(getListening)

</script>

<template>
<ion-page>
  <ion-header class="ion-no-border">
    <ion-toolbar color="primary">
      <ion-buttons>
        <ion-back-button default-href="/listening"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
    <ion-content class="ion-padding">
    <div class="container mx-auto px-4">
    <audio controls :src="list_test.audio"></audio>      
     <h1>{{ list_test.title }}</h1>
     <div>
      <p v-html="list_test.questions"></p>
     </div>
    <fwb-accordion :open-first-item="false" class="mb-9 mt-6">
      <fwb-accordion-panel class="">
        <fwb-accordion-header>Answers</fwb-accordion-header>
        <fwb-accordion-content>
          <div v-html="list_test.answers" class="p-4">
           
          </div>
        </fwb-accordion-content>
      </fwb-accordion-panel>
      </fwb-accordion>
    </div>
    </ion-content>
</ion-page>
</template>