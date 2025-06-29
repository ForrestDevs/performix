import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Drop foreign key constraints first (order matters)
    ALTER TABLE "progress" DROP CONSTRAINT IF EXISTS "progress_enrollment_id_enrollments_id_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_enrollments_fk";
    
    -- Drop indexes that depend on the columns
    DROP INDEX IF EXISTS "progress_enrollment_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_enrollments_id_idx";
    
    -- Drop columns that reference enrollments
    ALTER TABLE "progress" DROP COLUMN IF EXISTS "enrollment_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "enrollments_id";
    
    -- Disable row level security before dropping tables (only if they exist)
    ALTER TABLE "enrollments" DISABLE ROW LEVEL SECURITY;
    
    -- Check if enrollments_rels exists before disabling RLS
    DO $$ 
    BEGIN
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'enrollments_rels') THEN
            ALTER TABLE "enrollments_rels" DISABLE ROW LEVEL SECURITY;
        END IF;
    END $$;
    
    -- Drop tables with CASCADE to handle any remaining dependencies
    DROP TABLE IF EXISTS "enrollments" CASCADE;
    DROP TABLE IF EXISTS "enrollments_rels" CASCADE;
    
    -- Drop enums last
    DROP TYPE IF EXISTS "public"."enum_enrollments_type";
    DROP TYPE IF EXISTS "public"."enum_enrollments_status";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_enrollments_type" AS ENUM('course', 'blueprint');
  CREATE TYPE "public"."enum_enrollments_status" AS ENUM('active', 'refunded');
  CREATE TABLE "enrollments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"type" "enum_enrollments_type" NOT NULL,
  	"status" "enum_enrollments_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enrollments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"courses_id" integer,
  	"blueprints_id" integer
  );
  
  ALTER TABLE "progress" ADD COLUMN "enrollment_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enrollments_id" integer;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments_rels" ADD CONSTRAINT "enrollments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enrollments_rels" ADD CONSTRAINT "enrollments_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enrollments_rels" ADD CONSTRAINT "enrollments_rels_blueprints_fk" FOREIGN KEY ("blueprints_id") REFERENCES "public"."blueprints"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "enrollments_user_idx" ON "enrollments" USING btree ("user_id");
  CREATE INDEX "enrollments_updated_at_idx" ON "enrollments" USING btree ("updated_at");
  CREATE INDEX "enrollments_created_at_idx" ON "enrollments" USING btree ("created_at");
  CREATE INDEX "enrollments_rels_order_idx" ON "enrollments_rels" USING btree ("order");
  CREATE INDEX "enrollments_rels_parent_idx" ON "enrollments_rels" USING btree ("parent_id");
  CREATE INDEX "enrollments_rels_path_idx" ON "enrollments_rels" USING btree ("path");
  CREATE INDEX "enrollments_rels_courses_id_idx" ON "enrollments_rels" USING btree ("courses_id");
  CREATE INDEX "enrollments_rels_blueprints_id_idx" ON "enrollments_rels" USING btree ("blueprints_id");
  ALTER TABLE "progress" ADD CONSTRAINT "progress_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enrollments_fk" FOREIGN KEY ("enrollments_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "progress_enrollment_idx" ON "progress" USING btree ("enrollment_id");
  CREATE INDEX "payload_locked_documents_rels_enrollments_id_idx" ON "payload_locked_documents_rels" USING btree ("enrollments_id");`)
}
