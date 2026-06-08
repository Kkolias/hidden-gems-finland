import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("location_points")
    .addColumn("upvotes", "integer", (col) => col.defaultTo(0).notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("location_points").dropColumn("upvotes").execute();
}
