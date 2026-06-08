<template>
  <div class="component-LocationPointListViewMobileWrapper" :class="{ open: listOpen }">
    <div class="toggle-list-view-section">
      <button
        class="blank no-shadow toggle-list-view-btn"
        :class="{ open: listOpen }"
        @click="toggleSidebar()"
      >
        <span>{{ title }}</span>
        <span class="arrow"></span>
      </button>
    </div>
    <LocationPointListView v-if="listOpen" class="mobile" :locationPoints="locationPoints" />
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
    title(): string {
      if (this.listOpen) return 'Location list'
      return 'Show location list'
    },
  },
  methods: {
    toggleSidebar(): void {
      if (this.listOpen) {
        this.closeSidebar()
        return
      }
      this.openSidebar()
    },
    closeSidebar(): void {
      const newQuery = {
        ...this.$route?.query,
      }
      delete newQuery.list
      this.$router.push({ query: newQuery })
    },
    openSidebar(): void {
      const newQuery = {
        ...this.$route?.query,
        list: 'open',
      }
      this.$router.push({ query: newQuery })
    },
  },
}
</script>

<style lang="less" scoped>
.component-LocationPointListViewMobileWrapper {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 80vw;
  width: 100%;
  height: 40px;
  overflow: hidden;
  transition: height 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &.open {
    height: 80vh;

    @media (max-width: 400px) {
      max-width: 100vw;
    }
  }

  .toggle-list-view-section {
    background: var(--bg-dark);
    width: 100%;

    height: 40px;
    border-radius: 10px 10px 0 0;
    transform: translateY(1px);

    .toggle-list-view-btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;

      .arrow {
        background-image: url('/arrow-white.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 20px;
        height: 20px;
      }

      &.open .arrow {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
