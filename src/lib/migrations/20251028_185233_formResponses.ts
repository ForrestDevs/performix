import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "form_responses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_name" varchar NOT NULL,
  	"user_name" varchar,
  	"user_phone" varchar,
  	"user_email" varchar,
  	"response" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_responses_id" integer;
  CREATE INDEX "form_responses_updated_at_idx" ON "form_responses" USING btree ("updated_at");
  CREATE INDEX "form_responses_created_at_idx" ON "form_responses" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_responses_fk" FOREIGN KEY ("form_responses_id") REFERENCES "public"."form_responses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_form_responses_id_idx" ON "payload_locked_documents_rels" USING btree ("form_responses_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_responses" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "form_responses" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_responses_fk";
  
  DROP INDEX "payload_locked_documents_rels_form_responses_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_responses_id";`)
}
