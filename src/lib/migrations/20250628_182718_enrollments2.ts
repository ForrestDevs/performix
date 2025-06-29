import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_enrollments_type" AS ENUM('course', 'blueprint');
  CREATE TYPE "public"."enum_enrollments_status" AS ENUM('active', 'refunded');
  CREATE TABLE "enrollments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"type" "enum_enrollments_type" NOT NULL,
  	"enrolled_course_id" integer,
  	"enrolled_blueprint_id" integer,
  	"status" "enum_enrollments_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "progress" ADD COLUMN "enrollment_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enrollments_id" integer;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_enrolled_course_id_courses_id_fk" FOREIGN KEY ("enrolled_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_enrolled_blueprint_id_blueprints_id_fk" FOREIGN KEY ("enrolled_blueprint_id") REFERENCES "public"."blueprints"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "enrollments_user_idx" ON "enrollments" USING btree ("user_id");
  CREATE INDEX "enrollments_enrolled_course_idx" ON "enrollments" USING btree ("enrolled_course_id");
  CREATE INDEX "enrollments_enrolled_blueprint_idx" ON "enrollments" USING btree ("enrolled_blueprint_id");
  CREATE INDEX "enrollments_updated_at_idx" ON "enrollments" USING btree ("updated_at");
  CREATE INDEX "enrollments_created_at_idx" ON "enrollments" USING btree ("created_at");
  ALTER TABLE "progress" ADD CONSTRAINT "progress_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enrollments_fk" FOREIGN KEY ("enrollments_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "progress_enrollment_idx" ON "progress" USING btree ("enrollment_id");
  CREATE INDEX "payload_locked_documents_rels_enrollments_id_idx" ON "payload_locked_documents_rels" USING btree ("enrollments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "enrollments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "enrollments" CASCADE;
  ALTER TABLE "progress" DROP CONSTRAINT "progress_enrollment_id_enrollments_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_enrollments_fk";
  
  DROP INDEX "progress_enrollment_idx";
  DROP INDEX "payload_locked_documents_rels_enrollments_id_idx";
  ALTER TABLE "progress" DROP COLUMN "enrollment_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "enrollments_id";
  DROP TYPE "public"."enum_enrollments_type";
  DROP TYPE "public"."enum_enrollments_status";`)
}
