import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '@/components/Tabs.vue';

const routes = [
  {
   path:'/login',
   component: ()=> import('@/views/Login.vue')
  },
  {
    path:'/register',
    component: ()=> import('@/views/Register.vue')
  },
  {
   path:'/part-1/apps',
   component: ()=> import('@/views/sample/Apps.vue')
  },
  {
   path:'/part-1/ads',
   component: ()=> import('@/views/sample/Ads.vue')
  },
  {
   path:'/part-1/art',
   component: ()=> import('@/views/sample/Art.vue')
  },
  {
   path:'/part-1/bags',
   component: ()=> import('@/views/sample/Bags.vue')
  },
  {
   path:'/part-1/cycle',
   component: ()=> import('@/views/sample/Bicycle.vue')
  },
  {
   path:'/part-1/books',
   component: ()=> import('@/views/sample/Books.vue')
  },
  {
   path:'/part-1/buildings',
   component: ()=> import('@/views/sample/Buildings.vue')
  },
  {
   path:'/part-1/cakes',
   component: ()=> import('@/views/sample/Cakes.vue')
  },
  {
   path:'/part-1/cinema',
   component: ()=> import('@/views/sample/Cinema.vue')
  },
  {
    path: '/messages/:id',
    component: ()=> import('@/views/Messages.vue')
  },
  {
    path: '/mock-tests/:id',
    component: ()=> import('@/views/Mock.vue')
  },
  {
    path: '/speaking',
    component: ()=> import('@/views/Speaking.vue')
  },
  {
    path: '/listening',
    component: ()=> import('@/views/Listening.vue')
  },
  {
    path: '/writing',
    component: ()=> import('@/views/Writing.vue')
  },
  {
    path: '/settings',
    component: ()=> import('@/views/Settings.vue')
  },
  {
    path: '/speak',
    component: ()=> import('@/views/speaking/Test1.vue')
  },
  {
     path: '/update',
     component: ()=> import('@/views/UpdateProfiile.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat.vue'),
  },
  {
    path: '',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: 'courses',
        component: () => import('@/views/Courses.vue'),
      },
      {
        path: 'result',
        component: () => import('@/views/Result.vue'),
      }
    ],
  },
];
  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
