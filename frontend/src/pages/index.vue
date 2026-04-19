<template>
  <div class="page-home">
    <Navbar />
    <MapView />
  </div>
</template>

<script lang="ts">
import MapView from '../components/MapView.vue'
import Navbar from '../components/Navbar/Navbar.vue'
export default {
  components: {
    MapView,
    Navbar,
  },
}
</script>