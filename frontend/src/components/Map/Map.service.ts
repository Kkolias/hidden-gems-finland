import L from 'leaflet'
import 'leaflet.markercluster'
import type { LocationPoint } from '../../types/location-points'
import { markerIcon } from '../../constants/marker.const'
import { customInfoWindow, customInfoWindowOptions } from './Map.infoWindow'

export class MapService {
  constructor() {}

  map: L.Map | null = null
  markersClusterGroup: L.MarkerClusterGroup | null = null
  selectableMarker: L.Marker | null = null

  initMap() {
    this.map = L.map('map', { zoomAnimation: true }).setView([60.1695, 24.9354], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map as L.Map)

    this.markersClusterGroup = L.markerClusterGroup({
      animate: false,
    })
    this.map.addLayer(this.markersClusterGroup)
  }

  setLocationPoints(locationPoints: LocationPoint[], onEditClick?: (point: LocationPoint) => void): void {
    if (!this.markersClusterGroup) {
      return
    }
    this.markersClusterGroup.clearLayers()
    locationPoints.forEach((point) => {
      const marker = L.marker([point.latitude, point.longitude], {
        icon: markerIcon,
      }).bindPopup(customInfoWindow(point), customInfoWindowOptions)
      
      if (onEditClick) {
        marker.on('popupopen', () => {
          const popup = marker.getPopup()
          if (popup) {
            const content = popup.getElement()
            if (content) {
              const btn = content.querySelector('#edit-location-btn') as HTMLButtonElement
              if (btn) {
                btn.onclick = (e) => {
                  e.stopPropagation()
                  onEditClick(point)
                }
              }
            }
          }
        })
      }
      
      this.markersClusterGroup!.addLayer(marker)
    })
  }

  removeMap() {
    if (this.map) {
      this.map.remove()
      this.map = null
      this.markersClusterGroup = null
      this.selectableMarker = null
    }
  }

  setSelectableMarker(lat: number, lng: number, onDragEnd?: (lat: number, lng: number) => void): void {
    if (!this.map) return
    this.clearSelectableMarker()
    this.selectableMarker = L.marker([lat, lng], {
      icon: markerIcon,
      draggable: true,
    }).addTo(this.map)

    if (onDragEnd) {
      this.selectableMarker.on('dragend', (e) => {
        const marker = e.target as L.Marker
        const position = marker.getLatLng()
        onDragEnd(position.lat, position.lng)
      })
    }
  }

  clearSelectableMarker(): void {
    if (this.selectableMarker && this.map) {
      this.map.removeLayer(this.selectableMarker)
      this.selectableMarker = null
    }
  }
}
