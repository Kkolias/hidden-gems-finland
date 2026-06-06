<template>
  <div class="component-LocationPointListViewWrapper">
    <LocationPointListViewDesktopWrapper
      class="list-wrapper desktop"
      :locationPoints="locationPoints"
    />
    <LocationPointListViewMobileWrapper
      class="list-wrapper mobile"
      :locationPoints="locationPoints"
    />
  </div>
</template>

<script lang="ts">
import type { LocationPoint } from '../types/location-points'
import LocationPointListViewDesktopWrapper from './LocationPointListViewDesktopWrapper.vue'
import LocationPointListViewMobileWrapper from './LocationPointListViewMobileWrapper.vue'

export default {
  components: {
    LocationPointListViewDesktopWrapper,
    LocationPointListViewMobileWrapper,
  },
  props: {
    locationPoints: {
      type: Array as () => LocationPoint[],
      default: () => [],
    },
  },
}
</script>

<style lang="less" scoped>
.component-LocationPointListViewWrapper {
  @media only screen and (max-width: 1089px) {
    .list-wrapper {
      &.desktop {
        display: none;
      }
    }
    .list-wrapper {
      &.mobile {
        display: block;
      }
    }
  }
  @media only screen and (min-width: 1090px) {
    .list-wrapper {
      &.desktop {
        display: block;
      }
    }
    .list-wrapper {
      &.mobile {
        display: none;
      }
    }
  }
}
</style>
