import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "progress" DROP CONSTRAINT "progress_enrollment_id_enrollments_id_fk";
  
  DROP INDEX "progress_enrollment_idx";
  ALTER TABLE "modules" ALTER COLUMN "total_lessons" SET DEFAULT 0;
  ALTER TABLE "progress" ADD COLUMN "user_id" integer NOT NULL;
  ALTER TABLE "progress" ADD COLUMN "completed" boolean DEFAULT false;
  ALTER TABLE "volumes" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "progress" ADD CONSTRAINT "progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "volumes" ADD CONSTRAINT "volumes_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "progress_user_idx" ON "progress" USING btree ("user_id");
  CREATE INDEX "volumes_thumbnail_idx" ON "volumes" USING btree ("thumbnail_id");
  ALTER TABLE "progress" DROP COLUMN "enrollment_id";
  ALTER TABLE "progress" DROP COLUMN "status";
  ALTER TABLE "progress" DROP COLUMN "last_accessed";
  DROP TYPE "public"."enum_progress_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_progress_status" AS ENUM('not_started', 'in_progress', 'completed');
  ALTER TABLE "progress" DROP CONSTRAINT "progress_user_id_users_id_fk";
  
  ALTER TABLE "volumes" DROP CONSTRAINT "volumes_thumbnail_id_media_id_fk";
  
  DROP INDEX "progress_user_idx";
  DROP INDEX "volumes_thumbnail_idx";
  ALTER TABLE "modules" ALTER COLUMN "total_lessons" DROP DEFAULT;
  ALTER TABLE "progress" ADD COLUMN "enrollment_id" integer NOT NULL;
  ALTER TABLE "progress" ADD COLUMN "status" "enum_progress_status" DEFAULT 'not_started' NOT NULL;
  ALTER TABLE "progress" ADD COLUMN "last_accessed" timestamp(3) with time zone;
  ALTER TABLE "progress" ADD CONSTRAINT "progress_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "progress_enrollment_idx" ON "progress" USING btree ("enrollment_id");
  ALTER TABLE "progress" DROP COLUMN "user_id";
  ALTER TABLE "progress" DROP COLUMN "completed";
  ALTER TABLE "volumes" DROP COLUMN "thumbnail_id";`)
}
