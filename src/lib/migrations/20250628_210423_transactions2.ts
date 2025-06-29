import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_transactions_type" AS ENUM('blueprint', 'course', 'plan');
  ALTER TABLE "transactions" RENAME COLUMN "amount" TO "total";
  ALTER TABLE "transactions" RENAME COLUMN "payment_intent_id" TO "stripe_payment_id";
  ALTER TABLE "transactions" ADD COLUMN "type" "enum_transactions_type" NOT NULL;
  ALTER TABLE "transactions_rels" ADD COLUMN "plans_id" integer;
  ALTER TABLE "transactions_rels" ADD CONSTRAINT "transactions_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "transactions_rels_plans_id_idx" ON "transactions_rels" USING btree ("plans_id");
  ALTER TABLE "transactions" DROP COLUMN "refund_reason";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "transactions" RENAME COLUMN "total" TO "amount";
  ALTER TABLE "transactions" RENAME COLUMN "stripe_payment_id" TO "payment_intent_id";
  ALTER TABLE "transactions_rels" DROP CONSTRAINT "transactions_rels_plans_fk";
  
  DROP INDEX "transactions_rels_plans_id_idx";
  ALTER TABLE "transactions" ADD COLUMN "refund_reason" varchar;
  ALTER TABLE "transactions" DROP COLUMN "type";
  ALTER TABLE "transactions_rels" DROP COLUMN "plans_id";
  DROP TYPE "public"."enum_transactions_type";`)
}
