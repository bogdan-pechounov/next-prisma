-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "asin" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("asin")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");
