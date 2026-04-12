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

  async getLocations(): Promise<LocationPoint[]> {
    return await this.get(LOCATION_POINT_PATHS.GET_ALL)
  }
}

export default new ApiUtil()
