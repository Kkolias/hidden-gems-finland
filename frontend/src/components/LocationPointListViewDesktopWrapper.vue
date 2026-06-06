<template>
  <div class="component-LocationPointListViewDesktopWrapper" :class="{ open: listOpen }">
    <LocationPointListView v-if="listOpen" :locationPoints="locationPoints" />
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

  &.open {
    width: 400px;
  }

  .toggle-sidebar-section {
    position: absolute;
    top: 8px;
    right: -8px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);

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
