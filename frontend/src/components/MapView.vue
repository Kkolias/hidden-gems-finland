<template>
  <div class="component-MapView">
    <Map
      :locationPoints="displayedLocationPoints"
      :selectedLocation="selectedLocation"
      :routeMode="isRouteMode"
      @locationSelected="setSelectedLocationPosition"
      @routePointsSelected="handleRoutePoints"
      @routeError="handleRouteError"
    />
    <div class="map-overlay-items">
      <transition name="slide">
        <div class="loading-markers-container shadow" v-if="loading">
          <span>Loading locations...</span>
        </div>
      </transition>
      <button class="add-location blank" @click="openNewEdit()"></button>
      <button
        class="route-button blank"
        :class="{ active: isRouteMode }"
        @click="toggleRouteMode()"
      ></button>
      <transition name="slide">
        <div class="route-error-toast shadow" v-if="routeError">
          <span>{{ routeError }}</span>
        </div>
      </transition>
      <transition name="slide">
        <div class="radius-slider-container shadow" v-if="isRouteMode">
          <span>Radius: {{ sliderRadius }}km</span>
          <input
            type="range"
            min="1"
            max="100"
            :value="sliderRadius"
            @input="sliderRadius = Number(($event.target as HTMLInputElement).value)"
            @change="commitRadius"
          />
        </div>
      </transition>
      <div class="edit-view-wrapper">
        <transition name="show">
          <LocationPointEditView
            v-if="isEditOpen"
            :selectedLocation="selectedLocation"
            :selectedLocationPosition="selectedLocationPosition"
            @locationCreated="handleLocationCreated"
            @locationUpdated="handleLocationUpdated"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_POINT } from '../constants/map.const'
import type { LocationPoint } from '../types/location-points'
import { pointToPolylineDistance } from '../utils/geo'
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
    loading: true,
    isRouteMode: false,
    sliderRadius: 10,
    radius: 10,
    routeError: null as string | null,
    routeStart: null as { latitude: number; longitude: number } | null,
    routeEnd: null as { latitude: number; longitude: number } | null,
    routeGeometry: null as [number, number][] | null,

    selectedLocationPosition: {
      latitude: DEFAULT_POINT.LATITUDE,
      longitude: DEFAULT_POINT.LONGITUDE,
    },
  }),
  computed: {
    displayedLocationPoints(): LocationPoint[] {
      if (!this.isRouteMode) return this.locationPoints
      if (!this.routeGeometry) return []
      return this.locationPoints.filter((p) => {
        const dist = pointToPolylineDistance(p.latitude, p.longitude, this.routeGeometry!)
        // console.log(dist)
        return dist <= this.radius
      })
    },

    queryParams() {
      return this.$route?.query
    },
    selectedLocationId(): number | null {
      const locationRaw = this.queryParams?.location
      if (!locationRaw) return null

      const p = Number(locationRaw)
      if (isNaN(p)) return null
      return p
    },
    selectedLocation(): LocationPoint | null {
      return this.locationPoints?.find((i) => i?.id === this.selectedLocationId) || null
    },
    isEditOpen(): boolean {
      return this.queryParams?.edit === 'true'
    },
  },
  mounted() {
    this.fetchLocationPoints()
  },
  watch: {
    selectedLocation() {
      this.selectedLocationPosition = {
        latitude: this.selectedLocation?.latitude || DEFAULT_POINT.LATITUDE,
        longitude: this.selectedLocation?.longitude || DEFAULT_POINT.LONGITUDE,
      }
    },
  },
  methods: {
    async fetchLocationPoints(): Promise<void> {
      this.setLoading(true)
      const r = await api.getLocations()
      this.setLocationPoints(r)
      this.setLoading(false)
    },
    openNewEdit(): void {
      this.$router.push({ query: { edit: 'true' } })
    },
    handleLocationCreated(location: LocationPoint): void {
      this.locationPoints = [...this.locationPoints, location]
    },
    handleLocationUpdated(location: LocationPoint): void {
      this.locationPoints = this.locationPoints.map((l) => {
        if (l?.id === location?.id) {
          return location
        }
        return l
      })
    },

    toggleRouteMode(): void {
      this.isRouteMode = !this.isRouteMode
      if (!this.isRouteMode) {
        this.sliderRadius = 10
        this.radius = 10
        this.routeStart = null
        this.routeEnd = null
        this.routeGeometry = null
        const query = { ...this.$route.query }
        delete query.radius
        this.$router.push({ query })
      }
    },

    commitRadius(): void {
      this.radius = this.sliderRadius
      this.$router.push({ query: { ...this.$route.query, radius: String(this.radius) } })
    },

    handleRouteError(message: string): void {
      this.routeError = message
      setTimeout(() => {
        this.routeError = null
      }, 5000)
    },

    handleRoutePoints(points: {
      start: { latitude: number; longitude: number }
      end: { latitude: number; longitude: number }
      geometry?: [number, number][] | null
    }): void {
      this.routeStart = points.start
      this.routeEnd = points.end
      this.routeGeometry = points.geometry || null
    },

    setSelectedLocationPosition(val: { latitude: number; longitude: number }): void {
      this.selectedLocationPosition = val
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

    .loading-markers-container {
      position: fixed;
      bottom: 8vh;
      bottom: 8dvh;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-dark);
      padding: 8px 16px;
      border-radius: 10px;
    }
    .slide-enter-active,
    .slide-leave-active {
      transition: all 0.4s ease-out;
    }
    .slide-enter-from,
    .slide-leave-to {
      transform: translateY(300%) translateX(-50%);
    }
    .slide-enter-to,
    .slide-leave-from {
      transform: translateY(0) translateX(-50%);
    }

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
      position: fixed;
      bottom: 4vh;
      bottom: 4dvh;
      right: 20px;

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

    .route-button {
      position: fixed;
      bottom: 10vh;
      bottom: 10dvh;
      right: 20px;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--bg-dark);
      box-shadow:
        0 2px 3px 1px rgba(0, 0, 0, 0.5),
        0 0 10px 0 rgba(0, 0, 0, 0.25);
      transition: all 0.2s ease;
      border: 2px solid var(--purple);

      &:after {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background-image: url('/arrow-white.svg');
        background-size: 20px;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &.active {
        background-color: var(--purple);
        border-color: var(--purple);
      }

      &:hover {
        transform: translateY(-2px);
      }
    }

    .route-error-toast {
      position: fixed;
      bottom: 20vh;
      bottom: 20dvh;
      left: 50%;
      transform: translateX(-50%);
      background: #c0392b;
      padding: 10px 20px;
      border-radius: 10px;
      max-width: 80vw;

      span {
        font-size: 14px;
        color: var(--white);
        text-align: center;
      }
    }

    .radius-slider-container {
      position: fixed;
      bottom: 12vh;
      bottom: 12dvh;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-dark);
      padding: 10px 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 12px;

      span {
        font-size: 14px;
        white-space: nowrap;
        color: var(--white);
      }

      input[type='range'] {
        width: 140px;
        accent-color: var(--purple);
        cursor: pointer;
      }
    }
  }
}
</style>
