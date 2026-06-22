-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'CONTENT_MANAGER', 'SALES_MANAGER', 'VIEWER', 'EXHIBITOR', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "ExhibitorStatus" AS ENUM ('EXHIBITOR', 'PARTNER', 'SPONSOR', 'AMBASSADOR');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('PLENARY', 'MASTERCLASS', 'LECTURE', 'DISCUSSION', 'PRESENTATION', 'WORKSHOP');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('VALID', 'USED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('PARTICIPATION', 'CONTACT', 'SUBSCRIPTION');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'CONTACTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('AMBASSADOR', 'PARTNER', 'SPONSOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "EventSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "venueRu" TEXT NOT NULL,
    "venueEn" TEXT NOT NULL,
    "cityRu" TEXT NOT NULL,
    "cityEn" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "addressRu" TEXT NOT NULL,
    "addressEn" TEXT NOT NULL,
    "visitorCount" INTEGER NOT NULL DEFAULT 0,
    "exhibitorCount" INTEGER NOT NULL DEFAULT 0,
    "areaSize" INTEGER NOT NULL DEFAULT 0,
    "programEventsCount" INTEGER NOT NULL DEFAULT 0,
    "programDays" INTEGER NOT NULL DEFAULT 0,
    "seoTitleRu" TEXT,
    "seoTitleEn" TEXT,
    "seoDescriptionRu" TEXT,
    "seoDescriptionEn" TEXT,
    "organizerRu" TEXT,
    "organizerEn" TEXT,
    "social" JSONB,
    "domains" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exhibitor" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "descriptionRu" TEXT,
    "descriptionEn" TEXT,
    "countryRu" TEXT,
    "countryEn" TEXT,
    "cityRu" TEXT,
    "cityEn" TEXT,
    "boothNumber" TEXT,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" "ExhibitorStatus" NOT NULL DEFAULT 'EXHIBITOR',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "gallery" TEXT[],
    "social" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exhibitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExhibitorCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorCategoryRelation" (
    "exhibitorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ExhibitorCategoryRelation_pkey" PRIMARY KEY ("exhibitorId","categoryId")
);

-- CreateTable
CREATE TABLE "ProgramDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProgramDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramSession" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionRu" TEXT,
    "descriptionEn" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "hallRu" TEXT,
    "hallEn" TEXT,
    "type" "SessionType" NOT NULL DEFAULT 'LECTURE',
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "positionRu" TEXT,
    "positionEn" TEXT,
    "company" TEXT,
    "photoUrl" TEXT,
    "bioRu" TEXT,
    "bioEn" TEXT,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "excerptRu" TEXT,
    "excerptEn" TEXT,
    "contentRu" TEXT,
    "contentEn" TEXT,
    "coverImageUrl" TEXT,
    "categoryRu" TEXT,
    "categoryEn" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketProduct" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionRu" TEXT,
    "descriptionEn" TEXT,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "benefitsRu" TEXT[],
    "benefitsEn" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketOrder" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "ticketProductId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentProvider" TEXT NOT NULL DEFAULT 'yookassa',
    "paymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "ticketCode" TEXT NOT NULL,
    "qrCodeUrl" TEXT,
    "status" "TicketStatus" NOT NULL DEFAULT 'VALID',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL DEFAULT 'CONTACT',
    "company" TEXT,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "category" TEXT,
    "message" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "managerComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "type" "PartnerType" NOT NULL DEFAULT 'PARTNER',
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "photoUrl" TEXT,
    "roleRu" TEXT,
    "roleEn" TEXT,
    "descriptionRu" TEXT,
    "descriptionEn" TEXT,
    "website" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SessionSpeakers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SessionSpeakers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Exhibitor_slug_key" ON "Exhibitor"("slug");

-- CreateIndex
CREATE INDEX "Exhibitor_status_idx" ON "Exhibitor"("status");

-- CreateIndex
CREATE INDEX "Exhibitor_isPublished_idx" ON "Exhibitor"("isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "ExhibitorCategory_slug_key" ON "ExhibitorCategory"("slug");

-- CreateIndex
CREATE INDEX "ExhibitorCategoryRelation_categoryId_idx" ON "ExhibitorCategoryRelation"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramSession_slug_key" ON "ProgramSession"("slug");

-- CreateIndex
CREATE INDEX "ProgramSession_dayId_idx" ON "ProgramSession"("dayId");

-- CreateIndex
CREATE INDEX "ProgramSession_type_idx" ON "ProgramSession"("type");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_status_publishedAt_idx" ON "News"("status", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TicketProduct_slug_key" ON "TicketProduct"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TicketOrder_orderNumber_key" ON "TicketOrder"("orderNumber");

-- CreateIndex
CREATE INDEX "TicketOrder_status_idx" ON "TicketOrder"("status");

-- CreateIndex
CREATE INDEX "TicketOrder_email_idx" ON "TicketOrder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_orderId_key" ON "Ticket"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketCode_key" ON "Ticket"("ticketCode");

-- CreateIndex
CREATE INDEX "Lead_type_status_idx" ON "Lead"("type", "status");

-- CreateIndex
CREATE INDEX "Partner_type_isActive_idx" ON "Partner"("type", "isActive");

-- CreateIndex
CREATE INDEX "AuditLog_entity_idx" ON "AuditLog"("entity");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "_SessionSpeakers_B_index" ON "_SessionSpeakers"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorCategoryRelation" ADD CONSTRAINT "ExhibitorCategoryRelation_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorCategoryRelation" ADD CONSTRAINT "ExhibitorCategoryRelation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExhibitorCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramSession" ADD CONSTRAINT "ProgramSession_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "ProgramDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketOrder" ADD CONSTRAINT "TicketOrder_ticketProductId_fkey" FOREIGN KEY ("ticketProductId") REFERENCES "TicketProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "TicketOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionSpeakers" ADD CONSTRAINT "_SessionSpeakers_A_fkey" FOREIGN KEY ("A") REFERENCES "ProgramSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionSpeakers" ADD CONSTRAINT "_SessionSpeakers_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

