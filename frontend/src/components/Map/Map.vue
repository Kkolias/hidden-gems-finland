<template>
  <div class="component-Map">
    <div class="map" id="map"></div>
  </div>
</template>

<script lang="ts">
// import { DEFAULT_POINT } from '../../constants/map.const'
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
    routeMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['locationSelected', 'routePointsSelected'],
  data: () => ({
    map: null as MapService | null,
    mounted: false,
    setLocationsAfterMount: false,
    routeStep: 'idle' as 'idle' | 'start' | 'end' | 'complete',
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
        if (!this.isSelectLocationMode && !this.routeMode) {
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
    routeMode: {
      handler(isActive: boolean) {
        if (isActive) {
          this.enterRouteMode()
        } else {
          this.exitRouteMode()
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
      const defLatitude = this.selectedLocation?.latitude || null
      const defLongitude = this.selectedLocation?.longitude || null

      let latitude: number
      let longitude: number
      if (!defLatitude || !defLongitude) {
        const mapCenter = this.map.getMapCenter()
        if (!mapCenter) return
        latitude = mapCenter.lat
        longitude = mapCenter.lng
      } else {
        latitude = defLatitude
        longitude = defLongitude
      }

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

    enterRouteMode(): void {
      if (!this.map) return
      this.routeStep = 'start'
      this.map.clearLocationPoints()
      this.map.addMapClickListener((lat: number, lng: number) => {
        this.handleRouteMapClick(lat, lng)
      })
    },

    exitRouteMode(): void {
      this.routeStep = 'idle'
      this.map?.removeMapClickListener()
      this.map?.clearRouteMarkers()
      this.setLocationPoints()
    },

    async handleRouteMapClick(lat: number, lng: number): Promise<void> {
      if (this.routeStep === 'start') {
        this.map?.setRouteStartMarker(lat, lng)
        this.routeStep = 'end'
      } else if (this.routeStep === 'end') {
        this.map?.setRouteEndMarker(lat, lng)
        this.routeStep = 'complete'
        this.map?.removeMapClickListener()

        const startPos = this.map?.getStartPosition()
        const endPos = this.map?.getEndPosition()
        if (startPos && endPos) {
          this.map?.fetchRoute(startPos.lat, startPos.lng, endPos.lat, endPos.lng)
          this.$emit('routePointsSelected', {
            start: { latitude: startPos.lat, longitude: startPos.lng },
            end: { latitude: endPos.lat, longitude: endPos.lng },
          })
        }
      }
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
