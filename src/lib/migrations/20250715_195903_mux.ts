import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_videos_playback_options_playback_policy" AS ENUM('signed', 'public');
   CREATE TYPE "public"."enum_modules_icon" AS ENUM('target', 'users', 'book-open', 'zap', 'shield', 'trophy', 'heart', 'brain');
   CREATE TABLE "videos_playback_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"playback_id" varchar,
  	"playback_policy" "enum_videos_playback_options_playback_policy"
  );
  
   CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"asset_id" varchar,
  	"duration" numeric,
  	"poster_timestamp" numeric,
  	"aspect_ratio" varchar,
  	"max_width" numeric,
  	"max_height" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "modules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_modules_icon" NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"featured" boolean DEFAULT false,
  	"estimated_time" varchar,
  	"total_lessons" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "volumes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"module_id" integer NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"total_lessons" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  

  `)

  await db.execute(sql`
      ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "chapters" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "lessons_videos" DISABLE ROW LEVEL SECURITY;
      DROP TABLE "courses" CASCADE;
      DROP TABLE "chapters" CASCADE;
      DROP TABLE "lessons_videos" CASCADE;
  `)

  await db.execute(sql`
  ALTER TABLE "enrollments" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_enrollments_type";
  CREATE TYPE "public"."enum_enrollments_type" AS ENUM('blueprint', 'plan');
  ALTER TABLE "enrollments" ALTER COLUMN "type" SET DATA TYPE "public"."enum_enrollments_type" USING "type"::"public"."enum_enrollments_type";
  ALTER TABLE "transactions" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_transactions_type";
  CREATE TYPE "public"."enum_transactions_type" AS ENUM('blueprint', 'plan');
  ALTER TABLE "transactions" ALTER COLUMN "type" SET DATA TYPE "public"."enum_transactions_type" USING "type"::"public"."enum_transactions_type";


  DROP INDEX "lessons_course_idx";
  DROP INDEX "lessons_chapter_idx";
  DROP INDEX "enrollments_enrolled_course_idx";
  DROP INDEX "reviews_course_idx";
  DROP INDEX "transactions_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_chapters_id_idx";


  DELETE FROM "lessons";

  ALTER TABLE "lessons" ALTER COLUMN "order" SET DEFAULT 0;
  ALTER TABLE "transactions" ALTER COLUMN "expires_at" SET DATA TYPE numeric;
  ALTER TABLE "plans" ALTER COLUMN "period" SET DEFAULT 'monthly';
  ALTER TABLE "lessons" ADD COLUMN "module_id" integer NOT NULL;
  ALTER TABLE "lessons" ADD COLUMN "volume_id" integer NOT NULL;
  ALTER TABLE "lessons_rels" ADD COLUMN "videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "modules_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "volumes_id" integer;

 `)

  await db.execute(sql`
     ALTER TABLE "videos_playback_options" ADD CONSTRAINT "videos_playback_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
     ALTER TABLE "volumes" ADD CONSTRAINT "volumes_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE set null ON UPDATE no action;
     CREATE INDEX "videos_playback_options_order_idx" ON "videos_playback_options" USING btree ("_order");
     CREATE INDEX "videos_playback_options_parent_id_idx" ON "videos_playback_options" USING btree ("_parent_id");
     CREATE UNIQUE INDEX "videos_title_idx" ON "videos" USING btree ("title");
     CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
     CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
     CREATE INDEX "modules_slug_idx" ON "modules" USING btree ("slug");
     CREATE INDEX "modules_updated_at_idx" ON "modules" USING btree ("updated_at");
     CREATE INDEX "modules_created_at_idx" ON "modules" USING btree ("created_at");
     CREATE INDEX "volumes_slug_idx" ON "volumes" USING btree ("slug");
     CREATE INDEX "volumes_module_idx" ON "volumes" USING btree ("module_id");
     CREATE INDEX "volumes_updated_at_idx" ON "volumes" USING btree ("updated_at");
     CREATE INDEX "volumes_created_at_idx" ON "volumes" USING btree ("created_at");
     ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE set null ON UPDATE no action;
     ALTER TABLE "lessons" ADD CONSTRAINT "lessons_volume_id_volumes_id_fk" FOREIGN KEY ("volume_id") REFERENCES "public"."volumes"("id") ON DELETE set null ON UPDATE no action;
     ALTER TABLE "lessons_rels" ADD CONSTRAINT "lessons_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_modules_fk" FOREIGN KEY ("modules_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volumes_fk" FOREIGN KEY ("volumes_id") REFERENCES "public"."volumes"("id") ON DELETE cascade ON UPDATE no action;
     CREATE INDEX "lessons_module_idx" ON "lessons" USING btree ("module_id");
     CREATE INDEX "lessons_volume_idx" ON "lessons" USING btree ("volume_id");
     CREATE INDEX "lessons_rels_videos_id_idx" ON "lessons_rels" USING btree ("videos_id");
     CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
     CREATE INDEX "payload_locked_documents_rels_modules_id_idx" ON "payload_locked_documents_rels" USING btree ("modules_id");
     CREATE INDEX "payload_locked_documents_rels_volumes_id_idx" ON "payload_locked_documents_rels" USING btree ("volumes_id");
     ALTER TABLE "lessons" DROP COLUMN "course_id";
     ALTER TABLE "lessons" DROP COLUMN "chapter_id";
     ALTER TABLE "enrollments" DROP COLUMN "enrolled_course_id";
     ALTER TABLE "reviews" DROP COLUMN "course_id";
     ALTER TABLE "transactions_rels" DROP COLUMN "courses_id";
     ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
     ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "chapters_id";
     DROP TYPE "public"."enum_courses_status";
     DROP TYPE "public"."enum_courses_structure_type";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_courses_structure_type" AS ENUM('flat', 'hierarchical');
  ALTER TYPE "public"."enum_enrollments_type" ADD VALUE 'course' BEFORE 'blueprint';
  ALTER TYPE "public"."enum_transactions_type" ADD VALUE 'course' BEFORE 'plan';
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"status" "enum_courses_status" DEFAULT 'draft' NOT NULL,
  	"title" varchar NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"description" varchar,
  	"rich_text" jsonb NOT NULL,
  	"free_preview" boolean DEFAULT true,
  	"is_paid" boolean DEFAULT false,
  	"skip_sync" boolean,
  	"stripe_product_id" varchar,
  	"stripe_price_id" varchar,
  	"price" numeric DEFAULT 0,
  	"structure_type" "enum_courses_structure_type" DEFAULT 'flat' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "chapters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"full_slug" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"course_id" integer NOT NULL,
  	"parent_id" integer,
  	"is_leaf" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lessons_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "videos_playback_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "volumes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "videos_playback_options" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "modules" CASCADE;
  DROP TABLE "volumes" CASCADE;
  ALTER TABLE "lessons" DROP CONSTRAINT "lessons_module_id_modules_id_fk";
  
  ALTER TABLE "lessons" DROP CONSTRAINT "lessons_volume_id_volumes_id_fk";
  
  ALTER TABLE "lessons_rels" DROP CONSTRAINT "lessons_rels_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_modules_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_volumes_fk";
  
  DROP INDEX "lessons_module_idx";
  DROP INDEX "lessons_volume_idx";
  DROP INDEX "lessons_rels_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_modules_id_idx";
  DROP INDEX "payload_locked_documents_rels_volumes_id_idx";
  ALTER TABLE "lessons" ALTER COLUMN "order" DROP DEFAULT;
  ALTER TABLE "transactions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp(3) with time zone;
  ALTER TABLE "plans" ALTER COLUMN "period" DROP DEFAULT;
  ALTER TABLE "lessons" ADD COLUMN "course_id" integer NOT NULL;
  ALTER TABLE "lessons" ADD COLUMN "chapter_id" integer;
  ALTER TABLE "enrollments" ADD COLUMN "enrolled_course_id" integer;
  ALTER TABLE "reviews" ADD COLUMN "course_id" integer NOT NULL;
  ALTER TABLE "transactions_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chapters_id" integer;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chapters" ADD CONSTRAINT "chapters_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chapters" ADD CONSTRAINT "chapters_parent_id_chapters_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."chapters"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_videos" ADD CONSTRAINT "lessons_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_thumbnail_idx" ON "courses" USING btree ("thumbnail_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "chapters_slug_idx" ON "chapters" USING btree ("slug");
  CREATE INDEX "chapters_course_idx" ON "chapters" USING btree ("course_id");
  CREATE INDEX "chapters_parent_idx" ON "chapters" USING btree ("parent_id");
  CREATE INDEX "chapters_updated_at_idx" ON "chapters" USING btree ("updated_at");
  CREATE INDEX "chapters_created_at_idx" ON "chapters" USING btree ("created_at");
  CREATE INDEX "lessons_videos_order_idx" ON "lessons_videos" USING btree ("_order");
  CREATE INDEX "lessons_videos_parent_id_idx" ON "lessons_videos" USING btree ("_parent_id");
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_enrolled_course_id_courses_id_fk" FOREIGN KEY ("enrolled_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions_rels" ADD CONSTRAINT "transactions_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chapters_fk" FOREIGN KEY ("chapters_id") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "lessons_course_idx" ON "lessons" USING btree ("course_id");
  CREATE INDEX "lessons_chapter_idx" ON "lessons" USING btree ("chapter_id");
  CREATE INDEX "enrollments_enrolled_course_idx" ON "enrollments" USING btree ("enrolled_course_id");
  CREATE INDEX "reviews_course_idx" ON "reviews" USING btree ("course_id");
  CREATE INDEX "transactions_rels_courses_id_idx" ON "transactions_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_chapters_id_idx" ON "payload_locked_documents_rels" USING btree ("chapters_id");
  ALTER TABLE "lessons" DROP COLUMN "module_id";
  ALTER TABLE "lessons" DROP COLUMN "volume_id";
  ALTER TABLE "lessons_rels" DROP COLUMN "videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "modules_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "volumes_id";
  DROP TYPE "public"."enum_videos_playback_options_playback_policy";
  DROP TYPE "public"."enum_modules_icon";`)
}
