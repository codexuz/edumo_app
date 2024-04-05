import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '@/components/Tabs.vue';
import { supabase } from '@/supabase';
import { networkService } from '@/lib/networkService.js';
const isOnline = await networkService.getCurrentStatus();


const routes = [
  {
    path:'/generate',
    component: ()=> import('@/views/writing/Generator.vue')
   },
  {
   path:'/login',
   component: ()=> import('@/views/Login.vue'),

  },
  {
    path:'/register',
    component: ()=> import('@/views/Register.vue'),
    meta: { requiresAuth: false } 

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
    path: '/forgot-password',
    component: ()=> import('@/views/ForgotPassword.vue'),
    meta: { requiresAuth: false }
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
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'courses',
        component: () => import('@/views/Courses.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'result',
        component: () => import('@/views/Result.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'universities',
        component: () => import('@/views/University.vue'),
        meta: { requiresAuth: false }
      },
    ],
  },
];
  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach( async(to, from, next) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const isSignedIn = await supabase.auth.getSession() 
 // console.log(isSignedIn.data.session.user)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    next('/login'); // Redirect to login if authentication is required and user is not logged in
  } else {
    next(); // Proceed to the requested route
  }
});


export default router
