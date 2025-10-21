import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sessions" RENAME COLUMN "impersonated_by_id" TO "impersonated_by";
  ALTER TABLE "sessions" DROP CONSTRAINT "sessions_impersonated_by_id_users_id_fk";
  
  DROP INDEX "sessions_impersonated_by_idx";
  ALTER TABLE "users" ALTER COLUMN "email_verified" SET DEFAULT false;
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'student';
  DROP TYPE "public"."enum_users_role";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'student', 'mentor');
  ALTER TABLE "sessions" RENAME COLUMN "impersonated_by" TO "impersonated_by_id";
  ALTER TABLE "users" ALTER COLUMN "email_verified" DROP DEFAULT;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'student'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_impersonated_by_id_users_id_fk" FOREIGN KEY ("impersonated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sessions_impersonated_by_idx" ON "sessions" USING btree ("impersonated_by_id");`)
}
