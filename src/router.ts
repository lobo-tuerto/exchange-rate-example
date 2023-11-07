import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

export const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
  },
  {
    component: NotFoundPage,
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
