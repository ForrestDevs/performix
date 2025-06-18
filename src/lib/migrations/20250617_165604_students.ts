import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_students_current_level" AS ENUM('aaa-bantam', 'aaa-midget', 'junior-a', 'junior-b', 'ushl', 'nahl', 'bchl', 'high-school-varsity', 'prep-school', 'other');
  CREATE TYPE "public"."enum_students_position" AS ENUM('left-wing', 'right-wing', 'center', 'left-defense', 'right-defense', 'goalie');
  CREATE TYPE "public"."enum_students_goal_level" AS ENUM('d1', 'd3', 'acha', 'junior', 'professional', 'not-sure');
  ALTER TABLE "students" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "students" ADD COLUMN "user_id" integer NOT NULL;
  ALTER TABLE "students" ADD COLUMN "email" varchar NOT NULL;
  ALTER TABLE "students" ADD COLUMN "phone" varchar;
  ALTER TABLE "students" ADD COLUMN "age" numeric NOT NULL;
  ALTER TABLE "students" ADD COLUMN "current_level" "enum_students_current_level" NOT NULL;
  ALTER TABLE "students" ADD COLUMN "position" "enum_students_position" NOT NULL;
  ALTER TABLE "students" ADD COLUMN "current_team" varchar NOT NULL;
  ALTER TABLE "students" ADD COLUMN "goal_level" "enum_students_goal_level" NOT NULL;
  ALTER TABLE "students" ADD COLUMN "goals" varchar;
  ALTER TABLE "students" ADD COLUMN "bio" varchar;
  ALTER TABLE "students" ADD COLUMN "profile_completed" boolean DEFAULT false;
  DO $$ BEGIN
   ALTER TABLE "students" ADD CONSTRAINT "students_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "students_user_idx" ON "students" USING btree ("user_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" DROP CONSTRAINT "students_user_id_users_id_fk";
  
  DROP INDEX IF EXISTS "students_user_idx";
  ALTER TABLE "students" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "students" DROP COLUMN IF EXISTS "user_id";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "phone";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "age";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "current_level";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "position";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "current_team";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "goal_level";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "goals";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "bio";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "profile_completed";
  DROP TYPE "public"."enum_students_current_level";
  DROP TYPE "public"."enum_students_position";
  DROP TYPE "public"."enum_students_goal_level";`)
}
