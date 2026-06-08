<template>
  <div class="component-LocationPointListViewWrapper">
    <LocationPointListViewDesktopWrapper
      class="list-wrapper desktop"
      :locationPoints="locationPoints"
      :upvotedPoints="upvotedPoints"
      @locationPointUpdated="locationPointUpdated"
    />
    <LocationPointListViewMobileWrapper
      class="list-wrapper mobile"
      :locationPoints="locationPoints"
      :upvotedPoints="upvotedPoints"
      @locationPointUpdated="locationPointUpdated"
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
    upvotedPoints: {
      type: Array as () => number[],
      default: () => [],
    },
  },
  methods: {
    locationPointUpdated(location: LocationPoint): void {
      this.$emit('locationPointUpdated', location)
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
