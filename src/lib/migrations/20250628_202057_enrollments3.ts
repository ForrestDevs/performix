import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_enrollments_type" ADD VALUE 'plan';
  ALTER TABLE "enrollments" ADD COLUMN "enrolled_plan_id" integer;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_enrolled_plan_id_plans_id_fk" FOREIGN KEY ("enrolled_plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "enrollments_enrolled_plan_idx" ON "enrollments" USING btree ("enrolled_plan_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_enrolled_plan_id_plans_id_fk";
  
  ALTER TABLE "enrollments" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_enrollments_type";
  CREATE TYPE "public"."enum_enrollments_type" AS ENUM('course', 'blueprint');
  ALTER TABLE "enrollments" ALTER COLUMN "type" SET DATA TYPE "public"."enum_enrollments_type" USING "type"::"public"."enum_enrollments_type";
  DROP INDEX "enrollments_enrolled_plan_idx";
  ALTER TABLE "enrollments" DROP COLUMN "enrolled_plan_id";`)
}
