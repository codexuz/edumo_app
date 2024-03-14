<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons>
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="true" class="ion-padding">
     
     <ion-list>
    <ion-item>
      <ion-input v-model="newName"  placeholder="Ism"></ion-input>
    </ion-item>

    <ion-item>
    <ion-input type="tel" v-model="newPhone"  placeholder="+998 ** *** ** **"></ion-input>
    </ion-item>

        <ion-item>
    <ion-input type="date" v-model="newDate"  placeholder="Kelgan sanasi"></ion-input>
    </ion-item>

  </ion-list>
    <ion-button @click="updateStudent" shape="round">Saqlash</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { call, trash, create } from 'ionicons/icons';
import { supabase } from '@/supabase.js'
import { RouterLink, useRoute, useRouter, RouterView } from 'vue-router'

const router = useRouter() 
const route = useRoute();
const studentId = route.params.id;
const student = ref('')
const newName = ref('')
const newPhone = ref('')
const newDate = ref('')
import {  loadingController } from '@ionic/vue';



async function fetchData(){
  let { data, error } = await supabase
  .from('students')
  .select('*')
      .eq('id', studentId)
      .single();
  
  student.value = data
  const { name, phone, joined} = student.value
  newName.value = name
  newPhone.value = phone
  newDate.value = joined
}

onMounted(fetchData)

async function updateStudent(){
  const loading = await loadingController.create({
    message: 'Saqlanmoqda...',
  });
  loading.present();

const { data, error } = await supabase
  .from('students')
  .update({ name: newName.value, phone: newPhone.value, joined: newDate.value })
  .eq('id', studentId)
  .select()

  if(!data){
     loading.dismiss();
     alert('Xatolik sodir bo\'ldi')
     return
  }

  loading.dismiss();
  window.history.go(-1)

}
</script>