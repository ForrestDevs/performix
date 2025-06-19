import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "lessons_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "lessons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  `)

  await db.execute(sql`
  ALTER TABLE "courses_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_what_you_will_learn" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons_content_additional_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons_content_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons_content_downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
`)

  await db.execute(sql`
  DROP TABLE "courses_tags" CASCADE;
  DROP TABLE "courses_requirements" CASCADE;
  DROP TABLE "courses_what_you_will_learn" CASCADE;
  `)

  await db.execute(sql`
  DROP TABLE "lessons_content_additional_resources" CASCADE;
  DROP TABLE "lessons_content_attachments" CASCADE;
  DROP TABLE "lessons_content_downloads" CASCADE;
  DROP TABLE "categories" CASCADE;
  `)

  await db.execute(sql`
  ALTER TABLE "courses" DROP CONSTRAINT "courses_producer_id_users_id_fk";
  
  ALTER TABLE "chapters" DROP CONSTRAINT "chapters_parent_chapter_id_chapters_id_fk";
  `)

  await db.execute(sql`
  DROP INDEX "courses_producer_idx";
  DROP INDEX "chapters_parent_chapter_idx";
  DROP INDEX "lessons_content_primary_content_video_data_content_primary_content_video_data_video_thumbnail_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  DROP INDEX "courses_slug_idx";
  ALTER TABLE "courses" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "courses" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "price" SET DEFAULT 0;
  ALTER TABLE "courses" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "courses" ADD COLUMN "rich_text" jsonb NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "free_preview" boolean DEFAULT true;
  ALTER TABLE "chapters" ADD COLUMN "slug" varchar;
  ALTER TABLE "chapters" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "chapters" ADD COLUMN "full_slug" varchar;
  ALTER TABLE "chapters" ADD COLUMN "parent_id" integer;
  ALTER TABLE "chapters" ADD COLUMN "is_leaf" boolean DEFAULT true;
  ALTER TABLE "lessons" ADD COLUMN "slug" varchar;
  ALTER TABLE "lessons" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "lessons" ADD COLUMN "description" varchar;
  ALTER TABLE "lessons" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "lessons_videos" ADD CONSTRAINT "lessons_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_rels" ADD CONSTRAINT "lessons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_rels" ADD CONSTRAINT "lessons_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "lessons_videos_order_idx" ON "lessons_videos" USING btree ("_order");
  CREATE INDEX "lessons_videos_parent_id_idx" ON "lessons_videos" USING btree ("_parent_id");
  CREATE INDEX "lessons_rels_order_idx" ON "lessons_rels" USING btree ("order");
  CREATE INDEX "lessons_rels_parent_idx" ON "lessons_rels" USING btree ("parent_id");
  CREATE INDEX "lessons_rels_path_idx" ON "lessons_rels" USING btree ("path");
  CREATE INDEX "lessons_rels_media_id_idx" ON "lessons_rels" USING btree ("media_id");
  ALTER TABLE "chapters" ADD CONSTRAINT "chapters_parent_id_chapters_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."chapters"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "chapters_slug_idx" ON "chapters" USING btree ("slug");
  CREATE INDEX "chapters_parent_idx" ON "chapters" USING btree ("parent_id");
  CREATE INDEX "lessons_slug_idx" ON "lessons" USING btree ("slug");
  CREATE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  ALTER TABLE "courses" DROP COLUMN "producer_id";
  ALTER TABLE "courses" DROP COLUMN "category";
  ALTER TABLE "chapters" DROP COLUMN "parent_chapter_id";
  ALTER TABLE "chapters" DROP COLUMN "order";
  ALTER TABLE "chapters" DROP COLUMN "depth";
  ALTER TABLE "lessons" DROP COLUMN "display_order";
  ALTER TABLE "lessons" DROP COLUMN "content_type";
  ALTER TABLE "lessons" DROP COLUMN "content_primary_content_type";
  ALTER TABLE "lessons" DROP COLUMN "content_primary_content_video_data_video_url";
  ALTER TABLE "lessons" DROP COLUMN "content_primary_content_video_data_video_provider";
  ALTER TABLE "lessons" DROP COLUMN "content_primary_content_video_data_video_thumbnail_id";
  ALTER TABLE "lessons" DROP COLUMN "content_primary_content_video_data_duration";
  ALTER TABLE "lessons" DROP COLUMN "content_primary_content_rich_text_data";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";
  DROP TYPE "public"."enum_lessons_content_additional_resources_type";
  DROP TYPE "public"."enum_lessons_content_type";
  DROP TYPE "public"."enum_lessons_content_primary_content_type";
  DROP TYPE "public"."enum_lessons_content_primary_content_video_data_video_provider";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lessons_content_additional_resources_type" AS ENUM('pdf', 'link', 'file', 'embed');
  CREATE TYPE "public"."enum_lessons_content_type" AS ENUM('video', 'article', 'mixed');
  CREATE TYPE "public"."enum_lessons_content_primary_content_type" AS ENUM('video', 'rich_text');
  CREATE TYPE "public"."enum_lessons_content_primary_content_video_data_video_provider" AS ENUM('youtube', 'vimeo', 'custom');
  CREATE TABLE "courses_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "courses_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"requirement" varchar
  );
  
  CREATE TABLE "courses_what_you_will_learn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"learning" varchar
  );
  
  CREATE TABLE "lessons_content_additional_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_lessons_content_additional_resources_type" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"url" varchar,
  	"file_id" integer
  );
  
  CREATE TABLE "lessons_content_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "lessons_content_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "lessons_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "lessons_videos" CASCADE;
  DROP TABLE "lessons_rels" CASCADE;
  ALTER TABLE "chapters" DROP CONSTRAINT "chapters_parent_id_chapters_id_fk";
  
  ALTER TABLE "mentors_skills" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_mentors_skills";
  CREATE TYPE "public"."enum_mentors_skills" AS ENUM('defensive-awareness', 'defending-the-rush', 'offensive-production', 'breaking-out', 'winning-battles', 'playmaking', 'skating-ability', 'puck-handling', 'reaction-speed', 'agility', 'physicality', 'speed', 'wallplay', 'stickhandling', 'hockey-iq', 'teamwork', 'leadership');
  ALTER TABLE "mentors_skills" ALTER COLUMN "value" SET DATA TYPE "public"."enum_mentors_skills" USING "value"::"public"."enum_mentors_skills";
  DROP INDEX "chapters_slug_idx";
  DROP INDEX "chapters_parent_idx";
  DROP INDEX "lessons_slug_idx";
  DROP INDEX "courses_slug_idx";
  ALTER TABLE "courses" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "description" SET DATA TYPE jsonb;
  ALTER TABLE "courses" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "price" DROP DEFAULT;
  ALTER TABLE "courses" ADD COLUMN "producer_id" integer NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "category" varchar NOT NULL;
  ALTER TABLE "chapters" ADD COLUMN "parent_chapter_id" integer;
  ALTER TABLE "chapters" ADD COLUMN "order" numeric NOT NULL;
  ALTER TABLE "chapters" ADD COLUMN "depth" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "lessons" ADD COLUMN "display_order" varchar;
  ALTER TABLE "lessons" ADD COLUMN "content_type" "enum_lessons_content_type" NOT NULL;
  ALTER TABLE "lessons" ADD COLUMN "content_primary_content_type" "enum_lessons_content_primary_content_type" NOT NULL;
  ALTER TABLE "lessons" ADD COLUMN "content_primary_content_video_data_video_url" varchar;
  ALTER TABLE "lessons" ADD COLUMN "content_primary_content_video_data_video_provider" "enum_lessons_content_primary_content_video_data_video_provider";
  ALTER TABLE "lessons" ADD COLUMN "content_primary_content_video_data_video_thumbnail_id" integer;
  ALTER TABLE "lessons" ADD COLUMN "content_primary_content_video_data_duration" numeric;
  ALTER TABLE "lessons" ADD COLUMN "content_primary_content_rich_text_data" jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "courses_tags" ADD CONSTRAINT "courses_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_requirements" ADD CONSTRAINT "courses_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_what_you_will_learn" ADD CONSTRAINT "courses_what_you_will_learn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_content_additional_resources" ADD CONSTRAINT "lessons_content_additional_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_content_additional_resources" ADD CONSTRAINT "lessons_content_additional_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_content_attachments" ADD CONSTRAINT "lessons_content_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_content_attachments" ADD CONSTRAINT "lessons_content_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_content_downloads" ADD CONSTRAINT "lessons_content_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_content_downloads" ADD CONSTRAINT "lessons_content_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_tags_order_idx" ON "courses_tags" USING btree ("_order");
  CREATE INDEX "courses_tags_parent_id_idx" ON "courses_tags" USING btree ("_parent_id");
  CREATE INDEX "courses_requirements_order_idx" ON "courses_requirements" USING btree ("_order");
  CREATE INDEX "courses_requirements_parent_id_idx" ON "courses_requirements" USING btree ("_parent_id");
  CREATE INDEX "courses_what_you_will_learn_order_idx" ON "courses_what_you_will_learn" USING btree ("_order");
  CREATE INDEX "courses_what_you_will_learn_parent_id_idx" ON "courses_what_you_will_learn" USING btree ("_parent_id");
  CREATE INDEX "lessons_content_additional_resources_order_idx" ON "lessons_content_additional_resources" USING btree ("_order");
  CREATE INDEX "lessons_content_additional_resources_parent_id_idx" ON "lessons_content_additional_resources" USING btree ("_parent_id");
  CREATE INDEX "lessons_content_additional_resources_file_idx" ON "lessons_content_additional_resources" USING btree ("file_id");
  CREATE INDEX "lessons_content_attachments_order_idx" ON "lessons_content_attachments" USING btree ("_order");
  CREATE INDEX "lessons_content_attachments_parent_id_idx" ON "lessons_content_attachments" USING btree ("_parent_id");
  CREATE INDEX "lessons_content_attachments_file_idx" ON "lessons_content_attachments" USING btree ("file_id");
  CREATE INDEX "lessons_content_downloads_order_idx" ON "lessons_content_downloads" USING btree ("_order");
  CREATE INDEX "lessons_content_downloads_parent_id_idx" ON "lessons_content_downloads" USING btree ("_parent_id");
  CREATE INDEX "lessons_content_downloads_file_idx" ON "lessons_content_downloads" USING btree ("file_id");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  ALTER TABLE "courses" ADD CONSTRAINT "courses_producer_id_users_id_fk" FOREIGN KEY ("producer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chapters" ADD CONSTRAINT "chapters_parent_chapter_id_chapters_id_fk" FOREIGN KEY ("parent_chapter_id") REFERENCES "public"."chapters"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_content_primary_content_video_data_video_thumbnail_id_media_id_fk" FOREIGN KEY ("content_primary_content_video_data_video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_producer_idx" ON "courses" USING btree ("producer_id");
  CREATE INDEX "chapters_parent_chapter_idx" ON "chapters" USING btree ("parent_chapter_id");
  CREATE INDEX "lessons_content_primary_content_video_data_content_primary_content_video_data_video_thumbnail_idx" ON "lessons" USING btree ("content_primary_content_video_data_video_thumbnail_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  ALTER TABLE "courses" DROP COLUMN "slug_lock";
  ALTER TABLE "courses" DROP COLUMN "rich_text";
  ALTER TABLE "courses" DROP COLUMN "free_preview";
  ALTER TABLE "chapters" DROP COLUMN "slug";
  ALTER TABLE "chapters" DROP COLUMN "slug_lock";
  ALTER TABLE "chapters" DROP COLUMN "full_slug";
  ALTER TABLE "chapters" DROP COLUMN "parent_id";
  ALTER TABLE "chapters" DROP COLUMN "is_leaf";
  ALTER TABLE "lessons" DROP COLUMN "slug";
  ALTER TABLE "lessons" DROP COLUMN "slug_lock";
  ALTER TABLE "lessons" DROP COLUMN "description";
  ALTER TABLE "lessons" DROP COLUMN "rich_text";`)
}
