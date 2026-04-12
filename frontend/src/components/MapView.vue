<template>
  <div class="component-MapView">
    <Map :locationPoints="locationPoints" />
    <div class="map-overlay-items">
      <button class="add-location blank"></button>
      <div class="edit-view-wrapper">
        <transition name="show">
          <LocationPointEditView v-if="isEditOpen" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { LocationPoint } from '../types/location-points'
import api from '../utils/api'
import LocationPointEditView from './LocationPointEditView.vue'
import Map from './Map/Map.vue'

export default {
  components: {
    Map,
    LocationPointEditView,
  },
  data: () => ({
    locationPoints: [] as LocationPoint[],
    loading: false,
  }),
  computed: {
    queryParams() {
      return this.$route?.query
    },
    selectedLocation(): number | null {
      const locationRaw = this.queryParams?.location
      if (!locationRaw) return null

      const p = Number(locationRaw)
      if (isNaN(p)) return null
      return p
    },
    isEditOpen(): boolean {
      return this.queryParams?.edit === 'true'
    },
  },
  mounted() {
    this.fetchLocationPoints()
  },
  methods: {
    async fetchLocationPoints(): Promise<void> {
      this.setLoading(true)
      const r = await api.getLocations()
      this.setLocationPoints(r)
      this.setLoading(false)
    },

    setLoading(loading: boolean): void {
      this.loading = loading
    },
    setLocationPoints(locationPoints: LocationPoint[]) {
      this.locationPoints = locationPoints
    },
  },
}
</script>

<style lang="less" scoped>
.component-MapView {
  .map-overlay-items {
    position: relative;
    z-index: 10000;
    
    .edit-view-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    
    .show-enter-active,
    .show-leave-active {
      transition: all 0.3s ease-out;
    }
    .show-enter-from,
    .show-leave-to {
      transform: translateY(100%) translateX(-50%);
    }
    .show-enter-to,
    .show-leave-from {
      transform: translateY(0) translateX(-50%);
    }

    .edit-view-wrapper > * {
      pointer-events: auto;
    }

    .add-location {
      position: absolute;
      bottom: 60px;
      right: 60px;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--purple);
      box-shadow:
        0 2px 3px 1px rgba(0, 0, 0, 0.5),
        0 0 10px 0 rgba(0, 0, 0, 0.25);
      // transform: translate(50%, 50%);
      transition: all 0.2s ease;

      &:after {
        content: '';
        display: block;
        width: 22px;
        height: 22px;
        background-image: url('/add-icon.svg');
        background-size: 22px;
        background-position: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover {
        transform: translateY(-2px);
      }
    }
  }
}
</style>
