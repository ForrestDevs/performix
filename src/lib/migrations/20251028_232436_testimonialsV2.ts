import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_testimonials_type" AS ENUM('standard', 'parent', 'video', 'screenshot');
  ALTER TABLE "testimonials" ALTER COLUMN "featured" SET DEFAULT false;
  ALTER TABLE "testimonials" ADD COLUMN "type" "enum_testimonials_type" DEFAULT 'standard' NOT NULL;
  ALTER TABLE "testimonials" ADD COLUMN "video_id" integer;
  ALTER TABLE "testimonials" ADD COLUMN "progression" varchar;
  ALTER TABLE "testimonials" ADD COLUMN "parent_of" varchar;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "testimonials_video_idx" ON "testimonials" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_video_id_videos_id_fk";
  
  DROP INDEX "testimonials_video_idx";
  ALTER TABLE "testimonials" ALTER COLUMN "featured" SET DEFAULT true;
  ALTER TABLE "testimonials" DROP COLUMN "type";
  ALTER TABLE "testimonials" DROP COLUMN "video_id";
  ALTER TABLE "testimonials" DROP COLUMN "progression";
  ALTER TABLE "testimonials" DROP COLUMN "parent_of";
  DROP TYPE "public"."enum_testimonials_type";`)
}
