<template>
<div class="mt-4 pt-3">
  <ion-card router-link="/speaking" class="py-3 rounded-2xl ion-padding-horizontal bg-white shadow-xl">
  <div class="flex items-center justify-start gap-x-3 ">
   <p class="w-12 h-12 flex items-center justify-center rounded-xl text-emerald-400 bg-green-200/50">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 icon icon-tabler icon-tabler-microphone" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" /></svg>
   </p>
   <div>
   <h2 class="text-2xl text-emerald-500">Speaking</h2>
   </div>
   </div>
  </ion-card>

  <ion-card router-link="/listening"  class="rounded-2xl ion-padding-horizontal bg-white shadow-xl py-3">
   <div class="flex items-center justify-start gap-x-3 ">
   <p class="w-12 h-12 flex items-center justify-center rounded-xl text-rose-400 bg-rose-200/50">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 icon icon-tabler icon-tabler-playlist"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M17 17v-13h4" /><path d="M13 5h-10" /><path d="M3 9l10 0" /><path d="M9 13h-6" /></svg>
   </p>
   <div>
   <h2 class="text-2xl text-rose-500">Listening</h2>
   </div>
   </div>
  </ion-card>

    <ion-card router-link="/words/learn"  class="py-3 rounded-2xl ion-padding-horizontal bg-white shadow-xl">
   <div class="flex items-center justify-start gap-x-3 ">
   <p class="w-12 h-12 flex items-center justify-center rounded-xl text-blue-400 bg-blue-200/50">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 icon icon-tabler icon-tabler-clipboard-text" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>
   </p>
   <div>
   <h2 class="text-2xl text-blue-500">Writing</h2>
   </div>
   </div>
  </ion-card>
</div>
</template>
