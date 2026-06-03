export interface DirectionRouteResult {
  distance: number
  duration: number
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
  error?:
    | 'No route found between the points. Try moving points closer to roads.'
    | 'Error getting route. Try again later.'
}
