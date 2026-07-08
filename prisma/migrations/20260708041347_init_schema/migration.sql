-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "imageUrl" TEXT,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestorationRequest" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "damage" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RestorationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvisoryRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "preferredDate" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdvisoryRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeOffer" (
    "id" TEXT NOT NULL,
    "offererName" TEXT NOT NULL,
    "offererEmail" TEXT NOT NULL,
    "offeredItem" TEXT NOT NULL,
    "offeredDesc" TEXT NOT NULL,
    "offeredImageUrl" TEXT,
    "wantedItem" TEXT NOT NULL,
    "wantedDesc" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InventoryItem_status_idx" ON "InventoryItem"("status");

-- CreateIndex
CREATE INDEX "RestorationRequest_status_idx" ON "RestorationRequest"("status");

-- CreateIndex
CREATE INDEX "AdvisoryRequest_status_idx" ON "AdvisoryRequest"("status");

-- CreateIndex
CREATE INDEX "TradeOffer_status_idx" ON "TradeOffer"("status");
