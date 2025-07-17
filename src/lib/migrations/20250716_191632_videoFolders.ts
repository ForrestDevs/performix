import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" ADD COLUMN "folder_id" integer;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "videos_folder_idx" ON "videos" USING btree ("folder_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" DROP CONSTRAINT "videos_folder_id_payload_folders_id_fk";
  
  DROP INDEX "videos_folder_idx";
  ALTER TABLE "videos" DROP COLUMN "folder_id";`)
}
