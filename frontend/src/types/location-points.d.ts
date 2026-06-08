export interface LocationPoint {
  id: number
  name: string
  description: string | null
  city: string | null
  latitude: number
  longitude: number
  category: string | null
  image_url: string | null
  upvotes: number
  created_at: Date
  updated_at: Date
}
