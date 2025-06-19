import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_enrollments_type" AS ENUM('course', 'blueprint');
  CREATE TABLE "enrollments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"courses_id" integer,
  	"blueprints_id" integer
  );
  
  ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_course_id_courses_id_fk";
  
  ALTER TABLE "enrollments" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "enrollments" ALTER COLUMN "status" SET DEFAULT 'active'::text;
  DROP TYPE "public"."enum_enrollments_status";
  CREATE TYPE "public"."enum_enrollments_status" AS ENUM('active', 'refunded');
  ALTER TABLE "enrollments" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."enum_enrollments_status";
  ALTER TABLE "enrollments" ALTER COLUMN "status" SET DATA TYPE "public"."enum_enrollments_status" USING "status"::"public"."enum_enrollments_status";
  DROP INDEX "enrollments_course_idx";
  ALTER TABLE "enrollments" ADD COLUMN "type" "enum_enrollments_type" NOT NULL;
  ALTER TABLE "enrollments_rels" ADD CONSTRAINT "enrollments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enrollments_rels" ADD CONSTRAINT "enrollments_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enrollments_rels" ADD CONSTRAINT "enrollments_rels_blueprints_fk" FOREIGN KEY ("blueprints_id") REFERENCES "public"."blueprints"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "enrollments_rels_order_idx" ON "enrollments_rels" USING btree ("order");
  CREATE INDEX "enrollments_rels_parent_idx" ON "enrollments_rels" USING btree ("parent_id");
  CREATE INDEX "enrollments_rels_path_idx" ON "enrollments_rels" USING btree ("path");
  CREATE INDEX "enrollments_rels_courses_id_idx" ON "enrollments_rels" USING btree ("courses_id");
  CREATE INDEX "enrollments_rels_blueprints_id_idx" ON "enrollments_rels" USING btree ("blueprints_id");
  ALTER TABLE "enrollments" DROP COLUMN "course_id";
  ALTER TABLE "enrollments" DROP COLUMN "progress";
  ALTER TABLE "enrollments" DROP COLUMN "purchased_at";
  ALTER TABLE "enrollments" DROP COLUMN "completed_at";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_enrollments_status" ADD VALUE 'completed' BEFORE 'refunded';
  ALTER TABLE "enrollments_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "enrollments_rels" CASCADE;
  ALTER TABLE "enrollments" ADD COLUMN "course_id" integer NOT NULL;
  ALTER TABLE "enrollments" ADD COLUMN "progress" jsonb;
  ALTER TABLE "enrollments" ADD COLUMN "purchased_at" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "enrollments" ADD COLUMN "completed_at" timestamp(3) with time zone;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "enrollments_course_idx" ON "enrollments" USING btree ("course_id");
  ALTER TABLE "enrollments" DROP COLUMN "type";
  DROP TYPE "public"."enum_enrollments_type";`)
}
