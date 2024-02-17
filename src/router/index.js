import { createRouter, createWebHistory } from '@ionic/vue-router';
import Apps from '../views/blog/Apps.vue'
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
   component: ()=> import('@/views/blog/Apps.vue')
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
     path: '/update',
     component: ()=> import('@/views/UpdateProfiile.vue')
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
