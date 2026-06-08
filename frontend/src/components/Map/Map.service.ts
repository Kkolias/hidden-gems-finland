import L from 'leaflet'
import 'leaflet.markercluster'
import type { LocationPoint } from '../../types/location-points'
import { markerIcon } from '../../constants/marker.const'
import { customInfoWindow, customInfoWindowOptions } from './Map.infoWindow'
import { MapDirections } from './mapDirections.service'

export class MapService {
  constructor() {}

  map: L.Map | null = null
  markersClusterGroup: L.MarkerClusterGroup | null = null
  selectableMarker: L.Marker | null = null
  directionsService: MapDirections | null = null
  routeClickHandler: ((e: L.LeafletMouseEvent) => void) | null = null
  markersMap: Map<number, L.Marker> = new Map()
  viewChangeCallback: ((center: { lat: number; lng: number }) => void) | null = null

  initMap() {
    this.map = L.map('map', { zoomAnimation: true, zoomControl: false }).setView(
      [60.1695, 24.9354],
      13,
    )
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map as L.Map)
    L.control.zoom({ position: 'bottomleft' }).addTo(this.map)

    this.markersClusterGroup = L.markerClusterGroup({
      animate: false,
    })
    this.map.addLayer(this.markersClusterGroup)

    this.directionsService = new MapDirections(this.map)

    this.map.on('moveend', () => {
      if (this.viewChangeCallback && this.map) {
        const center = this.map.getCenter()
        this.viewChangeCallback({ lat: center.lat, lng: center.lng })
      }
    })
  }

  setLocationPoints({
    locationPoints,
    upvotedPoints,
    onMarkerClick,
    onEditClick,
    onPopupClose,
    onUpvoteClick,
  }: {
    locationPoints: LocationPoint[]
    upvotedPoints: number[]
    onMarkerClick?: (point: LocationPoint) => void
    onEditClick?: (point: LocationPoint) => void
    onPopupClose?: () => void
    onUpvoteClick?: (point: LocationPoint) => void
  }): void {
    if (!this.markersClusterGroup) {
      return
    }
    this.markersMap.forEach((marker) => {
      marker.off()
    })
    this.markersClusterGroup.clearLayers()
    this.markersMap.clear()
    locationPoints.forEach((point) => {
      const marker = L.marker([point.latitude, point.longitude], {
        icon: markerIcon,
      }).bindPopup(customInfoWindow(point, upvotedPoints), customInfoWindowOptions)

      this.markersMap.set(point.id, marker)

      if (onMarkerClick) {
        marker.on('click', () => {
          onMarkerClick(point)
        })
      }

      if (onPopupClose) {
        marker.on('popupclose', () => {
          onPopupClose()
        })
      }

      if (onEditClick && onUpvoteClick) {
        marker.on('popupopen', () => {
          const popup = marker.getPopup()
          if (popup) {
            const content = popup.getElement()
            if (content) {
              const editBtn = content.querySelector('#edit-location-btn') as HTMLButtonElement
              if (editBtn) {
                editBtn.onclick = (e) => {
                  e.stopPropagation()
                  onEditClick(point)
                }
              }
              const upvoteBtn = content.querySelector('#upvote-btn') as HTMLButtonElement
              if (upvoteBtn) {
                upvoteBtn.onclick = (e) => {
                  e.stopPropagation()
                  onUpvoteClick(point)
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
      this.removeMapClickListener()
      this.directionsService?.clearRoute()
      this.directionsService = null
      this.map.remove()
      this.map = null
      this.markersClusterGroup = null
      this.selectableMarker = null
    }
  }

  setSelectableMarker(
    lat: number,
    lng: number,
    onDragEnd?: (lat: number, lng: number) => void,
  ): void {
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
    if (this.selectableMarker) {
      this.selectableMarker.off()
      if (this.map) {
        this.map.removeLayer(this.selectableMarker)
      }
      this.selectableMarker = null
    }
  }

  getMapCenter(): { lat: number; lng: number } | null {
    if (!this.map) return null
    const center = this.map.getCenter()
    return { lat: center.lat, lng: center.lng }
  }

  openPopupForLocation(locationId: number, locationPoints: LocationPoint[]): void {
    const marker = this.markersMap.get(locationId)
    const point = locationPoints.find((p) => p.id === locationId)
    if (marker && this.map) {
      this.map.closePopup()
      this.map.flyTo([point!.latitude, point!.longitude], 13, { animate: true, duration: 1 })
      setTimeout(() => {
        marker.openPopup()
      }, 1500)
    }
  }

  clearLocationPoints(): void {
    this.markersMap.forEach((marker) => {
      marker.off()
    })
    this.markersMap.clear()
    this.markersClusterGroup?.clearLayers()
  }

  setRouteStartMarker(
    lat: number,
    lng: number,
    onDragEnd?: (lat: number, lng: number) => void,
  ): void {
    this.directionsService?.setStartMarker(lat, lng, onDragEnd)
  }

  setRouteEndMarker(
    lat: number,
    lng: number,
    onDragEnd?: (lat: number, lng: number) => void,
  ): void {
    this.directionsService?.setEndMarker(lat, lng, onDragEnd)
  }

  clearRouteMarkers(): void {
    this.directionsService?.clearRoute()
  }

  drawRouteLine(startLat: number, startLng: number, endLat: number, endLng: number): void {
    this.directionsService?.drawRouteLine(startLat, startLng, endLat, endLng)
  }

  addMapClickListener(handler: (lat: number, lng: number) => void): void {
    if (!this.map) return
    this.removeMapClickListener()
    this.routeClickHandler = (e: L.LeafletMouseEvent) => {
      handler(e.latlng.lat, e.latlng.lng)
    }
    this.map.on('click', this.routeClickHandler)
  }

  setViewChangeCallback(cb: (center: { lat: number; lng: number }) => void): void {
    this.viewChangeCallback = cb
  }

  removeMapClickListener(): void {
    if (this.map && this.routeClickHandler) {
      this.map.off('click', this.routeClickHandler)
      this.routeClickHandler = null
    }
  }

  async fetchRoute(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ): Promise<void> {
    return this.directionsService?.fetchRoute(startLat, startLng, endLat, endLng)
  }

  getRouteCoordinates(): [number, number][] | null {
    return this.directionsService?.routeCoordinates || null
  }

  getStartPosition(): { lat: number; lng: number } | null {
    return this.directionsService?.getStartPosition() || null
  }

  getEndPosition(): { lat: number; lng: number } | null {
    return this.directionsService?.getEndPosition() || null
  }
}
