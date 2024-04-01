import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '@/components/Tabs.vue';

const routes = [
  {
    path:'/generate',
    component: ()=> import('@/views/writing/Generator.vue')
   },
  {
   path:'/login',
   component: ()=> import('@/views/Login.vue')
  },
  {
    path:'/register',
    component: ()=> import('@/views/Register.vue')
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
    path: '/words/learn',
    component: ()=> import('@/views/words_game/Learn.vue')
  },
  {
    path: '/listening:id',
    component: ()=> import('@/views/listening/Test.vue')
  },
  {
    path: '/listening',
    component: ()=> import('@/views/listening/Test1.vue')
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
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
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
      },
      {
        path: 'universities',
        component: () => import('@/views/University.vue')
      },
    ],
  },
];
  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
