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
      .set({ ...updatePayload, updated_at: new Date().toUTCString() as any })
      .where("id", "=", id)
      .returning(selectFields)
      .executeTakeFirst();

    return r as LocationPoint;
  }

  async updateListNameAndDescription(
    points: { id: number; name: string; description: string }[],
  ): Promise<boolean> {
    const trx = await db.startTransaction().execute();
    try {
      for (const point of points) {
        await trx
          .updateTable("location_points")
          .set({
            name: point.name,
            description: point.description,
            updated_at: new Date().toUTCString() as any,
          })
          .where("id", "=", point.id)
          .execute();
      }
      await trx.commit().execute();
      return true;
    } catch (error) {
      await trx.rollback().execute();
      throw error;
    }
  }
}

export default new LocationPointStore();
