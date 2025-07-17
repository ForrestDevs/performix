import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_videos_source" AS ENUM('mux', 'youtube', 'loom');
  ALTER TABLE "videos" ADD COLUMN "source" "enum_videos_source" DEFAULT 'mux';
  ALTER TABLE "videos" ADD COLUMN "youtube_url" varchar;
  ALTER TABLE "videos" ADD COLUMN "loom_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" DROP COLUMN "source";
  ALTER TABLE "videos" DROP COLUMN "youtube_url";
  ALTER TABLE "videos" DROP COLUMN "loom_url";
  DROP TYPE "public"."enum_videos_source";`)
}
