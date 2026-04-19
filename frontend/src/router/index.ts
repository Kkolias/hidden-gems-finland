import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../pages/index.vue'
import aboutPage from '../pages/about/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: "/about",
      name: "about",
      component: aboutPage
    }
  ],
})

export default router
