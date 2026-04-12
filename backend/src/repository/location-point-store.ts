import { db } from "../database";
import { LocationPoint } from "../types/db";

export class LocationPointStore {
  async findAll(): Promise<LocationPoint[]> {
    return await db.selectFrom("location_points").selectAll().execute();
  }
}

export default new LocationPointStore();
