import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_transactions_status" AS ENUM('pending', 'completed', 'failed', 'refunded');
  CREATE TABLE "transactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"amount" numeric NOT NULL,
  	"status" "enum_transactions_status" DEFAULT 'pending' NOT NULL,
  	"payment_intent_id" varchar,
  	"stripe_customer_id" varchar,
  	"currency" varchar DEFAULT 'USD',
  	"refund_reason" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "transactions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blueprints_id" integer,
  	"courses_id" integer
  );
  
  CREATE TABLE "plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "plans" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"monthly_price" numeric,
  	"yearly_price" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" RENAME COLUMN "stripe_i_d" TO "stripe_customer_id";
  ALTER TABLE "students" ADD COLUMN "is_parent" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "transactions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "plans_id" integer;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions_rels" ADD CONSTRAINT "transactions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transactions_rels" ADD CONSTRAINT "transactions_rels_blueprints_fk" FOREIGN KEY ("blueprints_id") REFERENCES "public"."blueprints"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transactions_rels" ADD CONSTRAINT "transactions_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_features" ADD CONSTRAINT "plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "transactions_user_idx" ON "transactions" USING btree ("user_id");
  CREATE INDEX "transactions_updated_at_idx" ON "transactions" USING btree ("updated_at");
  CREATE INDEX "transactions_created_at_idx" ON "transactions" USING btree ("created_at");
  CREATE INDEX "transactions_rels_order_idx" ON "transactions_rels" USING btree ("order");
  CREATE INDEX "transactions_rels_parent_idx" ON "transactions_rels" USING btree ("parent_id");
  CREATE INDEX "transactions_rels_path_idx" ON "transactions_rels" USING btree ("path");
  CREATE INDEX "transactions_rels_blueprints_id_idx" ON "transactions_rels" USING btree ("blueprints_id");
  CREATE INDEX "transactions_rels_courses_id_idx" ON "transactions_rels" USING btree ("courses_id");
  CREATE INDEX "plans_features_order_idx" ON "plans_features" USING btree ("_order");
  CREATE INDEX "plans_features_parent_id_idx" ON "plans_features" USING btree ("_parent_id");
  CREATE INDEX "plans_updated_at_idx" ON "plans" USING btree ("updated_at");
  CREATE INDEX "plans_created_at_idx" ON "plans" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("transactions_id");
  CREATE INDEX "payload_locked_documents_rels_plans_id_idx" ON "payload_locked_documents_rels" USING btree ("plans_id");
  ALTER TABLE "users" DROP COLUMN "skip_sync";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "transactions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transactions_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "plans" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "transactions" CASCADE;
  DROP TABLE "transactions_rels" CASCADE;
  DROP TABLE "plans_features" CASCADE;
  DROP TABLE "plans" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_transactions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_plans_fk";
  
  DROP INDEX "payload_locked_documents_rels_transactions_id_idx";
  DROP INDEX "payload_locked_documents_rels_plans_id_idx";
  ALTER TABLE "users" ADD COLUMN "stripe_i_d" varchar;
  ALTER TABLE "users" ADD COLUMN "skip_sync" boolean;
  ALTER TABLE "users" DROP COLUMN "stripe_customer_id";
  ALTER TABLE "students" DROP COLUMN "is_parent";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "transactions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "plans_id";
  DROP TYPE "public"."enum_transactions_status";`)
}
