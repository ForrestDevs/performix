import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" ADD COLUMN "skip_sync" boolean;
  ALTER TABLE "blueprints" ADD COLUMN "skip_sync" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" DROP COLUMN "skip_sync";
  ALTER TABLE "blueprints" DROP COLUMN "skip_sync";`)
}
