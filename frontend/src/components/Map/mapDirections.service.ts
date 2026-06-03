import L from 'leaflet'
import { startMarkerIcon, endMarkerIcon } from '../../constants/marker.const'
import type { DirectionRouteResult } from '../../types/direction-route-result'
import api from '../../utils/api'

// interface RouteResponse {
//   features: {
//     properties: {
//       segments: {
//         distance: number
//         duration: number
//       }[]
//       summary: { distance: number; duration: number }
//     }
//     geometry: {
//       type: 'LineString'
//       coordinates: [number, number][]
//     }
//   }[]
// }

export class MapDirections {
  map: L.Map
  startMarker: L.Marker | null = null
  endMarker: L.Marker | null = null
  routeLine: L.Polyline | null = null
  routeDistance: number | null = null
  routeDuration: number | null = null

  constructor(map: L.Map) {
    this.map = map
  }

  setStartMarker(lat: number, lng: number, onDragEnd?: (lat: number, lng: number) => void): void {
    this.clearStartMarker()
    this.startMarker = L.marker([lat, lng], {
      icon: startMarkerIcon,
      draggable: true,
    }).addTo(this.map)
    this.startMarker.bindPopup('<b>Start point</b>', { autoPan: false })

    if (onDragEnd) {
      this.startMarker.on('dragend', (e) => {
        const marker = e.target as L.Marker
        const pos = marker.getLatLng()
        onDragEnd(pos.lat, pos.lng)
      })
    }
  }

  setEndMarker(lat: number, lng: number, onDragEnd?: (lat: number, lng: number) => void): void {
    this.clearEndMarker()
    this.endMarker = L.marker([lat, lng], {
      icon: endMarkerIcon,
      draggable: true,
    }).addTo(this.map)
    this.endMarker.bindPopup('<b>End point</b>', { autoPan: false })

    if (onDragEnd) {
      this.endMarker.on('dragend', (e) => {
        const marker = e.target as L.Marker
        const pos = marker.getLatLng()
        onDragEnd(pos.lat, pos.lng)
      })
    }
  }

  clearStartMarker(): void {
    if (this.startMarker) {
      this.map.removeLayer(this.startMarker)
      this.startMarker = null
    }
  }

  clearEndMarker(): void {
    if (this.endMarker) {
      this.map.removeLayer(this.endMarker)
      this.endMarker = null
    }
  }

  clearRoute(): void {
    this.clearStartMarker()
    this.clearEndMarker()
    this.clearRouteLine()
    this.routeDistance = null
    this.routeDuration = null
  }

  clearRouteLine(): void {
    if (this.routeLine) {
      this.map.removeLayer(this.routeLine)
      this.routeLine = null
    }
  }

  drawRouteLine(startLat: number, startLng: number, endLat: number, endLng: number): void {
    this.clearRouteLine()
    this.routeLine = L.polyline(
      [
        [startLat, startLng],
        [endLat, endLng],
      ],
      { color: '#7C3AED', weight: 4, opacity: 0.8 },
    ).addTo(this.map)
  }

  async fetchRoute(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ): Promise<void> {
    this.clearRouteLine()

    const data: DirectionRouteResult = await api.getRouteBetweenPoints({
      startLat,
      startLng,
      endLat,
      endLng,
    })

    const geometry = data?.geometry
    if (!data || !geometry) {
      throw new Error('No route found in directions response')
    }

    const coords = geometry.coordinates.map((c) => [c[1], c[0]] as [number, number])

    this.routeDistance = data.distance
    this.routeDuration = data.duration
    this.routeLine = L.polyline(coords, {
      color: '#7C3AED',
      weight: 5,
      opacity: 0.8,
    }).addTo(this.map)
    this.map.fitBounds(this.routeLine.getBounds(), { padding: [40, 40], animate: false })
  }

  getStartPosition(): { lat: number; lng: number } | null {
    if (!this.startMarker) return null
    const pos = this.startMarker.getLatLng()
    return { lat: pos.lat, lng: pos.lng }
  }

  getEndPosition(): { lat: number; lng: number } | null {
    if (!this.endMarker) return null
    const pos = this.endMarker.getLatLng()
    return { lat: pos.lat, lng: pos.lng }
  }
}
