<template>
  <div class="component-Map">
    <div class="map" id="map"></div>
  </div>
</template>

<script lang="ts">
import type { LocationPoint } from '../../types/location-points'
import { MapService } from './Map.service'
// import router from '../../router'

export default {
  props: {
    locationPoints: {
      type: Array as () => LocationPoint[],
      default: () => [],
    },
  },
  emits: ['edit-location'],
  data: () => ({
    map: null as MapService | null,
    mounted: false,
    setLocationsAfterMount: false,
  }),
  computed: {},
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
        this.setLocationPoints()
      },
      deep: true,
      immediate: true,
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
  },
}
</script>

<style lang="less" scoped>
.component-Map {
  height: 100vh;
  .map {
    height: 100%;
    width: 100%;
  }
}
</style>
