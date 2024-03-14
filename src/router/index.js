import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [

  {
        path: '/',
        component: () => import('@/views/Home.vue')
  },
  {
        path: '/course/:id',
        component: () => import('@/views/Course.vue')
  },
  {
        path: '/students/:id',
        component: () => import('@/views/Students.vue')
  },
  {
        path: '/students/edit/:id',
        component: () => import('@/views/EditStudent.vue')
  },
  {
        path: '/add',
        component: () => import('@/views/AddIt.vue')
  },
  {
        path: '/sample',
        component: () => import('@/views/sampleAnswer.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
