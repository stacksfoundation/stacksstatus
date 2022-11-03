/*
  Warnings:

  - Changed the type of `data` on the `block_time` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "block_time" DROP COLUMN "data",
ADD COLUMN     "data" DECIMAL(65,30) NOT NULL;
