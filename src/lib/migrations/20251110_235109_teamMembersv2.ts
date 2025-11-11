import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "team_members_example_deliverables" CASCADE;
  ALTER TABLE "team_members" ADD COLUMN "bio" varchar;
  ALTER TABLE "team_members" DROP COLUMN "approach";
  ALTER TABLE "team_members" DROP COLUMN "focus_areas";
  ALTER TABLE "team_members" DROP COLUMN "who_benefits";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "team_members_example_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"deliverable" varchar
  );
  
  ALTER TABLE "team_members" ADD COLUMN "approach" varchar;
  ALTER TABLE "team_members" ADD COLUMN "focus_areas" varchar;
  ALTER TABLE "team_members" ADD COLUMN "who_benefits" varchar;
  ALTER TABLE "team_members_example_deliverables" ADD CONSTRAINT "team_members_example_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_members_example_deliverables_order_idx" ON "team_members_example_deliverables" USING btree ("_order");
  CREATE INDEX "team_members_example_deliverables_parent_id_idx" ON "team_members_example_deliverables" USING btree ("_parent_id");
  ALTER TABLE "team_members" DROP COLUMN "bio";`)
}
