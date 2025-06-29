import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "stripe_i_d" varchar;
  ALTER TABLE "users" ADD COLUMN "skip_sync" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP COLUMN "stripe_i_d";
  ALTER TABLE "users" DROP COLUMN "skip_sync";`)
}
