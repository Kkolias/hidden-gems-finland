<template>
  <div class="page-home no-overflow">
    <Navbar />
    <MapView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapView from '../components/MapView.vue'
import Navbar from '../components/Navbar/Navbar.vue'
import { useSEO } from '../composables/useSEO'

export default defineComponent({
  components: {
    MapView,
    Navbar,
  },
  setup() {
    useSEO({
      title: 'Home',
      titleTemplate: '%s | Hidden Gems Finland',
      description: 'Discover hidden gems and secret places in Finland. Explore beautiful locations, natural wonders, and off-the-beaten-path destinations across Finland.',
      ogTitle: 'Hidden Gems Finland - Discover Secret Places',
      ogDescription: 'Explore Finland\'s best-kept secrets. Find hidden beaches, scenic viewpoints, and tranquil spots away from tourist crowds.',
      ogImage: '/og-image.jpg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      keywords: 'Finland, hidden gems, secret places, travel, nature, tourism, map, explore',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Hidden Gems Finland',
        description: 'Discover hidden gems and secret places in Finland',
        url: 'https://hidden-gems-finland.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://hidden-gems-finland.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    })

    return {}
  },
})
</script>