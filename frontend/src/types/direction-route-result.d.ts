export interface DirectionRouteResult {
  distance: number
  duration: number
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
}
