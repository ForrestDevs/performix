import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lab_sections_content_type" AS ENUM('modules', 'volumes', 'lessons', 'mixed');
  CREATE TABLE "lab_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"content_type" "enum_lab_sections_content_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lab_sections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"modules_id" integer,
  	"volumes_id" integer,
  	"lessons_id" integer
  );
  
  ALTER TABLE "lessons" ALTER COLUMN "module_id" DROP NOT NULL;
  ALTER TABLE "lessons" ALTER COLUMN "volume_id" DROP NOT NULL;
  ALTER TABLE "volumes" ALTER COLUMN "module_id" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "lab_sections_id" integer;
  ALTER TABLE "lab_sections_rels" ADD CONSTRAINT "lab_sections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lab_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lab_sections_rels" ADD CONSTRAINT "lab_sections_rels_modules_fk" FOREIGN KEY ("modules_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lab_sections_rels" ADD CONSTRAINT "lab_sections_rels_volumes_fk" FOREIGN KEY ("volumes_id") REFERENCES "public"."volumes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lab_sections_rels" ADD CONSTRAINT "lab_sections_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "lab_sections_updated_at_idx" ON "lab_sections" USING btree ("updated_at");
  CREATE INDEX "lab_sections_created_at_idx" ON "lab_sections" USING btree ("created_at");
  CREATE INDEX "lab_sections_rels_order_idx" ON "lab_sections_rels" USING btree ("order");
  CREATE INDEX "lab_sections_rels_parent_idx" ON "lab_sections_rels" USING btree ("parent_id");
  CREATE INDEX "lab_sections_rels_path_idx" ON "lab_sections_rels" USING btree ("path");
  CREATE INDEX "lab_sections_rels_modules_id_idx" ON "lab_sections_rels" USING btree ("modules_id");
  CREATE INDEX "lab_sections_rels_volumes_id_idx" ON "lab_sections_rels" USING btree ("volumes_id");
  CREATE INDEX "lab_sections_rels_lessons_id_idx" ON "lab_sections_rels" USING btree ("lessons_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lab_sections_fk" FOREIGN KEY ("lab_sections_id") REFERENCES "public"."lab_sections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_lab_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("lab_sections_id");
  ALTER TABLE "lessons" DROP COLUMN "estimated_duration";
  ALTER TABLE "modules" DROP COLUMN "estimated_time";
  ALTER TABLE "modules" DROP COLUMN "total_lessons";
  ALTER TABLE "volumes" DROP COLUMN "total_lessons";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "lab_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lab_sections_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "lab_sections" CASCADE;
  DROP TABLE "lab_sections_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_lab_sections_fk";
  
  DROP INDEX "payload_locked_documents_rels_lab_sections_id_idx";
  ALTER TABLE "lessons" ALTER COLUMN "module_id" SET NOT NULL;
  ALTER TABLE "lessons" ALTER COLUMN "volume_id" SET NOT NULL;
  ALTER TABLE "volumes" ALTER COLUMN "module_id" SET NOT NULL;
  ALTER TABLE "lessons" ADD COLUMN "estimated_duration" numeric;
  ALTER TABLE "modules" ADD COLUMN "estimated_time" varchar;
  ALTER TABLE "modules" ADD COLUMN "total_lessons" numeric DEFAULT 0;
  ALTER TABLE "volumes" ADD COLUMN "total_lessons" numeric DEFAULT 0;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "lab_sections_id";
  DROP TYPE "public"."enum_lab_sections_content_type";`)
}
