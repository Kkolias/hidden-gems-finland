function toRadians(deg: number): number {
  return (deg * Math.PI) / 180
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function pointToSegmentDistance(
  lat: number,
  lng: number,
  segLat1: number,
  segLng1: number,
  segLat2: number,
  segLng2: number,
): number {
  if (segLat1 === segLat2 && segLng1 === segLng2) {
    return haversineDistance(lat, lng, segLat1, segLng1)
  }

  const lonScale = Math.cos(
    toRadians((lat + segLat1 + segLat2) / 3),
  )

  const x = lng * lonScale
  const y = lat
  const x1 = segLng1 * lonScale
  const y1 = segLat1
  const x2 = segLng2 * lonScale
  const y2 = segLat2

  const dx = x2 - x1
  const dy = y2 - y1

  let t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)
  t = Math.max(0, Math.min(1, t))

  const projLat = y1 + t * dy
  const projLng = (x1 + t * dx) / lonScale

  return haversineDistance(lat, lng, projLat, projLng)
}

export function pointToPolylineDistance(
  lat: number | string,
  lng: number | string,
  coords: [number, number][],
): number {
  let minDist = Infinity
  for (let i = 0; i < coords.length - 1; i++) {
    const seg = coords[i]!
    const next = coords[i + 1]!
    const dist = pointToSegmentDistance(
      Number(lat),
      Number(lng),
      seg[0],
      seg[1],
      next[0],
      next[1],
    )
    if (dist < minDist) minDist = dist
  }
  return minDist
}
