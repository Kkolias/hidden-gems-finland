<template>
  <div class="component-NavbarDesktop shadow">
    <nav>
      <div class="left">
        <a href="/">Hidden Gems Finland</a>
      </div>
      <div class="right">
        <a href="/about">About</a>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="less" scoped>
.component-NavbarDesktop {
  width: 100%;
  height: 60px;
  background: var(--bg-dark);

  nav {
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    a {
      text-decoration: none;
      font-weight: 600;
    }
  }
}
</style>
