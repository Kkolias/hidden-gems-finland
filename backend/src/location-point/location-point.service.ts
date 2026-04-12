import repositoryService from "../repository/repository-service";
import { LocationPoint } from "../types/db";



export class LocationPointService {
  readonly repositoryService = repositoryService;

  async getAllLocationPoints(): Promise<LocationPoint[]> {
    return await this.repositoryService.locationPointStore.findAll();
  }
}

export default new LocationPointService();