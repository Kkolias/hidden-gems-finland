<template>
  <div class="page-about">
    <Navbar />
    <AboutPage />
  </div>
</template>

<script lang="ts">
import AboutPage from '../../components/AboutPage.vue';
import Navbar from '../../components/Navbar/Navbar.vue'
export default {
  components: {
    Navbar,
    AboutPage
  },
}
</script>
