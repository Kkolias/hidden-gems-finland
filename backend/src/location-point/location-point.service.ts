import repositoryService from "../repository/repository-service";
import {
  LocationPoint,
  LocationPointUpdate,
  NewLocationPoint,
} from "../types/db";
import { checkPointNameAndDescription } from "./utils/checkPointNameAndDescription";

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
    return await this.repositoryService.locationPointStore.create(savePayload);
  }

  async checkPointNameAndDescription(): Promise<{
    affected: number;
  }> {
    return await checkPointNameAndDescription();
  }
}

export default new LocationPointService();
