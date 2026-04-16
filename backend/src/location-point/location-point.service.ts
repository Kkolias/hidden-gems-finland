import repositoryService from "../repository/repository-service";
import {
  LocationPoint,
  LocationPointUpdate,
  NewLocationPoint,
} from "../types/db";

export class LocationPointService {
  readonly repositoryService = repositoryService;

  async getAllLocationPoints(): Promise<LocationPoint[]> {
    return await this.repositoryService.locationPointStore.findAll();
  }

  async updateLocationPoint(
    savePayload: LocationPointUpdate,
  ): Promise<LocationPoint> {
    return await this.repositoryService.locationPointStore.update(savePayload);
  }

  async createLocationPoint(
    savePayload: NewLocationPoint,
  ): Promise<LocationPoint> {
    console.log("PAYLOAD", savePayload)
    return null as any
    // return await this.repositoryService.locationPointStore.create(savePayload);
  }
}

export default new LocationPointService();
