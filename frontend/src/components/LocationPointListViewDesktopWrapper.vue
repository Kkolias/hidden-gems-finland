<template>
  <div class="component-LocationPointListViewDesktopWrapper" :class="{ open: listOpen }">
    <div class="list-slide-wrapper">
      <Transition name="slide">
        <LocationPointListView v-if="listOpen" :locationPoints="locationPoints" />
      </Transition>
    </div>
    <div class="toggle-sidebar-section">
      <button
        class="blank circle toggle-sidebar-btn"
        :class="{ open: listOpen }"
        @click="toggleSidebar()"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import type { LocationPoint } from '../types/location-points'
import LocationPointListView from './LocationPointListView.vue'

export default {
  components: {
    LocationPointListView,
  },
  props: {
    locationPoints: {
      type: Array as () => LocationPoint[],
      default: () => [],
    },
  },
  computed: {
    listOpen(): boolean {
      return this.$route?.query?.list === 'open'
    },
  },
  methods: {
    toggleSidebar(): void {
      const newQuery = this.listOpen ? {} : { list: 'open' }
      this.$router.push({ query: newQuery })
    },
  },
}
</script>

<style lang="less" scoped>
.component-LocationPointListViewDesktopWrapper {
  position: fixed;
  top: 60px;
  left: 0;
  height: 100vh;
  max-width: 400px;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &.open {
    width: 400px;
  }

  .list-slide-wrapper {
    overflow: hidden;
    height: 100%;
  }

  :deep(.slide-enter-active),
  :deep(.slide-leave-active) {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :deep(.slide-enter-from),
  :deep(.slide-leave-to) {
    transform: translateX(-100%);
  }

  &.open .toggle-sidebar-section {
    left: calc(100% + 8px);
  }

  .toggle-sidebar-section {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    .toggle-sidebar-btn {
      width: 40px;
      height: 40px;
      background: var(--bg-dark);
      border-radius: 50%;
      border: none;
      cursor: pointer;

      &:before {
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        background-image: url('/close-sidebar.svg');
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: center;
      }

      &.open:before {
        background-image: url('/open-sidebar.svg');
      }
    }
  }
}
</style>
