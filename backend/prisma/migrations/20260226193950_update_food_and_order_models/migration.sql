/*
  Warnings:

  - Added the required column `priceAtPurchase` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "costPrice" DOUBLE PRECISION,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "priceAtPurchase" DOUBLE PRECISION NOT NULL;
