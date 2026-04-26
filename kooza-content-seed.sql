-- ═══════════════════════════════════════════════════════
-- kooza — İçerik seed (sektör çözümleri + modüller + ticker + stats)
-- ═══════════════════════════════════════════════════════

-- ─── SECTOR SOLUTIONS (6 sektör) ───────────────────────
INSERT INTO "sector_solutions" (id, slug, name, tagline, "heroBadge", "heroTitle", "heroSubtitle", icon, "iconColor", "bgColor", problems, features, benefits, modules, faqs, "ctaTitle", "ctaSubtitle", "seoTitle", "seoDescription", "order", "isActive", "createdAt", "updatedAt") VALUES
('sec_klinik', 'klinik', 'Klinik & Sağlık', 'Klinik, poliklinik, diş hekimi için tam dijital çözüm.', 'Sağlık Sektörü Çözümü', E'Klinik yönetimini\nbaştan sona dijitalleştirin', 'Hasta dosyası, randevu, e-Reçete, MHRS, laboratuvar entegrasyonu, SGK provizyon — tek panelde toplayın.', 'Stethoscope', '#dc2626', '#fef2f2',
'[{"title":"Randevular telefonla","description":"Çift randevu, unutulan hatırlatma","icon":"PhoneOff"},{"title":"Hasta dosyaları kağıtta","description":"Geçmiş bilgi bulmak 5-10 dk","icon":"FileX"},{"title":"e-Reçete ayrı ekran","description":"Aynı bilgiyi 3 yere girmek","icon":"Repeat"},{"title":"SGK provizyon karışık","description":"Reddedilen faturalar geç fark ediliyor","icon":"AlertTriangle"}]'::jsonb,
'[{"title":"Online Randevu & SMS Hatırlatma","description":"Hasta web/WhatsApp''tan randevu alır","icon":"CalendarCheck"},{"title":"Dijital Hasta Dosyası","description":"Anamnez, tedavi planı, görsel — tek kart","icon":"FolderOpen"},{"title":"e-Reçete & e-Rapor","description":"Sağlık Bakanlığı entegre","icon":"Pill"},{"title":"MHRS & SGK Provizyon","description":"Otomatik provizyon, fatura takibi","icon":"ShieldCheck"},{"title":"Laboratuvar Entegrasyonu","description":"Tahlil sonuçları otomatik düşer","icon":"TestTube"},{"title":"Online Ödeme & Kasa","description":"POS, taksit takibi, e-Fatura","icon":"CreditCard"}]'::jsonb,
'[{"label":"Randevu hızı","value":"5×","description":"Telefonla 4 dk, dijitalle 45 sn"},{"label":"Boş slot","value":"-%62","description":"Otomatik hatırlatma ile"},{"label":"Aylık tasarruf","value":"40+ saat","description":"Sekreteryadan yönetime"},{"label":"Hasta memnuniyeti","value":"+%38","description":"Hızlı hizmet ile"}]'::jsonb,
'[{"name":"Randevu & Hatırlatma","description":"Online rezervasyon, SMS"},{"name":"Hasta Dosyası","description":"EHR, görsel arşiv"},{"name":"e-Reçete","description":"Sağlık Bakanlığı entegre"},{"name":"SGK Provizyon","description":"Otomatik fatura"},{"name":"Laboratuvar","description":"Sonuçlar otomatik"},{"name":"Muhasebe & Kasa","description":"e-Fatura, gelir-gider"}]'::jsonb,
'[{"question":"Mevcut hasta verilerimi taşır mısınız?","answer":"Evet. Excel veya eski yazılım — 1-3 günde taşırız."},{"question":"KVKK uyumlu mu?","answer":"Tamamen. Şifreli yedek, ISO 27001 sunucu."},{"question":"e-Reçete ayrı sistem gerekir mi?","answer":"Hayır. Tek ekrandan yazılır."},{"question":"Kullanıcı sınırı?","answer":"Pakete göre 5-50+ kullanıcı."},{"question":"Kurulum süresi?","answer":"3-7 gün, ilk ay ücretsiz destek."}]'::jsonb,
'Kliniğinizi dijitalleştirelim', '15 dk ücretsiz keşif görüşmesi alın.', 'Klinik Yazılımı | kooza', 'Klinik için randevu, hasta dosyası, e-Reçete, MHRS — tek sistemde.', 1, true, NOW(), NOW()),

('sec_restoran', 'restoran', 'Restoran & Kafe', 'Adisyon, kasa, masa yönetimi, kurye entegrasyonu.', 'Yeme-İçme Çözümü', E'Restoran ve kafenizi\nakıllı şekilde yönetin', 'Adisyon, kasa, masa düzeni, mutfak ekranı, Yemeksepeti/Getir/Trendyol entegrasyonu, sadakat — tek panelde.', 'UtensilsCrossed', '#ea580c', '#fff7ed',
'[{"title":"Adisyon defterde","description":"Ay sonu açıklar, fişsiz satış","icon":"BookX"},{"title":"Mutfak-servis karışık","description":"Yanlış sipariş, geciken yemekler","icon":"AlertCircle"},{"title":"3 platforma ayrı sipariş","description":"Yemeksepeti+Getir+Trendyol için 3 ekran","icon":"Layers"},{"title":"Stok takibi yok","description":"Servis sırasında biten malzeme","icon":"PackageX"}]'::jsonb,
'[{"title":"Adisyon (Tablet)","description":"Hızlı sipariş, masa transferi","icon":"Tablet"},{"title":"Mutfak Ekranı (KDS)","description":"Sipariş otomatik mutfağa","icon":"Monitor"},{"title":"Kurye Entegrasyonu","description":"Yemeksepeti+Getir+Trendyol tek ekran","icon":"Truck"},{"title":"Kasa & e-Fatura","description":"Z raporu, vardiya, GİB","icon":"Calculator"},{"title":"Stok & Reçete","description":"Otomatik stok düşümü","icon":"Package"},{"title":"Sadakat","description":"SMS kampanya, puan","icon":"Gift"}]'::jsonb,
'[{"label":"Sipariş hızı","value":"3×","description":"Tabletle 30 sn"},{"label":"Kasa açığı","value":"-%85","description":"Otomatik denetim"},{"label":"Kurye yönetimi","value":"Tek ekran","description":"3 platform birden"},{"label":"Stok kaybı","value":"-%40","description":"Reçete bazlı"}]'::jsonb,
'[{"name":"Adisyon","description":"Tablet/telefon"},{"name":"Mutfak Ekranı","description":"Otomatik aktarım"},{"name":"Kurye","description":"Yemeksepeti, Getir, Trendyol"},{"name":"Kasa","description":"e-Fatura, vardiya"},{"name":"Stok","description":"Reçete bazlı"},{"name":"Sadakat","description":"Puan, SMS"}]'::jsonb,
'[{"question":"Mevcut POS''umla çalışır mı?","answer":"Evet, tüm standart cihazlarla uyumlu."},{"question":"Hangi platformlar entegre?","answer":"Yemeksepeti, Getir, Trendyol Yemek, MigrosYemek."},{"question":"İnternet kesilince?","answer":"Offline çalışır, gelince senkronize."},{"question":"Çoklu şube yönetimi?","answer":"Evet, merkezi raporlama."}]'::jsonb,
'Restoranınızı dijitalleştirelim', 'Ücretsiz demo + ilk ay deneme.', 'Restoran Otomasyonu | kooza', 'Adisyon, mutfak ekranı, Yemeksepeti/Getir entegrasyonu.', 2, true, NOW(), NOW()),

('sec_market', 'market', 'Market & Perakende', 'Barkod, kasa, stok, sadakat — perakende için tam çözüm.', 'Perakende Çözümü', E'Market ve perakendenizde\nstok kayıplarına son', 'Barkod, kasa, stok, fiyat etiketi, sadakat — tek noktadan zincir yönetimi.', 'ShoppingCart', '#16a34a', '#f0fdf4',
'[{"title":"Stok takibi tahminle","description":"Aylık fiziki sayımda büyük farklar","icon":"Search"},{"title":"Etiket değişikliği saatler","description":"Kampanya başlatmak bir mesai","icon":"Tag"},{"title":"Şube karşılaştırması yok","description":"Hangi şube karlı bilinmiyor","icon":"BarChart3"},{"title":"Sadakat tutulamıyor","description":"İndirim verince geri gelmiyor","icon":"UserMinus"}]'::jsonb,
'[{"title":"Barkod & Hızlı Kasa","description":"Saniyede 5+ ürün okutma","icon":"ScanBarcode"},{"title":"Akıllı Stok","description":"Min/max, otomatik sipariş","icon":"Package"},{"title":"Etiket & Fiyat","description":"Toplu değişiklik","icon":"Tag"},{"title":"Çoklu Şube","description":"Merkezi transfer","icon":"Building"},{"title":"Sadakat Kart","description":"Puan, kampanya","icon":"CreditCard"},{"title":"Tedarikçi","description":"e-Fatura kabul","icon":"Truck"}]'::jsonb,
'[{"label":"Stok kaybı","value":"-%55","description":"Anlık takip"},{"label":"Kasa hızı","value":"2-3×","description":"Sıra erir"},{"label":"Aylık ek satış","value":"+%18","description":"Sadakat etkisi"},{"label":"Etiket değişim","value":"-%90","description":"Saatlerden dakikalara"}]'::jsonb,
'[{"name":"Kasa & Barkod","description":"Hızlı satış"},{"name":"Stok","description":"Otomatik takip"},{"name":"Etiket","description":"Toplu değişiklik"},{"name":"Çoklu Şube","description":"Karşılaştırma"},{"name":"Sadakat","description":"Puan, SMS"},{"name":"Tedarikçi","description":"e-Fatura"}]'::jsonb,
'[{"question":"Mevcut barkod cihazımla?","answer":"Evet, tüm standart cihazlarla."},{"question":"Şubeler arası transfer?","answer":"Tek tıkla irsaliye, otomatik geçer."},{"question":"e-Fatura?","answer":"GİB entegre, otomatik."},{"question":"Tedarikçi e-Fatura?","answer":"Otomatik stok ve cariye işler."}]'::jsonb,
'Marketinizi dijitalleştirelim', 'Tek şubeden zincire — büyüklüğünüze göre.', 'Market Yazılımı | kooza', 'Market, perakende için kasa, stok, sadakat, e-Fatura.', 3, true, NOW(), NOW()),

('sec_egitim', 'egitim', 'Eğitim & Kurs', 'Öğrenci, ders, sınav, veli portalı, taksit takibi.', 'Eğitim Çözümü', E'Eğitim kurumunuzu\nuçtan uca yönetin', 'Öğrenci kayıt, ders programı, online sınav, devam takibi, veli portalı, taksit — tek sistemde.', 'GraduationCap', '#4f46e5', '#eef2ff',
'[{"title":"Excel''de kayıt","description":"Ödeme takip kabusu","icon":"FileSpreadsheet"},{"title":"WhatsApp grubu","description":"Veli iletişimi kayboluyor","icon":"MessageSquareWarning"},{"title":"Sınav sonuçları geç","description":"Manuel puanlama saatler","icon":"Clock"},{"title":"Çakışmalar","description":"Eğitmen-derslik","icon":"CalendarX"}]'::jsonb,
'[{"title":"Öğrenci Kart","description":"Bilgi, taksit, devam tek profilde","icon":"Users"},{"title":"Online Sınav","description":"Soru bankası, otomatik puan","icon":"FileCheck2"},{"title":"Ders Programı","description":"Otomatik, QR yoklama","icon":"CalendarCheck"},{"title":"Veli Portalı","description":"Web + mobil takip","icon":"Smartphone"},{"title":"Taksit & Tahsilat","description":"Otomatik hatırlatma","icon":"CreditCard"},{"title":"SMS Bildirim","description":"Sınav, devamsızlık","icon":"MessageCircle"}]'::jsonb,
'[{"label":"Tahsilat oranı","value":"+%32","description":"Otomatik hatırlatma"},{"label":"Sınav değerlendirme","value":"-%95","description":"Saatlerden saniyelere"},{"label":"Veli memnuniyeti","value":"+%47","description":"Şeffaf takip"},{"label":"Yönetimsel zaman","value":"20+ saat/ay","description":"Eğitime ayrılan"}]'::jsonb,
'[{"name":"Öğrenci Kayıt","description":"Profil, dönem"},{"name":"Online Sınav","description":"Otomatik puanlama"},{"name":"Ders & Devam","description":"QR yoklama"},{"name":"Veli Portalı","description":"Web + mobil"},{"name":"Tahsilat","description":"Online ödeme"},{"name":"CRM","description":"Aday takip"}]'::jsonb,
'[{"question":"Öğrenci verilerimi taşır mısınız?","answer":"Evet. Excel veya eski yazılım."},{"question":"Online sınav nasıl?","answer":"Link/QR ile, otomatik puanlar."},{"question":"Veli portalı ücretsiz mi?","answer":"Evet, pakete dahil."},{"question":"Çoklu şube?","answer":"Evet, merkezi raporlama."}]'::jsonb,
'Eğitim kurumunuzu dijitalleştirelim', 'Ücretsiz demo + ilk ay deneme.', 'Eğitim Yönetim Sistemi | kooza', 'Dershane, kurs, anaokulu için öğrenci, sınav, veli portalı.', 4, true, NOW(), NOW()),

('sec_ik', 'ik', 'İnsan Kaynakları', 'Personel, bordro, izin, performans — tam İK çözümü.', 'İK Çözümü', E'İK süreçlerinizi\ntek panelde yönetin', 'Personel kart, bordro, izin, mesai, performans, işe alım — Excel yerine modern sistem.', 'Users', '#0891b2', '#ecfeff',
'[{"title":"Excel''de personel","description":"Sözleşme, sertifika dağınık","icon":"FolderX"},{"title":"İzin WhatsApp''ta","description":"Kim ne kadar izinli belirsiz","icon":"CalendarX"},{"title":"Bordro el ile","description":"Hata payı yüksek","icon":"Calculator"},{"title":"Performans yıllık","description":"Sübjektif, geç","icon":"TrendingDown"}]'::jsonb,
'[{"title":"Özlük Yönetimi","description":"Tüm bilgi tek dosya","icon":"IdCard"},{"title":"İzin & Mesai","description":"Online talep, PDKS","icon":"CalendarCheck"},{"title":"Bordro","description":"SGK, GV, AGİ otomatik","icon":"DollarSign"},{"title":"Performans","description":"OKR, KPI, 360°","icon":"Target"},{"title":"İşe Alım (ATS)","description":"İlan, başvuru, mülakat","icon":"UserPlus"},{"title":"Self-Servis Portal","description":"Çalışan kendi yönetir","icon":"Smartphone"}]'::jsonb,
'[{"label":"İK süreç hızı","value":"4×","description":"Otomasyonla"},{"label":"Bordro hata","value":"~%0","description":"Otomatik hesap"},{"label":"Çalışan memnuniyeti","value":"+%29","description":"Self-servis"},{"label":"İK''ya gelen talep","value":"-%55","description":"Portaldan halleder"}]'::jsonb,
'[{"name":"Özlük","description":"Tüm bilgi"},{"name":"İzin & Mesai","description":"PDKS"},{"name":"Bordro","description":"SGK otomatik"},{"name":"Performans","description":"OKR, 360°"},{"name":"İşe Alım","description":"ATS"},{"name":"Çalışan Portalı","description":"Self-servis"}]'::jsonb,
'[{"question":"Bordro programımdan veri taşır mısınız?","answer":"Evet. Logo, Mikro, Netsis."},{"question":"PDKS uyumlu mu?","answer":"ZK, Hugin, Perkotek dahil."},{"question":"Türk mevzuatı?","answer":"SGK, GV, AGİ otomatik güncellenir."},{"question":"KVKK?","answer":"Şifreli yedek, rol-bazlı erişim."}]'::jsonb,
'İK''yı dijitalleştirelim', '5 personelden 5000''e — büyüklüğünüze göre.', 'İK Yazılımı | kooza', 'KOBİ için bordro, izin, performans, self-servis.', 5, true, NOW(), NOW()),

('sec_web', 'web', 'Web Sitesi & E-Ticaret', 'Kurumsal site, e-ticaret, blog, landing page.', 'Web & Dijital Vitrin', E'Şirketinizi internette\nprofesyonelce temsil edin', 'Kurumsal site, e-ticaret, blog, landing page — modern, hızlı, SEO uyumlu.', 'Globe', '#714B67', '#f7f2f5',
'[{"title":"Eski site mobilde berbat","description":"Müşteri çıkıyor","icon":"Smartphone"},{"title":"Her değişiklik para","description":"İçerik güncellemesi gecikiyor","icon":"CreditCard"},{"title":"Büyük platformlar pahalı","description":"Komisyon, sabit ücret","icon":"ShoppingBag"},{"title":"Lead kaçıyor","description":"Form gelse haberin yok","icon":"MailX"}]'::jsonb,
'[{"title":"Modern Web Sitesi","description":"Next.js, 90+ PageSpeed","icon":"Zap"},{"title":"Admin Panel","description":"Her şey siz kontrolde","icon":"Settings"},{"title":"E-Ticaret","description":"Sepet, ödeme (Iyzico/PayTR)","icon":"ShoppingCart"},{"title":"SEO & Google","description":"Schema, sitemap, hız","icon":"Search"},{"title":"Form & Lead → CRM","description":"Otomatik bildirim","icon":"Inbox"},{"title":"Blog","description":"SEO uyumlu içerik","icon":"PenLine"}]'::jsonb,
'[{"label":"Google sıralaması","value":"+8 sıra","description":"İlk 6 ayda"},{"label":"Mobil hız","value":"90+","description":"PageSpeed"},{"label":"Form → satış","value":"+%40","description":"CRM otomasyonu"},{"label":"İçerik maliyeti","value":"-%70","description":"Kendi yönetin"}]'::jsonb,
'[{"name":"Kurumsal Site","description":"Hakkımızda, hizmet"},{"name":"Blog","description":"SEO uyumlu"},{"name":"E-Ticaret","description":"Sepet, ödeme"},{"name":"Landing Page","description":"Lead toplama"},{"name":"Form & CRM","description":"Otomatik"},{"name":"Admin Paneli","description":"Tüm kontrol"}]'::jsonb,
'[{"question":"Mevcut sitemi yenileyebilir misiniz?","answer":"Evet, içerik dahil tasarım yenileme."},{"question":"Domain ve hosting?","answer":"Tercihinize göre."},{"question":"Yıllık bakım ücreti?","answer":"Aylık sabit, sürpriz fatura yok."},{"question":"E-ticaret komisyonu?","answer":"Hayır, sadece sistem ücreti."}]'::jsonb,
'Web sitenizi yenileyelim', 'Tek sayfadan e-ticarete — ihtiyaca göre.', 'Web Sitesi & E-Ticaret | kooza', 'Modern, SEO uyumlu kurumsal web sitesi.', 6, true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- ─── SITE MODULES (12 modül) ───────────────────────────
INSERT INTO "site_modules" (id, name, slug, href, description, icon, "iconColor", "bgColor", "order", "isActive", "createdAt", "updatedAt") VALUES
('mod_web', 'Web Sitesi & E-Ticaret', 'web', '/cozumler/web', 'Kurumsal site, blog, e-ticaret, landing page', 'Globe', '#714B67', '#f7f2f5', 1, true, NOW(), NOW()),
('mod_randevu', 'Randevu Sistemi', 'randevu', '/cozumler/klinik', 'Online rezervasyon, takvim, SMS hatırlatma', 'CalendarCheck', '#2563eb', '#eff6ff', 2, true, NOW(), NOW()),
('mod_restoran', 'Restoran & Kafe', 'restoran', '/cozumler/restoran', 'Adisyon, kasa, mutfak ekranı, kurye', 'UtensilsCrossed', '#ea580c', '#fff7ed', 3, true, NOW(), NOW()),
('mod_market', 'Market & Perakende', 'market', '/cozumler/market', 'Barkod, kasa, stok, sadakat', 'ShoppingCart', '#16a34a', '#f0fdf4', 4, true, NOW(), NOW()),
('mod_egitim', 'Eğitim & Kurs', 'egitim', '/cozumler/egitim', 'Öğrenci, sınav, veli portalı', 'GraduationCap', '#4f46e5', '#eef2ff', 5, true, NOW(), NOW()),
('mod_klinik', 'Klinik & Sağlık', 'klinik', '/cozumler/klinik', 'Hasta dosyası, e-Reçete, MHRS', 'Stethoscope', '#dc2626', '#fef2f2', 6, true, NOW(), NOW()),
('mod_ik', 'İnsan Kaynakları', 'ik', '/cozumler/ik', 'Personel, bordro, izin, performans', 'Users', '#0891b2', '#ecfeff', 7, true, NOW(), NOW()),
('mod_muhasebe', 'Muhasebe & Finans', 'muhasebe', '/yazilimlar', 'e-Fatura, cari, gelir-gider', 'Calculator', '#059669', '#ecfdf5', 8, true, NOW(), NOW()),
('mod_stok', 'Stok & Depo', 'stok', '/yazilimlar', 'Çoklu depo, sayım, FIFO', 'Package', '#d97706', '#fffbeb', 9, true, NOW(), NOW()),
('mod_crm', 'CRM & Satış', 'crm', '/yazilimlar', 'Pipeline, teklif, satış otomasyon', 'UserCheck', '#db2777', '#fdf2f8', 10, true, NOW(), NOW()),
('mod_pazarlama', 'Pazarlama Otomasyon', 'pazarlama', '/yazilimlar', 'Email, SMS, WhatsApp kampanya', 'Megaphone', '#e11d48', '#fff1f2', 11, true, NOW(), NOW()),
('mod_danismanlik', 'Dijital Dönüşüm Danışmanlık', 'danismanlik', '/danismanlik', 'Süreç analizi, eğitim, destek', 'Lightbulb', '#ca8a04', '#fefce8', 12, true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- ─── HERO TICKER (10 mesaj) ────────────────────────────
INSERT INTO "hero_ticker" (id, emoji, text, "order", "isActive", "createdAt") VALUES
('tk_1', '🌐', 'Kurumsal web siteleri & e-ticaret çözümleri', 1, true, NOW()),
('tk_2', '📅', 'Randevu sistemleri — klinik, kuaför, servis için', 2, true, NOW()),
('tk_3', '🍽️', 'Restoran-kafe için adisyon, kasa, kurye', 3, true, NOW()),
('tk_4', '🛒', 'Market-perakende için kasa + stok + barkod', 4, true, NOW()),
('tk_5', '🎓', 'Eğitim kurumları için öğrenci & sınav sistemi', 5, true, NOW()),
('tk_6', '🏥', 'Klinikler için hasta dosyası + e-Reçete + MHRS', 6, true, NOW()),
('tk_7', '👥', 'İnsan Kaynakları — bordro, izin, performans', 7, true, NOW()),
('tk_8', '🧾', 'Muhasebe & e-Fatura — GİB tam uyumlu', 8, true, NOW()),
('tk_9', '📦', 'Stok & depo yönetimi — çoklu lokasyon', 9, true, NOW()),
('tk_10', '💡', 'Dijital dönüşüm danışmanlığı + teknik hizmet', 10, true, NOW())
ON CONFLICT (id) DO NOTHING;

-- ─── HERO STATS (4 istatistik) ─────────────────────────
INSERT INTO "hero_stats" (id, value, label, color, "order", "isActive", "createdAt") VALUES
('st_1', '500+', 'Aktif İşletme', '#714B67', 1, true, NOW()),
('st_2', '12', 'Sektörel Modül', '#714B67', 2, true, NOW()),
('st_3', '%98.7', 'Memnuniyet', '#714B67', 3, true, NOW()),
('st_4', '24/7', 'Türkçe Destek', '#714B67', 4, true, NOW())
ON CONFLICT (id) DO NOTHING;
