import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create new enum types
    CREATE TYPE "public"."enum_mentors_sports" AS ENUM('hockey', 'soccer', 'baseball', 'basketball', 'volleyball');
    CREATE TYPE "public"."enum_mentors_skills" AS ENUM('defensive-awareness', 'defending-the-rush', 'offensive-production', 'breaking-out', 'winning-the-battle', 'playmaking', 'skating-ability', 'puck-handling', 'reaction-speed', 'agility', 'speed', 'wallplay', 'stickhandling', 'hockey-iq', 'teamwork', 'leadership');
    CREATE TYPE "public"."enum_mentors_position" AS ENUM('forward', 'defence', 'goalie');
    CREATE TYPE "public"."enum_mentors_level_of_play" AS ENUM('d1', 'pro', 'usports');
    
    -- Drop old tables completely (this will cascade and remove all data)
    DROP TABLE IF EXISTS "mentors_ages_served" CASCADE;
    DROP TABLE IF EXISTS "mentors_sports" CASCADE;
    DROP TABLE IF EXISTS "mentors_skills" CASCADE;
    
    -- Update mentors table
    ALTER TABLE "mentors" DROP COLUMN IF EXISTS "position";
    ALTER TABLE "mentors" ADD COLUMN "position" "enum_mentors_position";
    ALTER TABLE "mentors" ADD COLUMN "intro" varchar;
    ALTER TABLE "mentors" ADD COLUMN "location" varchar;
    ALTER TABLE "mentors" ADD COLUMN "level_of_play" "enum_mentors_level_of_play";
    
    -- Drop old social columns
    ALTER TABLE "mentors" DROP COLUMN IF EXISTS "socials_tiktok";
    ALTER TABLE "mentors" DROP COLUMN IF EXISTS "socials_youtube";
    
    -- Recreate mentors_sports table from scratch
    CREATE TABLE IF NOT EXISTS "mentors_sports" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_mentors_sports"
    );
    
    -- Recreate mentors_skills table from scratch  
    CREATE TABLE IF NOT EXISTS "mentors_skills" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_mentors_skills"
    );
    
    -- Add foreign key constraints
    DO $$ BEGIN
     ALTER TABLE "mentors_sports" ADD CONSTRAINT "mentors_sports_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."mentors"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "mentors_skills" ADD CONSTRAINT "mentors_skills_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."mentors"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    -- Create indexes
    CREATE INDEX IF NOT EXISTS "mentors_sports_parent_idx" ON "mentors_sports" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "mentors_skills_parent_idx" ON "mentors_skills" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "mentors_sports_order_idx" ON "mentors_sports" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "mentors_skills_order_idx" ON "mentors_skills" USING btree ("order");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "mentors_ages_served" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"age" varchar
  );
  
  ALTER TABLE "mentors_sports" DROP CONSTRAINT "mentors_sports_parent_fk";
  
  ALTER TABLE "mentors_skills" DROP CONSTRAINT "mentors_skills_parent_fk";
  
  DROP INDEX IF EXISTS "mentors_sports_parent_idx";
  DROP INDEX IF EXISTS "mentors_skills_parent_idx";
  DROP INDEX IF EXISTS "mentors_sports_order_idx";
  DROP INDEX IF EXISTS "mentors_skills_order_idx";
  ALTER TABLE "mentors_sports" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "mentors_skills" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "mentors" ALTER COLUMN "position" SET DATA TYPE varchar;
  ALTER TABLE "mentors_sports" ADD COLUMN "_order" integer NOT NULL;
  ALTER TABLE "mentors_sports" ADD COLUMN "_parent_id" integer NOT NULL;
  ALTER TABLE "mentors_sports" ADD COLUMN "sport" varchar;
  ALTER TABLE "mentors_skills" ADD COLUMN "_order" integer NOT NULL;
  ALTER TABLE "mentors_skills" ADD COLUMN "_parent_id" integer NOT NULL;
  ALTER TABLE "mentors_skills" ADD COLUMN "skill" varchar;
  ALTER TABLE "mentors" ADD COLUMN "socials_tiktok" varchar;
  ALTER TABLE "mentors" ADD COLUMN "socials_youtube" varchar;
  DO $$ BEGIN
   ALTER TABLE "mentors_ages_served" ADD CONSTRAINT "mentors_ages_served_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mentors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "mentors_ages_served_order_idx" ON "mentors_ages_served" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "mentors_ages_served_parent_id_idx" ON "mentors_ages_served" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "mentors_sports" ADD CONSTRAINT "mentors_sports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mentors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "mentors_skills" ADD CONSTRAINT "mentors_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mentors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "mentors_sports_parent_id_idx" ON "mentors_sports" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "mentors_skills_parent_id_idx" ON "mentors_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "mentors_sports_order_idx" ON "mentors_sports" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "mentors_skills_order_idx" ON "mentors_skills" USING btree ("_order");
  ALTER TABLE "mentors_sports" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "mentors_sports" DROP COLUMN IF EXISTS "parent_id";
  ALTER TABLE "mentors_sports" DROP COLUMN IF EXISTS "value";
  ALTER TABLE "mentors_skills" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "mentors_skills" DROP COLUMN IF EXISTS "parent_id";
  ALTER TABLE "mentors_skills" DROP COLUMN IF EXISTS "value";
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "location";
  ALTER TABLE "mentors" DROP COLUMN IF EXISTS "level_of_play";
  DROP TYPE "public"."enum_mentors_sports";
  DROP TYPE "public"."enum_mentors_skills";
  DROP TYPE "public"."enum_mentors_position";
  DROP TYPE "public"."enum_mentors_level_of_play";`)
}
