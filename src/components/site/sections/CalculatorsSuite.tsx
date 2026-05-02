'use client'

import { useState } from 'react'

const TABS = [
  { id: 'sgk', name: '👥 SGK Bordro 2026', cat: 'İK' },
  { id: 'kidem', name: '💼 Kıdem Tazminatı', cat: 'İK' },
  { id: 'izin', name: '🏖️ Yıllık İzin', cat: 'İK' },
  { id: 'kdv', name: '🧾 KDV', cat: 'Vergi' },
  { id: 'stopaj', name: '📜 Stopaj', cat: 'Vergi' },
  { id: 'aidat', name: '🏘️ Aidat', cat: 'Sektörel' },
  { id: 'komisyon', name: '🏠 Emlak Komisyon', cat: 'Sektörel' },
  { id: 'hakedis', name: '🏗️ Hakediş', cat: 'Sektörel' },
  { id: 'adisyon', name: '🍽️ Adisyon Bölme', cat: 'Sektörel' },
  { id: 'mrr', name: '💰 SaaS MRR/ARR', cat: 'Finans' },
]

const TRY = (n: number) => `${Math.round(n).toLocaleString('tr-TR')} ₺`

export default function CalculatorsSuite() {
  const [activeTab, setActiveTab] = useState('sgk')

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                activeTab === t.id
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Calculator content */}
        <div className="max-w-3xl mx-auto">
          {activeTab === 'sgk' && <SGKCalculator />}
          {activeTab === 'kidem' && <KidemCalculator />}
          {activeTab === 'izin' && <IzinCalculator />}
          {activeTab === 'kdv' && <KDVCalculator />}
          {activeTab === 'stopaj' && <StopajCalculator />}
          {activeTab === 'aidat' && <AidatCalculator />}
          {activeTab === 'komisyon' && <KomisyonCalculator />}
          {activeTab === 'hakedis' && <HakedisCalculator />}
          {activeTab === 'adisyon' && <AdisyonCalculator />}
          {activeTab === 'mrr' && <MRRCalculator />}
        </div>

        <p className="text-center text-xs text-gray-500 mt-12 max-w-3xl mx-auto leading-relaxed">
          ⚠️ Bu hesaplayıcılar genel bilgi içindir. Kesin sonuç için Mali Müşaviriniz veya
          <a href="/kayit?product=ik" className="text-purple-700 hover:underline mx-1">kooza İK</a>
          /
          <a href="/kayit?product=muhasebe" className="text-purple-700 hover:underline mx-1">kooza Muhasebe</a>
          kullanın. Sayfa hesabınızda hiçbir veri saklanmaz, kayıt istenmez.
        </p>
      </div>
    </section>
  )
}

// ─── SGK Bordro 2026 ────────────────────────────────────────
function SGKCalculator() {
  const [brut, setBrut] = useState(35000)
  const [evli, setEvli] = useState(false)
  const [cocuk, setCocuk] = useState(0)

  // 2026 SGK oranları (varsayılan)
  const sgkIsci = brut * 0.14
  const issizlikIsci = brut * 0.01
  const sgkMatrahi = brut - sgkIsci - issizlikIsci

  // Asgari ücret istisnası 2026 (yaklaşık 26.005 ₺ varsayalım)
  const asgariUcret = 26005
  const istisnaTutari = Math.min(brut, asgariUcret)

  // Gelir vergisi 2026 dilimleri (örnek)
  const matrahHariç = sgkMatrahi - (istisnaTutari * 0.85) // gelir vergisi istisnası
  let gelirVergisi = 0
  if (matrahHariç > 0) {
    if (matrahHariç <= 110000 / 12) gelirVergisi = matrahHariç * 0.15
    else if (matrahHariç <= 230000 / 12) gelirVergisi = (110000 / 12) * 0.15 + (matrahHariç - 110000 / 12) * 0.20
    else gelirVergisi = (110000 / 12) * 0.15 + (120000 / 12) * 0.20 + (matrahHariç - 230000 / 12) * 0.27
  }

  const damga = brut * 0.00759
  const damgaIstisnasi = istisnaTutari * 0.00759
  const damgaNet = Math.max(0, damga - damgaIstisnasi)

  const net = brut - sgkIsci - issizlikIsci - gelirVergisi - damgaNet

  // İşveren maliyeti
  const sgkIsveren = brut * 0.205
  const issizlikIsveren = brut * 0.02
  const isverenMaliyeti = brut + sgkIsveren + issizlikIsveren

  return (
    <CalcCard title="SGK Bordro Hesaplayıcı 2026" emoji="👥" subtitle="Brüt → Net + İşveren Maliyeti">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <NumInput label="Brüt Maaş (₺/ay)" value={brut} onChange={setBrut} step={1000} min={5000} />
        <SelectInput label="Medeni Durum" value={evli ? 'evli' : 'bekar'} onChange={(v) => setEvli(v === 'evli')} options={[['bekar', 'Bekar'], ['evli', 'Evli']]} />
        <NumInput label="Çocuk Sayısı" value={cocuk} onChange={setCocuk} step={1} min={0} max={6} />
      </div>

      <Result>
        <Row label="Brüt Maaş" value={TRY(brut)} positive />
        <Row label="− SGK İşçi (%14)" value={TRY(sgkIsci)} sub />
        <Row label="− İşsizlik İşçi (%1)" value={TRY(issizlikIsci)} sub />
        <Row label="− Gelir Vergisi" value={TRY(gelirVergisi)} sub />
        <Row label="− Damga Vergisi" value={TRY(damgaNet)} sub />
        <Row label="✅ Net Maaş" value={TRY(net)} highlight />
        <hr className="my-3" />
        <Row label="+ SGK İşveren (%20.5)" value={TRY(sgkIsveren)} sub muted />
        <Row label="+ İşsizlik İşveren (%2)" value={TRY(issizlikIsveren)} sub muted />
        <Row label="📊 İşveren Toplam Maliyet" value={TRY(isverenMaliyeti)} highlight muted />
      </Result>

      <UpsellBanner emoji="👥" product="kooza İK" desc="Bordro her ay otomatik üretilir, banka talimatı + SGK e-bildirge dahil" url="/kayit?product=ik&plan=baslangic" />
    </CalcCard>
  )
}

// ─── Kıdem Tazminatı ─────────────────────────────────────────
function KidemCalculator() {
  const [brut, setBrut] = useState(35000)
  const [yil, setYil] = useState(5)
  const [ay, setAy] = useState(0)

  // 2026 kıdem tavanı (varsayalım)
  const tavan = 41828
  const kidemMatrahi = Math.min(brut, tavan)

  const kidemTazminati = kidemMatrahi * (yil + ay / 12)
  const damga = kidemTazminati * 0.00759
  const kidemNet = kidemTazminati - damga

  // İhbar tazminatı
  let ihbarHafta = 2
  if (yil >= 0.5) ihbarHafta = 4
  if (yil >= 1.5) ihbarHafta = 6
  if (yil >= 3) ihbarHafta = 8
  const ihbarTazminati = (brut / 30) * (ihbarHafta * 7)

  return (
    <CalcCard title="Kıdem & İhbar Tazminatı" emoji="💼" subtitle="2026 kıdem tavanı: 41.828 ₺">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <NumInput label="Son Brüt Maaş (₺)" value={brut} onChange={setBrut} step={1000} min={5000} />
        <NumInput label="Çalışma Süresi (Yıl)" value={yil} onChange={setYil} step={1} min={0} max={50} />
        <NumInput label="Ek Ay" value={ay} onChange={setAy} step={1} min={0} max={11} />
      </div>

      <Result>
        <Row label="Kıdem Matrahı (tavan ile)" value={TRY(kidemMatrahi)} sub />
        <Row label="Kıdem Süresi" value={`${yil} yıl ${ay} ay`} sub />
        <Row label="− Damga Vergisi" value={TRY(damga)} sub />
        <Row label="✅ Kıdem Tazminatı (Net)" value={TRY(kidemNet)} highlight />
        <hr className="my-3" />
        <Row label="📅 İhbar Süresi" value={`${ihbarHafta} hafta`} sub muted />
        <Row label="✅ İhbar Tazminatı" value={TRY(ihbarTazminati)} highlight muted />
        <hr className="my-3" />
        <Row label="💰 TOPLAM (Kıdem + İhbar)" value={TRY(kidemNet + ihbarTazminati)} highlight />
      </Result>

      <UpsellBanner emoji="👥" product="kooza İK" desc="Personel çıkışında otomatik kıdem hesabı + bordro entegre" url="/kayit?product=ik&plan=baslangic" />
    </CalcCard>
  )
}

// ─── Yıllık İzin ─────────────────────────────────────────────
function IzinCalculator() {
  const [yil, setYil] = useState(3)

  let gun = 14
  if (yil >= 5) gun = 20
  if (yil >= 15) gun = 26

  return (
    <CalcCard title="Yıllık Ücretli İzin Hesaplayıcı" emoji="🏖️" subtitle="İş Kanunu m.53 - 2026">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <NumInput label="Çalışma Süresi (Yıl)" value={yil} onChange={setYil} step={1} min={0} max={50} />
      </div>

      <Result>
        <Row label="✅ Yıllık İzin Hakkı" value={`${gun} gün`} highlight />
        <div className="text-xs text-gray-500 mt-3 leading-relaxed">
          📖 İş Kanunu&apos;na göre:<br/>
          • <strong>1-5 yıl:</strong> 14 gün<br/>
          • <strong>5-15 yıl:</strong> 20 gün<br/>
          • <strong>15+ yıl:</strong> 26 gün<br/>
          <em>18 yaş altı ve 50+ yaş için minimum 20 gün.</em>
        </div>
      </Result>

      <UpsellBanner emoji="👥" product="kooza İK" desc="Çalışanların izin bakiyesi otomatik takip edilir, uyarı verilir" url="/kayit?product=ik&plan=baslangic" />
    </CalcCard>
  )
}

// ─── KDV ─────────────────────────────────────────────────────
function KDVCalculator() {
  const [tutar, setTutar] = useState(1000)
  const [oran, setOran] = useState(20)
  const [mode, setMode] = useState<'haricMode' | 'dahilMode'>('haricMode')

  const kdvOrani = oran / 100
  let kdvTutari = 0
  let netTutar = 0
  let bruTutar = 0

  if (mode === 'haricMode') {
    netTutar = tutar
    kdvTutari = tutar * kdvOrani
    bruTutar = tutar + kdvTutari
  } else {
    bruTutar = tutar
    netTutar = tutar / (1 + kdvOrani)
    kdvTutari = tutar - netTutar
  }

  return (
    <CalcCard title="KDV Hesaplayıcı" emoji="🧾" subtitle="2026 oranları: %1, %10, %20">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <NumInput label="Tutar (₺)" value={tutar} onChange={setTutar} step={100} min={1} />
        <SelectInput label="KDV Oranı" value={String(oran)} onChange={(v) => setOran(Number(v))} options={[['1', '%1 (Gıda, kitap)'], ['10', '%10 (Bazı hizmetler)'], ['20', '%20 (Genel)']]} />
        <SelectInput label="Hesap Türü" value={mode} onChange={(v) => setMode(v as any)} options={[['haricMode', 'KDV Hariç → Dahil'], ['dahilMode', 'KDV Dahil → Hariç']]} />
      </div>

      <Result>
        <Row label="Net Tutar (KDV Hariç)" value={TRY(netTutar)} sub />
        <Row label={`+ KDV (%${oran})`} value={TRY(kdvTutari)} sub />
        <Row label="✅ Brüt Tutar (KDV Dahil)" value={TRY(bruTutar)} highlight />
      </Result>

      <UpsellBanner emoji="💰" product="kooza Muhasebe" desc="e-Fatura otomatik kesilir, KDV beyanname GİB'e gider" url="/kayit?product=muhasebe&plan=baslangic" />
    </CalcCard>
  )
}

// ─── Stopaj ──────────────────────────────────────────────────
function StopajCalculator() {
  const [tutar, setTutar] = useState(10000)
  const [tip, setTip] = useState('kira')

  const oranlar: Record<string, { ad: string; oran: number }> = {
    kira: { ad: 'Kira (Stopaj)', oran: 0.20 },
    serbest: { ad: 'Serbest Meslek', oran: 0.20 },
    telif: { ad: 'Telif Hakkı', oran: 0.17 },
    avukat: { ad: 'Avukatlık', oran: 0.20 },
  }

  const seçili = oranlar[tip]
  const stopaj = tutar * seçili.oran
  const net = tutar - stopaj

  return (
    <CalcCard title="Stopaj Hesaplayıcı" emoji="📜" subtitle="Kira, serbest meslek, telif">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <NumInput label="Brüt Tutar (₺)" value={tutar} onChange={setTutar} step={500} min={1} />
        <SelectInput label="Stopaj Türü" value={tip} onChange={setTip} options={Object.entries(oranlar).map(([k, v]) => [k, v.ad] as [string, string])} />
      </div>

      <Result>
        <Row label="Brüt Tutar" value={TRY(tutar)} positive />
        <Row label={`− Stopaj (%${seçili.oran * 100})`} value={TRY(stopaj)} sub />
        <Row label="✅ Net Ödenecek Tutar" value={TRY(net)} highlight />
      </Result>
    </CalcCard>
  )
}

// ─── Aidat ──────────────────────────────────────────────────
function AidatCalculator() {
  const [m2, setM2] = useState(120)
  const [birim, setBirim] = useState(15)
  const [aidat, setAidat] = useState(750)
  const [mode, setMode] = useState<'m2' | 'sabit'>('m2')

  const sonuc = mode === 'm2' ? m2 * birim : aidat

  return (
    <CalcCard title="Aidat Hesaplayıcı" emoji="🏘️" subtitle="Site/apartman aidat hesabı">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <SelectInput label="Hesap Modu" value={mode} onChange={(v) => setMode(v as any)} options={[['m2', 'm² × birim fiyat'], ['sabit', 'Sabit aidat']]} />
        {mode === 'm2' ? (
          <>
            <NumInput label="Daire m²" value={m2} onChange={setM2} step={10} min={20} />
            <NumInput label="m² Başına ₺" value={birim} onChange={setBirim} step={1} min={1} />
          </>
        ) : (
          <NumInput label="Sabit Aylık Aidat (₺)" value={aidat} onChange={setAidat} step={50} min={1} />
        )}
      </div>

      <Result>
        <Row label="Aylık Aidat" value={TRY(sonuc)} highlight />
        <Row label="Yıllık Toplam" value={TRY(sonuc * 12)} sub />
      </Result>

      <UpsellBanner emoji="🏘️" product="kooza Mesken" desc="Aidat otomatik tahsilat + WhatsApp hatırlatma + raporlama" url="/kayit?product=mesken&plan=baslangic" />
    </CalcCard>
  )
}

// ─── Emlak Komisyonu ─────────────────────────────────────────
function KomisyonCalculator() {
  const [tutar, setTutar] = useState(5000000)
  const [tip, setTip] = useState<'satis' | 'kiralama'>('satis')
  const [oran, setOran] = useState(2)

  const komisyonTutar = tip === 'satis' ? (tutar * oran) / 100 : tutar
  const kdv = komisyonTutar * 0.20
  const toplam = komisyonTutar + kdv

  return (
    <CalcCard title="Emlak Komisyon Hesaplayıcı" emoji="🏠" subtitle="Satış veya kiralama">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <SelectInput label="İşlem Türü" value={tip} onChange={(v) => setTip(v as any)} options={[['satis', 'Satış'], ['kiralama', 'Kiralama']]} />
        <NumInput label={tip === 'satis' ? 'Satış Bedeli (₺)' : 'Aylık Kira (₺)'} value={tutar} onChange={setTutar} step={tip === 'satis' ? 100000 : 1000} min={1} />
        {tip === 'satis' && (
          <NumInput label="Komisyon (%)" value={oran} onChange={setOran} step={0.5} min={0} max={10} />
        )}
      </div>

      <Result>
        {tip === 'satis' ? (
          <>
            <Row label="Satış Bedeli" value={TRY(tutar)} sub />
            <Row label={`Komisyon (%${oran})`} value={TRY(komisyonTutar)} sub />
          </>
        ) : (
          <Row label="Aylık Kira (1 ay komisyon)" value={TRY(tutar)} sub />
        )}
        <Row label="+ KDV (%20)" value={TRY(kdv)} sub />
        <Row label="✅ Toplam Komisyon (KDV Dahil)" value={TRY(toplam)} highlight />
      </Result>

      <UpsellBanner emoji="🏠" product="kooza Emlak" desc="Komisyon paylaşımı + e-fatura + AI fiyat tahmini" url="/kayit?product=emlak&plan=baslangic" />
    </CalcCard>
  )
}

// ─── Hakediş ─────────────────────────────────────────────────
function HakedisCalculator() {
  const [sozlesme, setSozlesme] = useState(2000000)
  const [tamamlanan, setTamamlanan] = useState(40)
  const [oncekiHakedis, setOncekiHakedis] = useState(500000)

  const buAyHakedis = (sozlesme * tamamlanan) / 100 - oncekiHakedis
  const kesinti = buAyHakedis * 0.05 // teminat
  const stopaj = buAyHakedis * 0.03  // stopaj
  const odenecek = buAyHakedis - kesinti - stopaj
  const kdv = buAyHakedis * 0.20
  const odenecekKDVli = odenecek + kdv

  return (
    <CalcCard title="Müteahhit/Taşeron Hakediş Hesabı" emoji="🏗️" subtitle="Hakediş, kesinti, stopaj, KDV">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <NumInput label="Sözleşme Bedeli (₺)" value={sozlesme} onChange={setSozlesme} step={100000} min={1} />
        <NumInput label="Tamamlanan İş (%)" value={tamamlanan} onChange={setTamamlanan} step={5} min={0} max={100} />
        <NumInput label="Önceki Hakedişler (₺)" value={oncekiHakedis} onChange={setOncekiHakedis} step={50000} min={0} />
      </div>

      <Result>
        <Row label={`Toplam Tamamlanan (%${tamamlanan})`} value={TRY((sozlesme * tamamlanan) / 100)} sub />
        <Row label="− Önceki Hakedişler" value={TRY(oncekiHakedis)} sub />
        <Row label="Bu Hakediş Bedeli" value={TRY(buAyHakedis)} sub />
        <Row label="− Teminat Kesintisi (%5)" value={TRY(kesinti)} sub />
        <Row label="− Stopaj (%3)" value={TRY(stopaj)} sub />
        <Row label="✅ Net Ödenecek" value={TRY(odenecek)} highlight />
        <hr className="my-3" />
        <Row label="+ KDV (%20)" value={TRY(kdv)} sub muted />
        <Row label="📊 Toplam Fatura (KDV Dahil)" value={TRY(odenecekKDVli)} highlight muted />
      </Result>

      <UpsellBanner emoji="🏗️" product="kooza İnşaat" desc="Hakediş, taşeron ödeme, malzeme stoğu otomatik takip" url="/kayit?product=insaat&plan=baslangic" />
    </CalcCard>
  )
}

// ─── Adisyon Bölme ───────────────────────────────────────────
function AdisyonCalculator() {
  const [toplam, setToplam] = useState(2400)
  const [kisi, setKisi] = useState(4)
  const [servis, setServis] = useState(10)
  const [tip, setTip] = useState(0)

  const servisTutar = (toplam * servis) / 100
  const tipTutar = (toplam * tip) / 100
  const grandTotal = toplam + servisTutar + tipTutar
  const kisiBasi = grandTotal / kisi

  return (
    <CalcCard title="Restoran Adisyon Bölme" emoji="🍽️" subtitle="Eşit pay + servis + bahşiş">
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <NumInput label="Toplam Adisyon (₺)" value={toplam} onChange={setToplam} step={50} min={1} />
        <NumInput label="Kişi Sayısı" value={kisi} onChange={setKisi} step={1} min={1} max={50} />
        <NumInput label="Servis (%)" value={servis} onChange={setServis} step={5} min={0} max={20} />
        <NumInput label="Bahşiş (%)" value={tip} onChange={setTip} step={5} min={0} max={30} />
      </div>

      <Result>
        <Row label="Adisyon" value={TRY(toplam)} sub />
        <Row label={`+ Servis (%${servis})`} value={TRY(servisTutar)} sub />
        <Row label={`+ Bahşiş (%${tip})`} value={TRY(tipTutar)} sub />
        <Row label="Toplam" value={TRY(grandTotal)} highlight />
        <hr className="my-3" />
        <Row label={`👥 Kişi Başı (${kisi} kişi)`} value={TRY(kisiBasi)} highlight />
      </Result>

      <UpsellBanner emoji="🍽️" product="kooza Servis" desc="Adisyon otomatik bölünür, garson uygulamasında tek tıkla ödeme" url="/kayit?product=servis&plan=baslangic" />
    </CalcCard>
  )
}

// ─── SaaS MRR/ARR ────────────────────────────────────────────
function MRRCalculator() {
  const [musteri, setMusteri] = useState(50)
  const [aylik, setAylik] = useState(599)
  const [churn, setChurn] = useState(5)
  const [buyume, setBuyume] = useState(20)

  const mrr = musteri * aylik
  const arr = mrr * 12
  const yenikıdem = (musteri * buyume) / 100
  const kayip = (musteri * churn) / 100
  const netBuyume = yenikıdem - kayip

  // 12 ay sonra tahmin
  let m = musteri
  for (let i = 0; i < 12; i++) {
    m = m * (1 + buyume / 100 - churn / 100)
  }
  const m12 = Math.round(m)
  const mrr12 = m12 * aylik

  return (
    <CalcCard title="SaaS MRR / ARR Hesaplayıcı" emoji="💰" subtitle="SaaS metrikleri tahmini">
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <NumInput label="Aktif Müşteri" value={musteri} onChange={setMusteri} step={5} min={1} />
        <NumInput label="Ortalama Aylık (₺)" value={aylik} onChange={setAylik} step={50} min={1} />
        <NumInput label="Churn Oranı (%)" value={churn} onChange={setChurn} step={1} min={0} max={50} />
        <NumInput label="Aylık Büyüme (%)" value={buyume} onChange={setBuyume} step={5} min={0} max={100} />
      </div>

      <Result>
        <Row label="🚀 Mevcut MRR (Aylık)" value={TRY(mrr)} highlight />
        <Row label="📅 Mevcut ARR (Yıllık)" value={TRY(arr)} highlight />
        <hr className="my-3" />
        <Row label={`+ Yeni Müşteri (%${buyume})`} value={`${Math.round(yenikıdem)} kişi/ay`} sub muted />
        <Row label={`− Kayıp (%${churn} churn)`} value={`${Math.round(kayip)} kişi/ay`} sub muted />
        <Row label="📈 Net Büyüme" value={`+${Math.round(netBuyume)} kişi/ay`} highlight muted />
        <hr className="my-3" />
        <Row label="🔮 12 Ay Sonra Müşteri" value={`${m12} müşteri`} highlight />
        <Row label="💰 12 Ay Sonra MRR" value={TRY(mrr12)} highlight />
      </Result>

      <UpsellBanner emoji="🦋" product="kooza Pro Bundle" desc="SaaS metrikleri Admin Panel'de gerçek zamanlı görünür" url="/kayit?product=bundle&plan=pro" />
    </CalcCard>
  )
}

// ─── Yardımcı Componentler ──────────────────────────────────

function CalcCard({ title, emoji, subtitle, children }: { title: string; emoji: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 lg:p-8">
      <div className="mb-6">
        <h3 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">
          <span className="mr-2 text-2xl">{emoji}</span>
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

function NumInput({ label, value, onChange, step, min, max }: { label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        min={min}
        max={max}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
  )
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {options.map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
    </div>
  )
}

function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-5 border border-gray-100">
      {children}
    </div>
  )
}

function Row({ label, value, sub, highlight, muted, positive }: { label: string; value: string; sub?: boolean; highlight?: boolean; muted?: boolean; positive?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-1.5 ${muted ? 'opacity-75' : ''}`}>
      <span className={`${highlight ? 'font-bold text-gray-900' : sub ? 'text-gray-600' : 'text-gray-700'} ${highlight ? 'text-base' : 'text-sm'}`}>
        {label}
      </span>
      <span
        className={`font-mono font-bold ${
          highlight
            ? muted ? 'text-purple-600 text-base' : 'text-purple-700 text-lg'
            : sub
            ? 'text-gray-500 text-sm'
            : positive
            ? 'text-emerald-600'
            : 'text-gray-700 text-sm'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function UpsellBanner({ emoji, product, desc, url }: { emoji: string; product: string; desc: string; url: string }) {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 flex items-center gap-3">
      <div className="text-3xl">{emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-purple-900 text-sm">Otomatik istiyor musun? <span className="text-purple-700">{product}</span></div>
        <div className="text-xs text-purple-700 leading-relaxed">{desc}</div>
      </div>
      <a
        href={url}
        className="shrink-0 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition"
      >
        14 Gün Ücretsiz →
      </a>
    </div>
  )
}
