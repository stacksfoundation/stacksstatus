-- CreateTable
CREATE TABLE "mempool_size" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mempool_size_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mempool_size_sate_index" ON "mempool_size"("date" DESC);
