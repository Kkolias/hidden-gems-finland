<template>
  <div class="component-LocationPointListView">
    <ul class="scroller-list">
      <li class="location-point" v-for="locationPoint in locationPoints" :key="locationPoint.id">
        <div class="top-box">
          <h3 class="location-name">{{ locationPoint.name }}</h3>
          <p v-if="locationPoint.city" class="location-city">{{ locationPoint.city }}</p>
        </div>
        <p class="location-desc">{{ locationPoint.description }}</p>
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
  methods: {},
}
</script>

<style lang="less" scoped>
.component-LocationPointListView {
  height: calc(100% - 60px);
  background: var(--bg-dark);

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
