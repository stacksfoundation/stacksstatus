-- CreateTable
CREATE TABLE "mempool_size" (
    "id" SERIAL NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" INTEGER NOT NULL,

    CONSTRAINT "mempool_size_pkey" PRIMARY KEY ("id")
);
