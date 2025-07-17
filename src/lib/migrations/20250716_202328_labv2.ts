import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "modules_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "volumes_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  ALTER TABLE "lessons" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "modules" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "modules" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "modules" ADD COLUMN "intro_video_id" integer;
  ALTER TABLE "modules" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "volumes" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "volumes" ADD COLUMN "intro_video_id" integer;
  ALTER TABLE "volumes" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "modules_topics" ADD CONSTRAINT "modules_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volumes_topics" ADD CONSTRAINT "volumes_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volumes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "modules_topics_order_idx" ON "modules_topics" USING btree ("_order");
  CREATE INDEX "modules_topics_parent_id_idx" ON "modules_topics" USING btree ("_parent_id");
  CREATE INDEX "volumes_topics_order_idx" ON "volumes_topics" USING btree ("_order");
  CREATE INDEX "volumes_topics_parent_id_idx" ON "volumes_topics" USING btree ("_parent_id");
  ALTER TABLE "modules" ADD CONSTRAINT "modules_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modules" ADD CONSTRAINT "modules_intro_video_id_videos_id_fk" FOREIGN KEY ("intro_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "volumes" ADD CONSTRAINT "volumes_intro_video_id_videos_id_fk" FOREIGN KEY ("intro_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "modules_thumbnail_idx" ON "modules" USING btree ("thumbnail_id");
  CREATE INDEX "modules_intro_video_idx" ON "modules" USING btree ("intro_video_id");
  CREATE INDEX "volumes_intro_video_idx" ON "volumes" USING btree ("intro_video_id");
  ALTER TABLE "lessons" DROP COLUMN "description";
  ALTER TABLE "modules" DROP COLUMN "description";
  ALTER TABLE "modules" DROP COLUMN "icon";
  ALTER TABLE "modules" DROP COLUMN "featured";
  ALTER TABLE "volumes" DROP COLUMN "description";
  DROP TYPE "public"."enum_modules_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_modules_icon" AS ENUM('target', 'users', 'book-open', 'zap', 'shield', 'trophy', 'heart', 'brain');
  ALTER TABLE "modules_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "volumes_topics" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "modules_topics" CASCADE;
  DROP TABLE "volumes_topics" CASCADE;
  ALTER TABLE "modules" DROP CONSTRAINT "modules_thumbnail_id_media_id_fk";
  
  ALTER TABLE "modules" DROP CONSTRAINT "modules_intro_video_id_videos_id_fk";
  
  ALTER TABLE "volumes" DROP CONSTRAINT "volumes_intro_video_id_videos_id_fk";
  
  DROP INDEX "modules_thumbnail_idx";
  DROP INDEX "modules_intro_video_idx";
  DROP INDEX "volumes_intro_video_idx";
  ALTER TABLE "lessons" ADD COLUMN "description" varchar;
  ALTER TABLE "modules" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "modules" ADD COLUMN "icon" "enum_modules_icon" NOT NULL;
  ALTER TABLE "modules" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "volumes" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "lessons" DROP COLUMN "subtitle";
  ALTER TABLE "modules" DROP COLUMN "subtitle";
  ALTER TABLE "modules" DROP COLUMN "thumbnail_id";
  ALTER TABLE "modules" DROP COLUMN "intro_video_id";
  ALTER TABLE "modules" DROP COLUMN "rich_text";
  ALTER TABLE "volumes" DROP COLUMN "subtitle";
  ALTER TABLE "volumes" DROP COLUMN "intro_video_id";
  ALTER TABLE "volumes" DROP COLUMN "rich_text";`)
}
