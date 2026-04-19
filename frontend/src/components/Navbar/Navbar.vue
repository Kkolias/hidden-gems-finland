<template>
  <div class="component-Navbar">
    <NavbarDesktop class="nav-desktop" />
    <NavbarMobile class="nav-mobile" />
  </div>
</template>

<script lang="ts">
import NavbarDesktop from './NavbarDesktop.vue'
import NavbarMobile from './NavbarMobile.vue'
export default {
  components: {
    NavbarDesktop,
    NavbarMobile,
  },
}
</script>

<style lang="less" scoped>
.component-Navbar {
  .nav-desktop {
    display: none;
  }
  .nav-mobile {
    display: none;
  }

  @media (min-width: 1090px) {
    .nav-desktop {
      display: block;
    }
  }
  @media (max-width: 1089px) {
    .nav-mobile {
      display: block;
    }
  }
}
</style>
