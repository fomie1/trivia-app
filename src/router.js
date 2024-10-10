import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'

const routes = [
  { path: '/trivia-app/', name: 'Home', component: HomePage },
  { path: '/question/category/:id', name: 'Question', component: () => import('@/views/QuestionPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
