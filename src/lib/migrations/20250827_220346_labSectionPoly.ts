import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "lab_sections" DROP COLUMN "content_type";
  DROP TYPE "public"."enum_lab_sections_content_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lab_sections_content_type" AS ENUM('modules', 'volumes', 'lessons', 'mixed');
  ALTER TABLE "lab_sections" ADD COLUMN "content_type" "enum_lab_sections_content_type" NOT NULL;`)
}
