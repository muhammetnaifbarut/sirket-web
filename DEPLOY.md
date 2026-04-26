# 🚀 kooza — Production Deploy Rehberi

Bu rehber kooza'yı **Vercel + Supabase + Resend** üzerinde sıfırdan yayına almanı sağlar.
Her adım için tahmini süre: ⏱️ Toplam **~45 dakika**.

---

## 📋 Önkoşullar (sende olması gerekenler)

- ✅ GitHub hesabı
- ✅ Vercel hesabı (GitHub ile login)
- ✅ Supabase hesabı (GitHub ile login)
- ✅ Resend hesabı (GitHub ile login)
- ⚠️ Domain (`kooza.com.tr`) — opsiyonel, başta `*.vercel.app` ile çalışabiliriz

---

## ADIM 1️⃣ — Supabase'de PostgreSQL veritabanı kur (5 dk)

1. https://supabase.com/dashboard → **New Project**
2. Form:
   - **Name:** `kooza`
   - **Database Password:** Güçlü bir şifre belirle ve **kaydet** (ileride lazım olacak)
   - **Region:** `Frankfurt (eu-central-1)` — Türkiye'ye en yakın
   - **Pricing Plan:** Free
3. Project oluşması ~2 dk sürer
4. Açıldığında: **Settings → Database → Connection string → URI**
5. Buradan **2 farklı URL** kopyala:
   - **Connection pooling** (port 6543) → `DATABASE_URL` olacak
   - **Connection string** (port 5432) → `DIRECT_URL` olacak
6. Şifrenin yerine az önce belirlediğin şifreyi yaz (URL içinde `[YOUR-PASSWORD]` yerine)

**Örnek sonuç:**
```
DATABASE_URL=postgresql://postgres.abcde:SIFREN@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.abcde:SIFREN@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
```

---

## ADIM 2️⃣ — Resend'de email API key al (3 dk)

1. https://resend.com → **API Keys → Create API Key**
2. **Name:** `kooza-production`
3. **Permission:** `Sending access`
4. Üretilen `re_...` ile başlayan key'i **kopyala** (bir daha gösterilmeyecek)
5. Bu key `RESEND_API_KEY` olarak girilecek

> 💡 Domain doğrulamadan önce `onboarding@resend.dev` adresinden mail gönderebilirsin.
> Domain'i sonra eklersin (Resend → Domains → Add).

---

## ADIM 3️⃣ — Kodu GitHub'a yükle (5 dk)

Local terminalde (sen veya ben):

```bash
cd "C:\Workspaces\şirket_site"

# Git zaten init edilmiş — sadece commit et
git add .
git commit -m "Production-ready kooza site"

# GitHub'da yeni repo aç: https://github.com/new
#   - Repository name: kooza
#   - Private (önerilir)
#   - README/gitignore EKLEME (zaten var)
# "Create repository" sonrası gösterilen URL'i kullan:

git remote add origin git@github.com:KULLANICI_ADIN/kooza.git
git branch -M main
git push -u origin main
```

---

## ADIM 4️⃣ — Vercel'de yeni proje aç (5 dk)

1. https://vercel.com/new → **Import Git Repository**
2. GitHub'daki `kooza` repo'sunu seç → **Import**
3. **Configure Project:**
   - **Framework Preset:** Next.js (otomatik algılanır)
   - **Build Command:** `prisma generate && next build` (otomatik)
   - **Install Command:** `npm install` (otomatik, postinstall prisma generate çalıştırır)
4. **Environment Variables** sekmesinde aşağıdaki değişkenleri tek tek ekle:

| Key | Value | Açıklama |
|---|---|---|
| `DATABASE_URL` | Supabase pooler URL (port 6543) | Adım 1 |
| `DIRECT_URL` | Supabase direct URL (port 5432) | Adım 1 |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` ile üret | 32+ char rastgele |
| `NEXTAUTH_URL` | `https://kooza.vercel.app` (önce) → sonra `https://kooza.com.tr` | İlk deploy için vercel.app, domain bağladıktan sonra değiştir |
| `NEXT_PUBLIC_APP_URL` | Aynı NEXTAUTH_URL ile | OG image + sitemap için |
| `NEXT_PUBLIC_SITE_NAME` | `kooza` | |
| `RESEND_API_KEY` | Adım 2'deki `re_...` key | |
| `EMAIL_FROM` | `kooza <onboarding@resend.dev>` (domain doğrulamadan önce) | |
| `EMAIL_TO_ADMIN` | Senin admin mail adresin (formlar buraya düşecek) | |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+905xxxxxxxxx` | Senin WhatsApp |
| `ANTHROPIC_API_KEY` | Opsiyonel — chatbot/blog için | https://console.anthropic.com |
| `CRON_SECRET` | `openssl rand -hex 16` | Vercel Cron için |

5. **Deploy** butonuna bas
6. ~3-5 dakikada ilk build tamamlanır

---

## ADIM 5️⃣ — DB schema'sını Supabase'e push et (3 dk)

İlk deploy başarılı olduktan sonra **bir kerelik** kurulum:

**Yöntem A — Lokalde (önerilir):**

`.env` dosyasını geçici olarak production değerleriyle doldur:
```bash
DATABASE_URL=<Supabase pooler URL>
DIRECT_URL=<Supabase direct URL>
```

Sonra:
```bash
npx prisma db push    # Schema'yı Supabase'e gönderir
npx prisma generate   # Client'ı yeniden üret
```

**Yöntem B — Vercel CLI ile:**
```bash
npm i -g vercel
vercel link           # Local'i Vercel projesine bağla
vercel env pull       # Production env'i .env'e indir
npx prisma db push
```

> ✅ Bu adımdan sonra Supabase'in **Table Editor**'da tüm tablolar görünmeli.

---

## ADIM 6️⃣ — Içerik seed et (5 dk)

Production DB'ye site içeriğini yükle:

```bash
# .env hâlâ production değerleriyle dolu

npm run db:seed              # Admin kullanıcı + temel sayfalar
npm run db:seed:content      # 44 ayar + ticker + hero stats + müşteriler + testimonials + FAQs
npm run db:seed:sectors      # 6 sektör çözümü
```

> ⚠️ Seed bitince `.env`'i tekrar localhost değerlerine geri çevir.

---

## ADIM 7️⃣ — Admin şifresini değiştir (3 dk)

1. https://kooza.vercel.app/admin/giris
2. Default: `admin@kooza.com.tr` / seed'de tanımlı şifre
3. Giriş yap → **/admin/kullanicilar** → şifreni değiştir
4. Yeni admin oluştur, eski default'u sil

---

## ADIM 8️⃣ — Domain bağla (5 dk) — opsiyonel

### A) Domain satın al (varsa atla)
- https://www.natro.com.tr veya https://www.isimtescil.net.tr
- `kooza.com.tr` ara → ~250 TL/yıl

### B) Vercel'e bağla
1. Vercel → Project → **Settings → Domains**
2. **Add** → `kooza.com.tr`
3. Vercel sana DNS kayıtları verecek:
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
4. Domain panelinde (natro/isimtescil) DNS Yönetimi → bu kayıtları ekle
5. ~10 dk - 24 saat propagation
6. Vercel otomatik **SSL sertifikası** üretir

### C) Env güncelle
Vercel → Settings → Environment Variables:
- `NEXTAUTH_URL` → `https://kooza.com.tr`
- `NEXT_PUBLIC_APP_URL` → `https://kooza.com.tr`
- **Redeploy** butonuna bas

### D) Resend domain doğrula (email için)
1. Resend → Domains → **Add Domain** → `kooza.com.tr`
2. Verilen DNS kayıtlarını domain'e ekle (SPF, DKIM, DMARC)
3. Doğrulandıktan sonra `EMAIL_FROM` değerini güncelle:
   - `kooza <noreply@kooza.com.tr>`

---

## ADIM 9️⃣ — Google Search Console & Analytics (5 dk)

### Search Console
1. https://search.google.com/search-console → **Add Property** → URL prefix
2. `https://kooza.com.tr` ekle
3. Doğrulama: HTML tag yöntemi → kodu kopyala
4. Vercel env: `NEXT_PUBLIC_GSC_VERIFICATION` = `<verification-kod>`
5. Sitemap submit et: `https://kooza.com.tr/sitemap.xml`

### Analytics
1. https://analytics.google.com → yeni property
2. Measurement ID al (`G-XXXXXX`)
3. Admin'den ekle: `/admin/ayarlar` → `analytics_ga_id`

---

## ✅ Doğrulama Listesi

- [ ] https://kooza.com.tr açılıyor (HTTPS)
- [ ] Mobile'da düzgün görünüyor
- [ ] `/cozumler/klinik` çalışıyor
- [ ] `/dijital-olgunluk-testi` testi çalışıyor → DB'ye kayıt düşüyor
- [ ] `/iletisim` formundan mail geliyor
- [ ] `/admin/giris` çalışıyor
- [ ] `/sitemap.xml` doğru URL'ler döndürüyor
- [ ] `/api/og` PNG döndürüyor
- [ ] Google Search Console doğrulandı
- [ ] Sitemap submit edildi

---

## 🆘 Sorun Giderme

### Build hatası: `Prisma Client not generated`
→ Vercel build script'inde `prisma generate && next build` olmalı (vercel.json'da var)

### `Database connection error`
→ `DATABASE_URL` Supabase pooler URL (port 6543) olmalı, direct değil

### `NEXTAUTH_URL doesn't match`
→ Production env'de `https://kooza.com.tr` olmalı (vercel.app değil)

### Email gelmiyor
→ Resend dashboard → Logs sekmesinde hata var mı bak. Ücretsiz tier 3000/ay.

### `Function timeout` (OG image)
→ vercel.json'da `maxDuration: 30` set edili — sorun olmamalı.

---

## 📞 Destek

Sorun çıkarsa hangi adımda takıldığını söyle, beraber çözeriz.
