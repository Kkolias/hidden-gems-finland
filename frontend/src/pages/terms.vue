<template>
  <div class="page-terms">
    <Navbar />
    <TermsOfService />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TermsOfService from '../components/TermsOfService.vue'
import Navbar from '../components/Navbar/Navbar.vue'
import { useSEO } from '../composables/useSEO'

export default defineComponent({
  components: {
    TermsOfService,
    Navbar,
  },
  setup() {
    useSEO({
      title: 'Terms of Service',
      titleTemplate: '%s | Hidden Gems Finland',
      description: 'Read the Terms of Service for Hidden Gems Finland. Learn about the rules and guidelines for using our platform to discover hidden places in Finland.',
      ogTitle: 'Terms of Service - Hidden Gems Finland',
      ogDescription: 'Terms and conditions for using Hidden Gems Finland platform.',
      ogImage: '/og-image.jpg',
      ogType: 'website',
      robots: 'noindex, follow',
      twitterCard: 'summary',
      keywords: 'terms, service, legal, conditions, Hidden Gems Finland',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service',
        description: 'Terms of Service for Hidden Gems Finland',
        url: 'https://hidden-gems-finland.com/terms',
      },
    })

    return {}
  },
})
</script>
