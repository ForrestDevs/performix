import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Convert column to text to remove enum constraint
  await db.execute(sql`
    ALTER TABLE "public"."mentors_skills" ALTER COLUMN "value" SET DATA TYPE text;
  `)

  // Step 2: Drop old enum type (now safe since column is text)
  await db.execute(sql`
    DROP TYPE "public"."enum_mentors_skills";
  `)

  // Step 3: Update any existing data that needs migration (now safe since it's text)
  await db.execute(sql`
    UPDATE "public"."mentors_skills" 
    SET value = 'winning-battles' 
    WHERE value = 'winning-the-battle';
  `)

  // Step 4: Create new enum with updated values
  await db.execute(sql`
    CREATE TYPE "public"."enum_mentors_skills" AS ENUM(
      'defensive-awareness', 
      'defending-the-rush', 
      'offensive-production', 
      'breaking-out', 
      'winning-battles', 
      'playmaking', 
      'skating-ability', 
      'puck-handling', 
      'reaction-speed', 
      'agility', 
      'physicality',
      'goal-scoring',
      'speed', 
      'wallplay', 
      'stickhandling', 
      'hockey-iq', 
      'teamwork', 
      'leadership'
    );
  `)

  // Step 5: Convert column back to enum type (will validate all data)
  await db.execute(sql`
    ALTER TABLE "public"."mentors_skills" 
    ALTER COLUMN "value" SET DATA TYPE "public"."enum_mentors_skills" 
    USING "value"::"public"."enum_mentors_skills";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Step 1: Convert to text
  await db.execute(sql`
    ALTER TABLE "public"."mentors_skills" ALTER COLUMN "value" SET DATA TYPE text;
  `)

  // Step 2: Drop new enum
  await db.execute(sql`
    DROP TYPE "public"."enum_mentors_skills";
  `)

  // Step 3: Update data back to old value
  await db.execute(sql`
    UPDATE "public"."mentors_skills" 
    SET value = 'winning-the-battle' 
    WHERE value = 'winning-battles';
  `)

  // Step 4: Remove values that didn't exist in old enum
  await db.execute(sql`
    DELETE FROM "public"."mentors_skills" 
    WHERE value IN ('physicality', 'goal-scoring');
  `)

  // Step 5: Recreate old enum (without new values)
  await db.execute(sql`
    CREATE TYPE "public"."enum_mentors_skills" AS ENUM(
      'defensive-awareness', 
      'defending-the-rush', 
      'offensive-production', 
      'breaking-out', 
      'winning-the-battle', 
      'playmaking', 
      'skating-ability', 
      'puck-handling', 
      'reaction-speed', 
      'agility', 
      'speed', 
      'wallplay', 
      'stickhandling', 
      'hockey-iq', 
      'teamwork', 
      'leadership'
    );
  `)

  // Step 6: Convert back to enum
  await db.execute(sql`
    ALTER TABLE "public"."mentors_skills" 
    ALTER COLUMN "value" SET DATA TYPE "public"."enum_mentors_skills" 
    USING "value"::"public"."enum_mentors_skills";
  `)
}
