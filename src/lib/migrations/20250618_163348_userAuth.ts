import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" ALTER COLUMN "current_level" SET DATA TYPE varchar;
  ALTER TABLE "students" ADD COLUMN "first_name" varchar NOT NULL;
  ALTER TABLE "students" ADD COLUMN "last_name" varchar NOT NULL;
  ALTER TABLE "students" ADD COLUMN "birth_date" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "students" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "age";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "goal_level";
  ALTER TABLE "public"."students" ALTER COLUMN "position" SET DATA TYPE text;
  DROP TYPE "public"."enum_students_position";
  CREATE TYPE "public"."enum_students_position" AS ENUM('forward', 'defence', 'goalie');
  ALTER TABLE "public"."students" ALTER COLUMN "position" SET DATA TYPE "public"."enum_students_position" USING "position"::"public"."enum_students_position";
  DROP TYPE "public"."enum_students_current_level";
  DROP TYPE "public"."enum_students_goal_level";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_students_current_level" AS ENUM('aaa-bantam', 'aaa-midget', 'junior-a', 'junior-b', 'ushl', 'nahl', 'bchl', 'high-school-varsity', 'prep-school', 'other');
  CREATE TYPE "public"."enum_students_goal_level" AS ENUM('d1', 'd3', 'acha', 'junior', 'professional', 'not-sure');
  ALTER TABLE "students" ALTER COLUMN "current_level" SET DATA TYPE enum_students_current_level;
  ALTER TABLE "students" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "students" ADD COLUMN "email" varchar NOT NULL;
  ALTER TABLE "students" ADD COLUMN "age" numeric NOT NULL;
  ALTER TABLE "students" ADD COLUMN "goal_level" "enum_students_goal_level" NOT NULL;
  ALTER TABLE "students" DROP COLUMN IF EXISTS "first_name";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "last_name";
  ALTER TABLE "students" DROP COLUMN IF EXISTS "birth_date";
  ALTER TABLE "public"."students" ALTER COLUMN "position" SET DATA TYPE text;
  DROP TYPE "public"."enum_students_position";
  CREATE TYPE "public"."enum_students_position" AS ENUM('left-wing', 'right-wing', 'center', 'left-defense', 'right-defense', 'goalie');
  ALTER TABLE "public"."students" ALTER COLUMN "position" SET DATA TYPE "public"."enum_students_position" USING "position"::"public"."enum_students_position";`)
}
