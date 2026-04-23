import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../pages/index.vue'
import aboutPage from '../pages/about/index.vue'
import termsPage from '../pages/terms.vue'

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
    },
    {
      path: "/terms",
      name: "terms",
      component: termsPage
    }
  ],
})

export default router
