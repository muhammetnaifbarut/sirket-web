-- ═══════════════════════════════════════════════════════
-- kooza — Admin user + temel ayarlar
-- Şifre: kooza123 (bcrypt hash)
-- E-mail: admin@kooza.com.tr
-- ═══════════════════════════════════════════════════════

-- Admin user
INSERT INTO "users" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  'admin_seed_001',
  'admin@kooza.com.tr',
  'kooza Admin',
  '$2a$10$8fYmC9uvhTilmHkLK1rZWuDV7OWZJVrz5xsofIf5WLGZ1JlTrtnxK',
  'SUPER_ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- Temel site ayarları
INSERT INTO "settings" (id, key, value, "group", "createdAt", "updatedAt") VALUES
('s_site_name', 'site_name', 'kooza', 'general', NOW(), NOW()),
('s_site_tagline', 'site_tagline', 'Türkiye''nin yeni nesil işletme platformu', 'general', NOW(), NOW()),
('s_site_description', 'site_description', 'Web sitesi, sektörel otomasyon, İK, CRM, muhasebe ve dijital dönüşüm danışmanlığı — tek partnerden.', 'general', NOW(), NOW()),
('s_hero_badge', 'hero_badge', 'Dijital dönüşüm + sektörel otomasyon + web çözümleri', 'hero', NOW(), NOW()),
('s_hero_title', 'hero_title', E'Şirketinizi uçtan uca\ndijitalleştiriyoruz', 'hero', NOW(), NOW()),
('s_hero_subtitle', 'hero_subtitle', 'Web sitesi, sektörel otomasyon sistemleri, insan kaynakları, muhasebe, CRM, pazarlama ve dijital dönüşüm danışmanlığı — tek partnerden.', 'hero', NOW(), NOW()),
('s_hero_cta_label', 'hero_cta_label', 'Ücretsiz Dijital Dönüşüm Görüşmesi', 'hero', NOW(), NOW()),
('s_hero_cta_url', 'hero_cta_url', '/demo', 'hero', NOW(), NOW()),
('s_hero_secondary_label', 'hero_secondary_label', 'Sektörel Çözümlere Bak', 'hero', NOW(), NOW()),
('s_hero_secondary_url', 'hero_secondary_url', '/cozumler', 'hero', NOW(), NOW()),
('s_site_email', 'site_email', 'muhammetnaifbarut@gmail.com', 'contact', NOW(), NOW()),
('s_site_phone', 'site_phone', '+90 541 414 29 42', 'contact', NOW(), NOW()),
('s_seo_default_title', 'seo_default_title', 'kooza — Türkiye''nin yeni nesil işletme platformu', 'seo', NOW(), NOW()),
('s_seo_default_description', 'seo_default_description', 'Şirketler için web tasarım, sektörel otomasyon sistemleri (randevu, restoran, market, eğitim, klinik), insan kaynakları, CRM, muhasebe ve dijital dönüşüm danışmanlığı.', 'seo', NOW(), NOW()),
('s_footer_text', 'footer_text', '© 2026 kooza. Türkiye''de tasarlandı, dünyada büyütülüyor.', 'footer', NOW(), NOW())
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, "updatedAt" = NOW();

-- Tema ayarları
INSERT INTO "theme_settings" (id, "primaryColor", "secondaryColor", "accentColor", "darkMode", "createdAt", "updatedAt")
VALUES ('default', '#714B67', '#875A7B', '#714B67', false, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  "primaryColor" = EXCLUDED."primaryColor",
  "secondaryColor" = EXCLUDED."secondaryColor",
  "accentColor" = EXCLUDED."accentColor",
  "updatedAt" = NOW();

-- Header menüsü
INSERT INTO "menu_items" (id, label, url, "order", location, "isActive", "createdAt", "updatedAt") VALUES
('m_cozumler', 'Çözümler', '/cozumler', 1, 'header', true, NOW(), NOW()),
('m_yazilimlar', 'Yazılımlar', '/yazilimlar', 2, 'header', true, NOW(), NOW()),
('m_danismanlik', 'Danışmanlık', '/danismanlik', 3, 'header', true, NOW(), NOW()),
('m_hakkimizda', 'Hakkımızda', '/hakkimizda', 4, 'header', true, NOW(), NOW()),
('m_blog', 'Blog', '/blog', 5, 'header', true, NOW(), NOW()),
('m_iletisim', 'İletişim', '/iletisim', 6, 'header', true, NOW(), NOW()),
('m_demo', 'Demo Talep Et', '/demo', 7, 'header', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
