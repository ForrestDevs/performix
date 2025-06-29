import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_plans_period" AS ENUM('monthly', 'yearly');
  ALTER TABLE "plans_features" RENAME TO "plans_includes";
  ALTER TABLE "plans_includes" RENAME COLUMN "feature" TO "item";
  ALTER TABLE "plans_includes" DROP CONSTRAINT "plans_features_parent_id_fk";
  
  DROP INDEX "plans_features_order_idx";
  DROP INDEX "plans_features_parent_id_idx";
  ALTER TABLE "courses" ALTER COLUMN "price" DROP NOT NULL;
  ALTER TABLE "blueprints" ALTER COLUMN "price" SET DEFAULT 0;
  ALTER TABLE "courses" ADD COLUMN "is_paid" boolean DEFAULT false;
  ALTER TABLE "courses" ADD COLUMN "stripe_product_id" varchar;
  ALTER TABLE "courses" ADD COLUMN "stripe_price_id" varchar;
  ALTER TABLE "blueprints" ADD COLUMN "stripe_product_id" varchar;
  ALTER TABLE "blueprints" ADD COLUMN "stripe_price_id" varchar;
  ALTER TABLE "plans" ADD COLUMN "slug" varchar;
  ALTER TABLE "plans" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "plans" ADD COLUMN "description" varchar;
  ALTER TABLE "plans" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "plans" ADD COLUMN "best_for" varchar;
  ALTER TABLE "plans" ADD COLUMN "stripe_product_id" varchar;
  ALTER TABLE "plans" ADD COLUMN "stripe_price_id" varchar;
  ALTER TABLE "plans" ADD COLUMN "price" numeric DEFAULT 0;
  ALTER TABLE "plans" ADD COLUMN "period" "enum_plans_period";
  ALTER TABLE "plans_includes" ADD CONSTRAINT "plans_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans" ADD CONSTRAINT "plans_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "plans_includes_order_idx" ON "plans_includes" USING btree ("_order");
  CREATE INDEX "plans_includes_parent_id_idx" ON "plans_includes" USING btree ("_parent_id");
  CREATE INDEX "plans_slug_idx" ON "plans" USING btree ("slug");
  CREATE INDEX "plans_thumbnail_idx" ON "plans" USING btree ("thumbnail_id");
  ALTER TABLE "plans" DROP COLUMN "monthly_price";
  ALTER TABLE "plans" DROP COLUMN "yearly_price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "plans_includes" RENAME TO "plans_features";
  ALTER TABLE "plans_features" RENAME COLUMN "item" TO "feature";
  ALTER TABLE "plans" RENAME COLUMN "price" TO "monthly_price";
  ALTER TABLE "plans_features" DROP CONSTRAINT "plans_includes_parent_id_fk";
  
  ALTER TABLE "plans" DROP CONSTRAINT "plans_thumbnail_id_media_id_fk";
  
  DROP INDEX "plans_includes_order_idx";
  DROP INDEX "plans_includes_parent_id_idx";
  DROP INDEX "plans_slug_idx";
  DROP INDEX "plans_thumbnail_idx";
  ALTER TABLE "courses" ALTER COLUMN "price" SET NOT NULL;
  ALTER TABLE "blueprints" ALTER COLUMN "price" DROP DEFAULT;
  ALTER TABLE "plans" ADD COLUMN "yearly_price" numeric;
  ALTER TABLE "plans_features" ADD CONSTRAINT "plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "plans_features_order_idx" ON "plans_features" USING btree ("_order");
  CREATE INDEX "plans_features_parent_id_idx" ON "plans_features" USING btree ("_parent_id");
  ALTER TABLE "courses" DROP COLUMN "is_paid";
  ALTER TABLE "courses" DROP COLUMN "stripe_product_id";
  ALTER TABLE "courses" DROP COLUMN "stripe_price_id";
  ALTER TABLE "blueprints" DROP COLUMN "stripe_product_id";
  ALTER TABLE "blueprints" DROP COLUMN "stripe_price_id";
  ALTER TABLE "plans" DROP COLUMN "slug";
  ALTER TABLE "plans" DROP COLUMN "slug_lock";
  ALTER TABLE "plans" DROP COLUMN "description";
  ALTER TABLE "plans" DROP COLUMN "thumbnail_id";
  ALTER TABLE "plans" DROP COLUMN "best_for";
  ALTER TABLE "plans" DROP COLUMN "stripe_product_id";
  ALTER TABLE "plans" DROP COLUMN "stripe_price_id";
  ALTER TABLE "plans" DROP COLUMN "period";
  DROP TYPE "public"."enum_plans_period";`)
}
