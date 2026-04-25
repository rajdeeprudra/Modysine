/*
  Warnings:

  - You are about to drop the column `stoctCount` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `stockCount` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "stoctCount",
ADD COLUMN     "stockCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
