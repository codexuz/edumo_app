<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel,
} from 'flowbite-vue'

const list_test = ref()



async function getListening(){

try {

  const { data, error } = await supabase
          .from('listening_practice')
          .select(`*`)
          .order('created_at', { ascending: true })

      if(data){
        console.log(data)
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
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
    <ion-content class="ion-padding">
    <div class="container mx-auto px-4" v-for="ques in list_test" :key="ques.id">
    <audio controls :src="ques.audio"></audio>      
     <h1>{{ ques.title }}</h1>
     <button class="bg-blue-200/30 text-blue-500 px-5 py-[3px] rounded-xl text-sm mb-4">{{ ques.type }} - {{ ques.level }} </button>
    <p v-html="ques.questions" class="mb-5 pb-5"></p>
    <fwb-accordion :open-first-item="false" class="mb-9 mt-6">
      <fwb-accordion-panel>
        <fwb-accordion-header>Answers</fwb-accordion-header>
        <fwb-accordion-content>
          <div v-html="ques.answers">
           
          </div>
        </fwb-accordion-content>
      </fwb-accordion-panel>
      </fwb-accordion>
    </div>
    </ion-content>
</ion-page>
</template>