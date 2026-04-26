-- ═══════════════════════════════════════════════════════
-- kooza — AI Roadmap Generator tablosu
-- Supabase SQL Editor'da çalıştır
-- ═══════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "roadmap_requests" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "company" TEXT NOT NULL,
  "sector" TEXT NOT NULL,
  "employeeCount" TEXT NOT NULL,
  "monthlyRevenue" TEXT,
  "currentSystems" JSONB NOT NULL,
  "goals" TEXT NOT NULL,
  "websiteUrl" TEXT,
  "generatedReport" TEXT NOT NULL,
  "reportSent" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "roadmap_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "roadmap_requests_email_idx" ON "roadmap_requests"("email");
