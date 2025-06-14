import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "mentors" ADD COLUMN "slug" varchar;
  ALTER TABLE "mentors" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "mentors" ADD COLUMN "school_id" integer;
  DO $$ BEGIN
   ALTER TABLE "mentors" ADD CONSTRAINT "mentors_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "mentors_slug_idx" ON "mentors" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "mentors_school_idx" ON "mentors" USING btree ("school_id");
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "school";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "mentors" DROP CONSTRAINT "mentors_school_id_schools_id_fk";
  
  DROP INDEX IF EXISTS "mentors_slug_idx";
  DROP INDEX IF EXISTS "mentors_school_idx";
  ALTER TABLE "mentors" ADD COLUMN "school" varchar;
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "school_id";`)
}
