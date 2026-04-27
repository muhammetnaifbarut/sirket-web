# 🦋 kooza.tr Launch Checklist

## ✅ Tamamlananlar (otomatik)

- [x] Domain alındı (Natro, 27.04.2026)
- [x] DNS Vercel'e yönlendirildi (ns1/ns2.vercel-dns.com)
- [x] Vercel'de domain eklendi (kooza.tr + www.kooza.tr)
- [x] Site içi kodda `kooza.vercel.app` → `kooza.tr` migration
- [x] `.env` güncellendi (NEXTAUTH_URL, NEXT_PUBLIC_APP_URL)
- [x] DB settings güncellendi (site_email, site_url)
- [x] guide-download API mail içeriği güncellendi
- [x] Push + redeploy

## ⏳ DNS Yayılma Süresi

```
0-15 dk:  Türkiye'de görür (ana ISP'ler hızlı)
15-60 dk: Avrupa'da görür
1-24 saat: Dünya geneline yayılır
```

## 🔧 Sen yapacakların (kahvaltıdan sonra)

### A. Vercel Env Değişkenleri (5 dk)

Vercel Dashboard → kooza projesi → Settings → Environment Variables

Mevcut listeden **edit** ile düzelt:

| Key | Eski Değer | Yeni Değer |
|---|---|---|
| `NEXTAUTH_URL` | https://kooza.vercel.app | `https://kooza.tr` |
| `NEXT_PUBLIC_APP_URL` | https://kooza.vercel.app | `https://kooza.tr` |

İkisini de **Production + Preview + Development** olarak işaretle.

### B. Resend Mail Setup (15 dk)

1. https://resend.com/signup → Google ile gir
2. **API Keys** → Create → Name: `kooza-prod`, Permission: Sending → API key kopyala
3. Vercel env'e ekle:
   - `RESEND_API_KEY` = `re_xxxxx...`
   - `EMAIL_FROM` = `kooza <onboarding@resend.dev>` (domain doğrulanana kadar)
   - `EMAIL_TO_ADMIN` = `muhammetnaifbarut@gmail.com`
4. Vercel → Deployments → en son deploy → ⋯ → **Redeploy**

### C. Resend Domain Doğrulama (1 saat sonra, opsiyonel)

DNS yayıldıktan sonra:
1. Resend → **Domains** → **Add Domain** → `kooza.tr`
2. Verilen TXT/DKIM kayıtlarını **Vercel DNS**'e ekle:
   - Vercel → kooza projesi → Settings → Domains → kooza.tr → DNS Records
   - SPF, DKIM, DMARC kayıtları
3. ~1 saat doğrulanır
4. Sonra `EMAIL_FROM` = `kooza <noreply@kooza.tr>` yapabilirsin

### D. Linktree Güncelle (5 dk)

linktr.ee/koozatr admin paneline gir, tüm linklerde:
- `kooza.vercel.app` → `kooza.tr`

8 link var, hepsini değiştir.

### E. Instagram Bio Güncelle (2 dk)

Instagram @kooza.tr → Profili düzenle → Web sitesi alanı:
- Eski: `linktr.ee/koozatr`
- Yeni ekle veya bırak (Linktree zaten kooza.tr link veriyor)

## 🔍 Doğrulama

DNS aktif olunca test et:

```
https://kooza.tr            → Site açılır
https://www.kooza.tr        → kooza.tr'ye redirect
https://kooza.tr/admin/giris → Admin paneli
https://kooza.tr/sitemap.xml → Sitemap
https://kooza.tr/robots.txt  → Robots
```

## 🚀 Sonra ne yapılır?

### F. Google Search Console
1. https://search.google.com/search-console
2. Add Property → `kooza.tr` (URL prefix değil, **Domain** seç)
3. DNS doğrulama kodunu Vercel DNS'e TXT olarak ekle
4. Sitemap submit: `https://kooza.tr/sitemap.xml`

### G. Bing Webmaster Tools
1. https://www.bing.com/webmasters
2. Aynı süreç (sitemap submit)

### H. Analytics
- Google Analytics 4 hesabı aç
- Tracking ID: `G-XXXXX`
- Vercel env: `NEXT_PUBLIC_GA_ID` ekle
