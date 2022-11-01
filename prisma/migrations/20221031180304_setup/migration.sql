/*
  Warnings:

  - The primary key for the `mempool_size` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mempool_size` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ts]` on the table `mempool_size` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "mempool_size" DROP CONSTRAINT "mempool_size_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "tx_fees_daily" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tx_fees_hourly" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "mempool_contracts" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contract" TEXT,
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "blocks" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "block_height" INTEGER NOT NULL,
    "block_hash" TEXT,
    "burn_block_time" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "block_txs" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "single_tx_blocks" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "block_time" (
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tx_fees_daily_ts_key" ON "tx_fees_daily"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "tx_fees_hourly_ts_key" ON "tx_fees_hourly"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "mempool_contracts_ts_key" ON "mempool_contracts"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_ts_key" ON "blocks"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "block_txs_ts_key" ON "block_txs"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "single_tx_blocks_ts_key" ON "single_tx_blocks"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "block_time_ts_key" ON "block_time"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "mempool_size_ts_key" ON "mempool_size"("ts");
