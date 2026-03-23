import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_webhooks_events" AS ENUM('form-response.created');
  CREATE TABLE "webhooks_events" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_webhooks_events",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "webhooks_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "webhooks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"secret" varchar,
  	"is_active" boolean DEFAULT true,
  	"retry_count" numeric DEFAULT 3,
  	"last_triggered" timestamp(3) with time zone,
  	"last_status" numeric,
  	"last_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "webhooks_id" integer;
  ALTER TABLE "webhooks_events" ADD CONSTRAINT "webhooks_events_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."webhooks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "webhooks_headers" ADD CONSTRAINT "webhooks_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."webhooks"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "webhooks_events_order_idx" ON "webhooks_events" USING btree ("order");
  CREATE INDEX "webhooks_events_parent_idx" ON "webhooks_events" USING btree ("parent_id");
  CREATE INDEX "webhooks_headers_order_idx" ON "webhooks_headers" USING btree ("_order");
  CREATE INDEX "webhooks_headers_parent_id_idx" ON "webhooks_headers" USING btree ("_parent_id");
  CREATE INDEX "webhooks_updated_at_idx" ON "webhooks" USING btree ("updated_at");
  CREATE INDEX "webhooks_created_at_idx" ON "webhooks" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_webhooks_fk" FOREIGN KEY ("webhooks_id") REFERENCES "public"."webhooks"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_webhooks_id_idx" ON "payload_locked_documents_rels" USING btree ("webhooks_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "webhooks_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "webhooks_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "webhooks" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "webhooks_events" CASCADE;
  DROP TABLE "webhooks_headers" CASCADE;
  DROP TABLE "webhooks" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_webhooks_fk";
  
  DROP INDEX "payload_locked_documents_rels_webhooks_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "webhooks_id";
  DROP TYPE "public"."enum_webhooks_events";`)
}
