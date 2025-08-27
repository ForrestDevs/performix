import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_plans_period" ADD VALUE 'one-time';
  ALTER TABLE "plans" ADD COLUMN "grandfathered" boolean DEFAULT false;
  ALTER TABLE "plans" ADD COLUMN "needs_application" boolean DEFAULT false;
  ALTER TABLE "plans" ADD COLUMN "application_form" varchar;
  ALTER TABLE "plans" ADD COLUMN "is_special" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "plans" ALTER COLUMN "period" SET DATA TYPE text;
  ALTER TABLE "plans" ALTER COLUMN "period" SET DEFAULT 'monthly'::text;
  DROP TYPE "public"."enum_plans_period";
  CREATE TYPE "public"."enum_plans_period" AS ENUM('monthly', 'yearly');
  ALTER TABLE "plans" ALTER COLUMN "period" SET DEFAULT 'monthly'::"public"."enum_plans_period";
  ALTER TABLE "plans" ALTER COLUMN "period" SET DATA TYPE "public"."enum_plans_period" USING "period"::"public"."enum_plans_period";
  ALTER TABLE "plans" DROP COLUMN "grandfathered";
  ALTER TABLE "plans" DROP COLUMN "needs_application";
  ALTER TABLE "plans" DROP COLUMN "application_form";
  ALTER TABLE "plans" DROP COLUMN "is_special";`)
}
