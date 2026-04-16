import { SelectExpression } from "kysely";
import { db } from "../database";
import {
  Database,
  LocationPoint,
  LocationPointUpdate,
  NewLocationPoint,
} from "../types/db";

const selectFields: SelectExpression<Database, "location_points">[] = [
  "id",
  "name",
  "description",
  "city",
  "category",
  "latitude",
  "longitude",
  "image_url",
  "created_at",
  "updated_at",
];

export class LocationPointStore {
  async findAll(): Promise<LocationPoint[]> {
    return await db
      .selectFrom("location_points")
      .select(selectFields)
      .execute();
  }

  async create(payload: NewLocationPoint): Promise<LocationPoint> {
    const r = await db
      .insertInto("location_points")
      .values(payload)
      .returning(selectFields)
      .executeTakeFirst();

    return r as LocationPoint;
  }

  async update(payload: LocationPointUpdate): Promise<LocationPoint> {
    const { id, ...updatePayload } = payload;
    if (!id) throw Error("No update id given");

    const r = await db
      .updateTable("location_points")
      .set(updatePayload)
      .where("id", "=", id)
      .returning(selectFields)
      .executeTakeFirst();

    return r as LocationPoint;
  }
}

export default new LocationPointStore();
