# kooza Brand & Voice Guide

> İç kullanım için marka rehberi. Yeni içerik yazarken, tasarım yaparken, müşteriyle konuşurken bu rehbere bak.

---

## 1. Marka kimliği

### Bir cümlede kooza
**KOBİ'lerin yazılım ve danışmanlık partneri. Tek platformda her şey.**

### Marka karakter (3 sıfat)
- **Akıllı** (uzman ama gösterişsiz)
- **Sıcak** (samimi, esnafa yakın)
- **Net** (karmaşık değil — hızlı, doğru, sade)

### Hedef kitle
- KOBİ sahibi (5-50 çalışan)
- Doktor, kuaför, mağaza, restoran, lojistik, eğitim sektörü
- Yaş 30-55, "yazılım derdine son verme" arayışında

---

## 2. Tone of voice

### Konuşma şekli — "Akıllı dost"
Stripe'ın ciddiliği + Notion'un samimiliği arası.

| Yapma ❌ | Yap ✅ |
|---|---|
| "Müşteri ilişkileri yönetimi sistemleri" | "Müşterini takip et" |
| "Dijital transformasyon stratejisi" | "Dijitale geç" |
| "Lütfen aşağıdaki formu doldurarak..." | "Demo iste, 10 dakika sonra ararız" |
| "Solüsyonlarımız ile..." | "Çözümümüz şu:" |
| "Sektör lideri SaaS platformu" | "Türkiye'nin yeni nesil işletme platformu" |
| Pasif ses | Aktif ses |
| Uzun paragraflar | 2-3 cümle, sonra punto |

### Türkçe kuralları
- **"Sen" mi "Siz" mi?** → İlk temasta **siz**, ürünü kullanırken **sen**
  - Pazarlama: "İşletmenizin tüm yazılımları"
  - Ürün içi UI: "Stoklarını takip et"
- **"Türkçe karakter" zorunlu**: ı, ş, ğ, ü, ö, ç — asla "i, s, g..." yapma
- **Sayılar:** ₺2.500 (binlik nokta), %98 (yüzde önce), 5 dakika (Türkçe)

### Yazma checklist (her cümle için)
- [ ] **8 kelimenin altında mı?** Daha kısa olabilir mi?
- [ ] **Aksiyon fiili var mı?** ("yapar", "çözer", "büyütür" — "olabilir, mevcuttur" yerine)
- [ ] **Müşteri "ne kazandığım" anlıyor mu?**
- [ ] **Akademik kelime yok mu?** ("optimizasyon", "implementasyon" — "iyileştirme", "kurulum")

---

## 3. Görsel kimlik

### Renkler

| Token | Hex | Kullanım |
|---|---|---|
| `purple-600` | `#714B67` | Ana marka — CTA, link, vurgu |
| `purple-500` | `#875A7B` | Hover state, accent |
| `purple-50`  | `#f7f2f5` | Hafif vurgu zemini, badge bg |
| `success-500` | `#10b981` | Başarı, onay (✓) |
| `warning-500` | `#f59e0b` | Uyarı, beklemede |
| `danger-500` | `#ef4444` | Hata, sil |
| `info-500` | `#3b82f6` | Bilgi mesajı |
| `gray-900` | `#0f172a` | Başlık, ana metin |
| `gray-600` | `#475569` | Body metin |
| `gray-400` | `#94a3b8` | İkincil metin, placeholder |

**Gradient kullanımı:** Sadece DemoCtaSection'da, başka yerde **YOK**.

### Tipografi (Lato)
- **Display** (60px) — Hero başlık, sadece ana sayfada bir kez
- **H1** (48px) — Sayfa başlıkları
- **H2** (36px) — Section başlıkları
- **H3** (28px) — Subsection başlıkları
- **H4** (20px) — Card title, küçük başlık
- **Body** (16px) — Normal metin
- **Small** (14px) — İkincil metin, etiket
- **Caption** (12px) — Tarih, footer, meta

### Border radius (sadece 3 boyut)
| Token | Px | Kullanım |
|---|---|---|
| `rounded-md` | 6px | Badge, tag, küçük chip |
| `rounded-xl` | 12px | Buton, input, link chip, küçük kart |
| `rounded-2xl` | 16px | Kart, modal, panel, hero blok |

### Shadow (custom tokens)
| Token | Kullanım |
|---|---|
| `shadow-soft` | Default kart resting state |
| `shadow-card` | Hafif vurgulu kart |
| `shadow-cardHover` | Kart hover |
| `shadow-elevated` | Modal, dropdown |
| `shadow-button` | Primary CTA buton |

### Hover state lexicon (TEK STANDARD)
| Element | Hover |
|---|---|
| **Card** | `hover:-translate-y-1 hover:shadow-cardHover` (1px yukarı + soft shadow) |
| **Button (primary)** | `hover:bg-purple-700` (bir ton koyu) |
| **Button (secondary)** | `hover:border-purple-300 hover:bg-purple-50` |
| **Link** | `hover:text-purple-700` (mor) |
| **Icon button** | `hover:bg-gray-100` |

---

## 4. CTA hiyerarşisi

### Tek primary CTA mesajı (her yerde aynı)
> **"Ücretsiz Başla"**

Bu mesaj **değişmez**. "Demo Talep Et", "Hemen Dene", "Şimdi Başla" → **HEPSİ "Ücretsiz Başla"**.

İstisna sadece DemoCtaSection: "Ücretsiz Demo Talep Et" (uzun versiyon).

### Buton stilleri (sadece 3 var)

```html
<!-- 1. PRIMARY -->
<button class="px-7 py-3.5 rounded-xl bg-purple-600 text-white font-semibold
               hover:bg-purple-700 shadow-button transition">
  Ücretsiz Başla
</button>

<!-- 2. SECONDARY -->
<button class="px-7 py-3.5 rounded-xl bg-white border-2 border-gray-200
               text-gray-900 font-semibold
               hover:border-purple-300 hover:bg-purple-50 transition">
  Ürünleri İncele
</button>

<!-- 3. TERTIARY (text link) -->
<a class="text-purple-700 font-semibold hover:underline">
  Detayları Gör →
</a>
```

---

## 5. İllüstrasyon / İkon

**Tek ikon sistemi:** **Lucide outline** (her yerde aynı stil).

- `stroke-width: 2` (default)
- Boyutlar: `w-4 h-4`, `w-5 h-5`, `w-6 h-6` (3 boyut yeter)
- Renk: `text-current` (parent'tan al)

ASLA karıştırma:
- ❌ Heroicons + Lucide
- ❌ Solid + outline aynı yerde
- ❌ Custom SVG + library icon yan yana

---

## 6. Yazma örnekleri

### ❌ Yanlış (kurumsal-akademik)
> "Şirketimiz, müşterilerimize sektörümüzde lider konumdaki yenilikçi solüsyonlar sunmaktadır. Profesyonel ekibimiz tarafından geliştirilen sistemlerimiz, iş süreçlerinizi optimize etmek için tasarlanmıştır."

### ✅ Doğru (kooza tonu)
> "İşletmenin tüm yazılımları, tek platformda. Randevudan stoka, CRM'den finansa — her şey aynı yerde. 5 dakikada kur, hemen başla."

---

## 7. Iletişim & Müşteri

### E-posta tonu
> Merhaba Ahmet,
> 
> Demo talebin için teşekkürler. Yarın saat 10'da seni arayacağız.
> Hazır olmana gerek yok — sadece 15 dakikan yetiyor.
> 
> Sorularını şimdiden yazabilirsin: info@kooza.com.tr
> 
> Hoşça kal,
> kooza ekibi

### WhatsApp / Chat tonu
> Selam! Ben kooza asistanı 👋
> Sana nasıl yardım edebilirim?

### Hata mesajı
> Bir şey yanlış gitti — tekrar deneyebilir misin?
> Sorun devam ederse: info@kooza.com.tr

---

## 8. Yapma listesi

❌ "Tıklayınız", "Lütfen bekleyiniz" — 19. yüzyıl Türkçesi
❌ "..%100 müşteri memnuniyeti" — saçma
❌ Emoji yağmuru — 1-2 yerde tamam, başlıkta hayır
❌ "Bizimle iletişime geçin" — "Bize yaz" yeter
❌ Satır içi link `daha fazla bilgi için tıklayın` — link kelimesi anlamlı olmalı
❌ Capslock başlıklar — bağırma
❌ Ünlem işareti her cümlede — ciddi değil

---

## 9. Marka verisi (referans)

| | |
|---|---|
| **Kuruluş yılı** | 2024 |
| **Kurucu** | Dr. Muhammet Naif BARUT |
| **Slogan** | İşletmenin tüm yazılımları, tek platformda. |
| **Kurumsal renk** | `#714B67` (Mauve) |
| **Font** | Lato |
| **Logo** | Çift-O mark + "kooza" wordmark |
| **Domain** | kooza.com.tr (alındıktan sonra) |
| **E-posta** | info@kooza.com.tr |

---

## 10. Bu rehber nasıl güncellenir?

1. Yeni karar alındığında bu dosya güncellenir
2. Tüm tasarım değişikliği bu rehbere uygun olmalı
3. Şüphedeysen "kooza tonu mu?" diye sor — net değilse buraya bak

---

**Son güncelleme:** 26 Nisan 2026
**Versiyon:** 1.0
