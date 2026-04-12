import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  location_points: LocationPointTable;
}

export interface LocationPointTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  city: string | null;
  latitude: number;
  longitude: number;
  category: string | null;
  image_url: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export type LocationPoint = Selectable<LocationPointTable>;
export type NewLocationPoint = Insertable<LocationPointTable>;
export type LocationPointUpdate = Updateable<LocationPointTable>;
