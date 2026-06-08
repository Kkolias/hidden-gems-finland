<template>
  <div class="component-LocationPointListView">
    <ul class="scroller-list">
      <li class="location-point" :class="{ 'selected': isSelected(locationPoint) }" v-for="locationPoint in locationPoints" :key="locationPoint.id">
        <router-link :to="`?location=${locationPoint.id}&list=open`" class="overlay-link">
          <div class="top-box">
            <h3 class="location-name">{{ locationPoint.name }}</h3>
            <p v-if="locationPoint.city" class="location-city">{{ locationPoint.city }}</p>
          </div>
          <p class="location-desc">{{ locationPoint.description }}</p>
        </router-link>
      </li>
    </ul>
    <!-- <pre style="color: white">{{ locationPoints }}</pre> -->
  </div>
</template>

<script lang="ts">
import type { LocationPoint } from '../types/location-points'

export default {
  props: {
    locationPoints: {
      type: Array as () => LocationPoint[],
      default: () => [],
    },
  },
  methods: {
    isSelected(locationPoint: LocationPoint): boolean {
      const queryParams = this.$route?.query
      return queryParams?.location === String(locationPoint.id)
    },
  },
}
</script>

<style lang="less" scoped>
.component-LocationPointListView {
  height: calc(100% - 60px);
  background: var(--bg-dark);

  &.mobile {
    height: 100%;
  }

  .scroller-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .location-point {
      padding: 16px 16px;
      border-bottom: 1px solid var(--white-20);
      display: flex;
      flex-direction: column;

      .overlay-link {
        color: inherit;
        text-decoration: none;
        display: block;
      }

      .top-box {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .location-name {
        font-weight: bold;
        font-size: 2rem;
        text-align: left;
      }

      .location-city {
        font-size: 1.2rem;
        color: var(--white-50);
        text-align: left;
      }

      .location-desc {
        margin-top: 8px;
        font-size: 1.6rem;
        color: var(--white-80);
        text-align: left;
      }

      &:first-child {
        padding-top: 16px;
      }

      &:last-child {
        border-bottom: none;
        padding-bottom: 80px;
      }

      &.selected {
        background: var(--white-10);
      }

      &:hover {
        background: var(--white-20);
      }
    }
  }

  .scroller-list {
    @supports (scrollbar-width: auto) {
      scrollbar-width: thin;
      scrollbar-color: var(--white-20) transparent;
    }
  }
}
</style>
