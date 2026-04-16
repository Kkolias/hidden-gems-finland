import { LOCATION_POINT_PATHS } from '../constants/api.const'
import type { LocationPoint } from '../types/location-points'

const API_URL = import.meta.env.VITE_API_BASE_URL

export class ApiUtil {
  private async get(url: string, query: Record<string, unknown> = {}) {
    const queryString = new URLSearchParams(query as Record<string, string>).toString()

    const fullUrl = `${API_URL}${url}${queryString ? `?${queryString}` : ''}`

    const response = await fetch(fullUrl)
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    const r = await response.json()
    return r?.data || r
  }

  private async post(url: string, { payload }: { payload: unknown }) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const r = await response.json()
    return r?.data || r
  }

  async getLocations(): Promise<LocationPoint[]> {
    return await this.get(LOCATION_POINT_PATHS.GET_ALL)
  }

  async createLocation(location: Partial<LocationPoint>): Promise<LocationPoint> {
    return await this.post(LOCATION_POINT_PATHS.CREATE, { payload: { location } })
  }

  async updateLocation(location: Partial<LocationPoint>): Promise<LocationPoint> {
    return await this.post(LOCATION_POINT_PATHS.UPDATE, { payload: { location } })
  }
}

export default new ApiUtil()
