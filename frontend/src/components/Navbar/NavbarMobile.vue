<template>
  <div class="component-Navbar">
    <nav class="navbar" :class="{ shadow: !isOpen }">
      <div class="navbar-left">
        <span class="name-short">HGF</span>
        <span class="name-long">Hidden Gems Finland</span>
      </div>

      <button class="menu-button no-shadow blank" @click="toggleMenu">
        <span v-if="!isOpen" class="menu-icon"></span>
        <span v-else class="close-icon"></span>
      </button>
    </nav>

    <transition name="slide">
      <div v-if="isOpen" class="menu">
        <ul class="menu-list">
          <li class="menu-item">
            <a href="/about" :class="{ active: isActive('/about') }">About</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    isActive(path: string) {
      return this.$route.path === path
    },
  },
}
</script>

<style lang="less" scoped>
@nav-height: 60px;
@bg: var(--bg-dark);
@text: var(--white);

.navbar {
  height: @nav-height;
  background: @bg;
  color: @text;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
}

.navbar-left {
  font-weight: bold;
  font-size: 18px;

  .name-long {
    display: block;
    font-weight: 600;
  }
  .name-short {
    display: none;
    font-weight: 600;
  }

  @media (max-width: 320px) {
    .name-long {
      display: none;
    }
    .name-short {
      display: block;
    }
  }
}

.menu-button {
  background: none;
  border: none;
  color: @text;
  font-size: 24px;
  cursor: pointer;

  .menu-icon {
    width: 28px;
    height: 24px;
    background-image: url('/menu-icon-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: block;
  }

  .close-icon {
    width: 34px;
    height: 34px;
    background-image: url('/close-icon-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: block;
  }
}

.menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: @bg;
  color: @text;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: @nav-height;

  z-index: 999999;
}

.menu-list {
  list-style: none;
  padding: 0;
  text-align: center;
}

.menu-item {
  margin: 20px 0;

  a {
    color: @text;
    font-size: 24px;
    text-decoration: none;

    &.active {
      text-decoration: underline;
    }
  }
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
