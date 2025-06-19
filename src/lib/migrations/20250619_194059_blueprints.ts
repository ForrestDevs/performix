import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "blueprints_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "blueprints" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"title" varchar,
  	"thumbnail_id" integer,
  	"description" varchar,
  	"rich_text" jsonb,
  	"is_paid" boolean DEFAULT false,
  	"price" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blueprints_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blueprints_id" integer;
  ALTER TABLE "blueprints_videos" ADD CONSTRAINT "blueprints_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blueprints"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blueprints" ADD CONSTRAINT "blueprints_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blueprints_rels" ADD CONSTRAINT "blueprints_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blueprints"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blueprints_rels" ADD CONSTRAINT "blueprints_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blueprints_videos_order_idx" ON "blueprints_videos" USING btree ("_order");
  CREATE INDEX "blueprints_videos_parent_id_idx" ON "blueprints_videos" USING btree ("_parent_id");
  CREATE INDEX "blueprints_slug_idx" ON "blueprints" USING btree ("slug");
  CREATE INDEX "blueprints_thumbnail_idx" ON "blueprints" USING btree ("thumbnail_id");
  CREATE INDEX "blueprints_updated_at_idx" ON "blueprints" USING btree ("updated_at");
  CREATE INDEX "blueprints_created_at_idx" ON "blueprints" USING btree ("created_at");
  CREATE INDEX "blueprints_rels_order_idx" ON "blueprints_rels" USING btree ("order");
  CREATE INDEX "blueprints_rels_parent_idx" ON "blueprints_rels" USING btree ("parent_id");
  CREATE INDEX "blueprints_rels_path_idx" ON "blueprints_rels" USING btree ("path");
  CREATE INDEX "blueprints_rels_media_id_idx" ON "blueprints_rels" USING btree ("media_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blueprints_fk" FOREIGN KEY ("blueprints_id") REFERENCES "public"."blueprints"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_blueprints_id_idx" ON "payload_locked_documents_rels" USING btree ("blueprints_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blueprints_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blueprints" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blueprints_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blueprints_videos" CASCADE;
  DROP TABLE "blueprints" CASCADE;
  DROP TABLE "blueprints_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blueprints_fk";
  
  DROP INDEX "payload_locked_documents_rels_blueprints_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blueprints_id";`)
}
