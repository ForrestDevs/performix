import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "transactions" ADD COLUMN "stripe_client_secret" varchar;
  ALTER TABLE "transactions" ADD COLUMN "expires_at" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "transactions" DROP COLUMN "stripe_client_secret";
  ALTER TABLE "transactions" DROP COLUMN "expires_at";`)
}
