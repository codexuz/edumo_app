<template>
<h2 class="text-slate-800 text-3xl">Ilovamiz haqida</h2>
  <swiper class="w-full" :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" :pagination="false" :modules="modules">
    <swiper-slide>
    <ion-card class="rounded-xl" color="primary">
     <ion-card-header>
       <ion-card-title>
       Very Usefule
       </ion-card-title>
     </ion-card-header>
     <ion-card-content class="ion-text-left">
      “Men oʻylaymanki bu ilova barcha Cefr hamda IELTS topshiruvchilar uchun juda foydali deb oʻylayman Chunki men bundan koʻproq foydalanyapman va men uchun bu ilova very useful Rahmat yana bir bor”
      <p class="text-left text-2xl font-bold text-slate-800">🎀CLEVER_GIRL</p>
     </ion-card-content>
    </ion-card>
    </swiper-slide>
    <swiper-slide>
    <ion-card class="rounded-xl" color="primary">
     <ion-card-header>
       <ion-card-title>
       Tavsiya qilaman
       </ion-card-title>
     </ion-card-header>
     <ion-card-content class="ion-text-left">
      “Bu programma manga katta yordam berdi. O‘quvchilarimga ham tavsiya qilayapman. Rahmat”
      <p class="text-left text-2xl font-bold text-slate-800">Behruz Murodjonivich</p>
     </ion-card-content>
    </ion-card>
    </swiper-slide>
    <swiper-slide>
    <ion-card class="rounded-xl" color="primary">
     <ion-card-header>
       <ion-card-title>
       Natija berdi
       </ion-card-title>
     </ion-card-header>
     <ion-card-content class="ion-text-left">
      “Ilovani sotib olib yaxshi qilgan ekanman. Kop kop practise qilardim. Natija berdi. Oshani ichidan tushdi part 2 ga. Natijam yomon bolmadi. Rahmat sizga😊”
      <p class="text-left text-2xl font-bold text-slate-800">Matluba Adasheva</p>
     </ion-card-content>
    </ion-card>
    </swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';


  // import required modules
  import { Autoplay , Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination],
      };
    },
  };
</script>

<style scoped>

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>