import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "team_members_example_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"deliverable" varchar
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"avatar_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"credentials" varchar NOT NULL,
  	"approach" varchar,
  	"focus_areas" varchar,
  	"who_benefits" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "team_members_example_deliverables" ADD CONSTRAINT "team_members_example_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "team_members_example_deliverables_order_idx" ON "team_members_example_deliverables" USING btree ("_order");
  CREATE INDEX "team_members_example_deliverables_parent_id_idx" ON "team_members_example_deliverables" USING btree ("_parent_id");
  CREATE INDEX "team_members_avatar_idx" ON "team_members" USING btree ("avatar_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "team_members_example_deliverables" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "team_members_example_deliverables" CASCADE;
  DROP TABLE "team_members" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";`)
}
