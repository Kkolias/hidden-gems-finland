<template>
  <div class="component-LocationPointListView">
    <ul class="scroller-list">
      <li
        class="location-point"
        :class="{ selected: isSelected(locationPoint) }"
        v-for="locationPoint in locationPoints"
        :key="locationPoint.id"
      >
        <router-link :to="`?location=${locationPoint.id}&list=open`" class="overlay-link">
          <div class="top-box">
            <div class="title-wrapper">
              <h3 class="location-name">{{ locationPoint.name }}</h3>
              <div class="upvote-container">
                <span>{{ locationPoint.upvotes }}</span>
                <button
                  class="upvote-btn blank no-shadow"
                  :class="{ upvoted: isUpvoted(locationPoint.id) }"
                  @click="handleUpvoteClick(locationPoint.id)"
                ></button>
              </div>
            </div>
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
import api from '../utils/api'

export default {
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
    isSelected(locationPoint: LocationPoint): boolean {
      const queryParams = this.$route?.query
      return queryParams?.location === String(locationPoint.id)
    },
    isUpvoted(locationPointId: number): boolean {
      return this.upvotedPoints.includes(locationPointId)
    },
    async handleUpvoteClick(locationPointId: number) {
      if (this.isUpvoted(locationPointId)) {
        const updated = await api.removeUpvoteLocationPoint(locationPointId)
        localStorage.setItem(
          'upvotedPoints',
          JSON.stringify(this.upvotedPoints.filter((id) => id !== locationPointId)),
        )
        this.$emit('locationPointUpdated', updated)
      } else {
        const updated = await api.upvoteLocationPoint(locationPointId)
        localStorage.setItem(
          'upvotedPoints',
          JSON.stringify([...this.upvotedPoints, locationPointId]),
        )
        this.$emit('locationPointUpdated', updated)
      }
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

        .title-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;

          .upvote-container {
            display: flex;
            align-items: center;
            gap: 4px;

            span {
              height: 30px;
              line-height: 33px;
            }
          }

          .upvote-btn {
            width: 24px;
            height: 30px;
            cursor: pointer;
            background-image: url('/upvote-icon.svg');
            background-size: 20px 30px;
            background-repeat: no-repeat;
            transition: transform 0.2s ease;

            &.upvoted {
              background-image: url('/upvoted-icon.svg');
            }

            &:hover {
              transform: translateY(-1px);
            }
          }
        }
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
