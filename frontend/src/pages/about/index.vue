<template>
  <div class="page-about">
    <Navbar />
    <AboutPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AboutPage from '../../components/AboutPage.vue';
import Navbar from '../../components/Navbar/Navbar.vue'
import { useSEO } from '../../composables/useSEO'

export default defineComponent({
  components: {
    Navbar,
    AboutPage
  },
  setup() {
    useSEO({
      title: 'About',
      titleTemplate: '%s | Hidden Gems Finland',
      description: 'Learn about Hidden Gems Finland - our mission to help travelers discover Finland\'s best-kept secrets and hidden natural wonders.',
      ogTitle: 'About Hidden Gems Finland',
      ogDescription: 'Discover the story behind Hidden Gems Finland and our mission to showcase the most beautiful secret places in Finland.',
      ogImage: '/og-image.jpg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      keywords: 'about, Finland, hidden gems, mission, travel, nature, secret places',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Hidden Gems Finland',
        description: 'Learn about Hidden Gems Finland and our mission',
        url: 'https://hidden-gems-finland.com/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'Hidden Gems Finland',
          description: 'Platform for discovering hidden gems in Finland',
          url: 'https://hidden-gems-finland.com',
        },
      },
    })

    return {}
  },
})
</script>
