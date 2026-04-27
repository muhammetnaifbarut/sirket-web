-- ═══════════════════════════════════════════════════════
-- kooza — Sektörel Rehber İndirmeleri tablosu
-- Supabase SQL Editor'da çalıştır
-- ═══════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "guide_downloads" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "company" TEXT,
  "sector" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "guide_downloads_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "guide_downloads_email_idx" ON "guide_downloads"("email");

-- (Opsiyonel) Eski roadmap_requests tablosunu sil
DROP TABLE IF EXISTS "roadmap_requests";
