import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("location_points")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("city", "varchar")
    .addColumn("description", "text")
    .addColumn("category", "varchar")
    .addColumn("latitude", "numeric", (col) => col.notNull())
    .addColumn("longitude", "numeric", (col) => col.notNull())
    .addColumn("image_url", "varchar")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("location_points").execute();
}
