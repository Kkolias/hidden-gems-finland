<template>
  <div class="component-Map">
    <div class="map" id="map"></div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_POINT } from '../../constants/map.const'
import type { LocationPoint } from '../../types/location-points'
import { MapService } from './Map.service'
// import router from '../../router'

export default {
  props: {
    locationPoints: {
      type: Array as () => LocationPoint[],
      default: () => [],
    },
    selectedLocation: {
      type: Object as () => LocationPoint | null,
      default: null,
    },
  },
  emits: ['locationSelected'],
  data: () => ({
    map: null as MapService | null,
    mounted: false,
    setLocationsAfterMount: false,
  }),
  computed: {
    isSelectLocationMode(): boolean {
      const queryParams = this.$route?.query
      return queryParams?.['select-location'] === 'true'
    },
  },
  mounted() {
    this.initMap()
  },
  beforeUnmount() {
    if (this.map) {
      this.map.removeMap()
      this.map = null
    }
  },
  watch: {
    locationPoints: {
      handler() {
        if (!this.mounted) {
          this.setLocationsAfterMount = true
        }
        if (!this.isSelectLocationMode) {
          this.setLocationPoints()
        }
      },
      deep: true,
      immediate: true,
    },
    isSelectLocationMode: {
      handler(isSelecting: boolean) {
        console.log('MUUTTUU', isSelecting)
        if (isSelecting) {
          this.enterSelectLocationMode()
        } else {
          this.exitSelectLocationMode()
        }
      },
    },
  },
  methods: {
    initMap() {
      if (this.mounted) {
        return
      }
      const map = new MapService()
      map.initMap()
      this.map = map as any

      this.setMounted(true)
      if (this.setLocationsAfterMount) {
        this.setLocationPoints()
        this.setLocationsAfterMount = false
      }
    },
    setLocationPoints(): void {
      this.map?.setLocationPoints(this.locationPoints, (point) => {
        this.handleEditLocation(point)
      })
    },
    handleEditLocation(point: LocationPoint) {
      this.$router.push({ query: { location: String(point.id), edit: 'true' } })
    },
    setMounted(val: boolean): void {
      this.mounted = val
    },
    enterSelectLocationMode(): void {
      if (!this.map) return
      const latitude = this.selectedLocation?.latitude || DEFAULT_POINT.LATITUDE
      const longitude = this.selectedLocation?.longitude || DEFAULT_POINT.LONGITUDE
      this.map.clearSelectableMarker()
      this.map.setLocationPoints([])
      this.map.setSelectableMarker(latitude, longitude, (lat, lng) => {
        this.$emit('locationSelected', { latitude: lat, longitude: lng })
      })
    },
    exitSelectLocationMode(): void {
      this.map?.clearSelectableMarker()
      this.setLocationPoints()
    },
  },
}
</script>

<style lang="less" scoped>
.component-Map {
  height: 100vh;

  @media (min-width: 1090px) {
    height: calc(100vh - 60px);
  }

  .map {
    height: 100%;
    width: 100%;
  }
}
</style>
