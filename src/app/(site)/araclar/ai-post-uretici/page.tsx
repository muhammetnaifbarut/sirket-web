'use client'

import { useState } from 'react'
import Link from 'next/link'

const SECTORS = [
  { id: 'kuafor', name: 'Kuaför / Güzellik Salonu', emoji: '💇' },
  { id: 'klinik', name: 'Klinik / Doktor', emoji: '🏥' },
  { id: 'restoran', name: 'Restoran / Kafe', emoji: '🍽️' },
  { id: 'emlak', name: 'Emlakçı', emoji: '🏠' },
  { id: 'mesken', name: 'Site Yönetimi', emoji: '🏘️' },
  { id: 'avukat', name: 'Avukat / Hukuk', emoji: '⚖️' },
  { id: 'kurs', name: 'Eğitim / Kurs', emoji: '🎓' },
  { id: 'tamir', name: 'Teknik Servis', emoji: '🔧' },
  { id: 'insaat', name: 'Müteahhit', emoji: '🏗️' },
  { id: 'other', name: 'Diğer', emoji: '🛍️' },
]

const GOALS = [
  { id: 'yeni-musteri', name: 'Yeni müşteri çekmek', emoji: '🎯' },
  { id: 'kampanya', name: 'Kampanya / İndirim duyurusu', emoji: '🏷️' },
  { id: 'hizmet-tanitim', name: 'Hizmet tanıtımı', emoji: '✨' },
  { id: 'guven', name: 'Güven inşa etmek (referans)', emoji: '⭐' },
  { id: 'etkinlik', name: 'Etkinlik / Açılış', emoji: '🎉' },
  { id: 'sosyal-sorumluluk', name: 'Sosyal sorumluluk', emoji: '🤝' },
]

// Template-based generation (gerçek AI olmadan)
function generatePost(sector: string, goal: string, businessName: string) {
  const sectorLabels: Record<string, string> = {
    kuafor: 'kuaför', klinik: 'kliniğimiz', restoran: 'restoranımız', emlak: 'emlak ofisimiz',
    mesken: 'site yönetimimiz', avukat: 'hukuk büromuz', kurs: 'eğitim merkezimiz',
    tamir: 'teknik servisimiz', insaat: 'inşaat firmamız', other: 'işletmemiz',
  }
  const sectorName = sectorLabels[sector] || 'işletmemiz'
  const name = businessName || `${sectorName.replace('imiz', '')}`

  const posts: Record<string, { instagram: string; facebook: string; whatsapp: string }> = {
    'yeni-musteri': {
      instagram: `✨ Yeni dostlar arıyoruz!\n\n${name} olarak sana özel değer katmak istiyoruz.\n\n💎 İlk randevu indirimli\n📱 Online randevu kolay\n⭐ Memnun müşterilerimizden öğren\n\nDM'den yaz, hemen tanışalım!\n\n#${sector} #yenimusteri #randevu #kalite`,
      facebook: `Merhaba değerli komşumuz! 👋\n\n${name} olarak sizin için buradayız. Sektörümüzde yıllarca biriktirdiğimiz tecrübeyle bekleriz.\n\nBugün arayın, ihtiyacınızı dinleyelim. İlk gelişe özel hediyemiz var 🎁\n\nİletişim bilgilerimiz biyografimizde 👆`,
      whatsapp: `Merhaba 👋\n\n${name} olarak sizinle tanışmak isteriz.\n\n✨ Sana özel ilk randevu indirimi\n📍 ${sectorName.charAt(0).toUpperCase() + sectorName.slice(1)} hizmetimizden faydalan\n\nBu mesaja "EVET" yazarsan hemen randevu ayarlayalım.`,
    },
    'kampanya': {
      instagram: `🔥 BÜYÜK İNDİRİM 🔥\n\nBugün, ${name}'da %25 İNDİRİM!\n\n📅 Sadece bu hafta\n💰 Tüm hizmetlerde geçerli\n⏰ Stok ve kontenjan ile sınırlıdır\n\nDM'den hemen randevu al, kampanyayı kaçırma!\n\n#indirim #kampanya #${sector} #sınırlı #fırsat`,
      facebook: `🎉 Sevgili müşterilerimiz, bu hafta sona özel bir hediyemiz var!\n\n${name} olarak %25 İNDİRİM kampanyası başlattık. Tüm hizmetler dahil.\n\n📅 Geçerlilik: Bu hafta Pazar gecesine kadar\n🎁 Önceden randevu alanlara ayrıca süpriz hediye!\n\nMesajdan hemen yazın, sırayı kaçırmayın 💕`,
      whatsapp: `🔥 ${name} - SÜPER FIRSAT 🔥\n\n⭐ %25 İNDİRİM tüm hizmetlerde\n📅 Sadece bu hafta\n🎁 Erken randevu alana ekstra hediye\n\nBu mesaja "RANDEVU" yazarsan size en uygun saati ayarlayalım. Hızlı ol! 🏃‍♀️`,
    },
    'hizmet-tanitim': {
      instagram: `🌟 Bilmediğin hizmetlerimiz ✨\n\n${name} olarak sunduklarımız:\n\n1️⃣ Profesyonel ekip\n2️⃣ Modern teknik ekipman\n3️⃣ Kişiye özel danışmanlık\n4️⃣ Online randevu sistemi\n5️⃣ KVKK uyumlu güvenlik\n\nHangisiyle başlamak istersin? DM'den yaz!\n\n#hizmet #profesyonel #${sector}`,
      facebook: `${name} olarak değerli müşterilerimiz için neler sunduğumuzu paylaşıyoruz 👇\n\n✓ Yıllarca sektör tecrübesi\n✓ Profesyonel ekip\n✓ Teknolojik araçlar\n✓ Güvenli ve hijyenik ortam\n✓ Kişisel danışmanlık\n\nHangi hizmetimizle ilgilendiğinizi yazın, detayını anlatalım!`,
      whatsapp: `${name} - hizmetlerimiz 📋\n\n• Profesyonel ekip\n• Modern teknik\n• Kişiye özel yaklaşım\n• Esnek randevu saatleri\n\nHangi konuda yardımcı olalım? Mesaj at, anında dönelim ⚡`,
    },
    'guven': {
      instagram: `⭐⭐⭐⭐⭐ "Çok memnun kaldım!"\n\nMüşterilerimiz bizi değerlendiriyor:\n\n💬 "Profesyonel ekip" - Ayşe Y.\n💬 "Hızlı + kaliteli hizmet" - Mehmet K.\n💬 "Kesinlikle tavsiye ederim" - Zeynep T.\n\nSıra sende! Bu güveni hak etmek için varız.\n\n#referans #güven #memnuniyet #${sector}`,
      facebook: `Sevgili dostlar, müşterilerimizden gelen yorumları paylaşmak istiyoruz 💕\n\n⭐ "Profesyonel ve sıcak yaklaşım" - Ayşe Y.\n⭐ "Hijyen seviyesi mükemmel" - Mehmet K.\n⭐ "Online randevu çok pratik" - Zeynep T.\n\nSizin de yorumunuzu bekliyoruz! Tecrübelerinizi yorumlarda paylaşır mısınız? 🙏`,
      whatsapp: `${name} - müşterilerimiz ne diyor? 🌟\n\n"Çok memnun kaldım, herkese tavsiye ederim" - Ayşe\n"Profesyonel ekip, kaliteli hizmet" - Mehmet\n"Online randevu sistemi süper" - Zeynep\n\nSen de buranın bir parçası ol! Randevu için: ${name.toLowerCase().replace(/\s+/g, '')}.com 🌐`,
    },
    'etkinlik': {
      instagram: `🎊 BÜYÜK GÜN! 🎊\n\n${name} olarak sizleri özel etkinliğimize davet ediyoruz!\n\n📅 Tarih: [Tarih girin]\n⏰ Saat: [Saat]\n📍 Adres: [Adres]\n\n🎁 Davetlilere özel hediye\n☕ İkramlar bizden\n🎵 Eğlenceli atmosfer\n\nKatılmak isteyen DM atsın!\n\n#etkinlik #davet #${sector}`,
      facebook: `🎉 SİZE ÖZEL DAVETİYE 🎉\n\n${name} ailesi olarak siz değerli komşularımızı özel etkinliğimize bekleriz.\n\n📅 [Tarih]\n📍 [Adres]\n\nGiriş ücretsiz, hediye var, ikramlar bizden 🎁\n\nKaç kişi olarak geleceğinizi yorumda belirtin lütfen 🙏`,
      whatsapp: `🎊 ${name} - özel etkinliğimize davetlisiniz!\n\n📅 [Tarih girin]\n⏰ [Saat]\n📍 [Adres]\n\nKatılırsanız bilgi verir misiniz? Misafir sayısını öğrenmek için 🙏`,
    },
    'sosyal-sorumluluk': {
      instagram: `💚 Topluma katkımız\n\n${name} olarak bu ay [konu]'ya destek olduk:\n\n✓ [aktivite 1]\n✓ [aktivite 2]\n✓ [aktivite 3]\n\nİşletme olmak sadece kâr değil, topluma değer katmaktır 🌍\n\nSiz nelere destek oluyorsunuz? Yorumlarda paylaşın!\n\n#sosyal #toplum #katkı`,
      facebook: `Sevgili dostlar, bu ay topluma katkımız 💚\n\n${name} olarak bu ay [konu]'ya destek olduk. Çünkü sadece bir işletme değil, bu topluluğun bir parçasıyız.\n\nSizler de katkıda bulunmak isterseniz, bizimle iletişime geçin. Birlikte daha güçlüyüz 🤝`,
      whatsapp: `💚 ${name} - bu ay topluma katkımız\n\nDeğerli müşterilerimizle birlikte [konu]'ya destek olduk. Siz de bilmek isteyebilirsiniz diye paylaşıyorum.\n\nBeğenirseniz hikayeleri sosyal medyamızda görebilirsiniz. ❤️`,
    },
  }

  return posts[goal] || posts['yeni-musteri']
}

export default function AIPostPage() {
  const [sektör, setSektör] = useState('kuafor')
  const [goal, setGoal] = useState('yeni-musteri')
  const [name, setName] = useState('')
  const [generated, setGenerated] = useState<{ instagram: string; facebook: string; whatsapp: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'instagram' | 'facebook' | 'whatsapp'>('instagram')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setGenerated(generatePost(sektör, goal, name))
    setCopied(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-pink-600 to-fuchsia-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-sm font-bold mb-4">
            🤖 AI Sosyal Medya Post Üretici
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            10 saniyede paylaşıma hazır post
          </h1>
          <p className="text-pink-100 max-w-2xl mx-auto">
            Sektör + amaç söyle, AI Instagram + Facebook + WhatsApp postu yazsın. Anında copy-paste.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">3 hızlı seçim:</h2>

            <div className="space-y-5">
              {/* Sektör */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📂 Sektörünüz</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {SECTORS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSektör(s.id)}
                      className={`p-3 rounded-xl border text-sm transition ${
                        sektör === s.id
                          ? 'bg-pink-600 text-white border-pink-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{s.emoji}</div>
                      <div className="text-[10px] font-semibold leading-tight">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🎯 Amacın nedir?</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        goal === g.id
                          ? 'bg-pink-50 text-pink-900 border-pink-400 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="text-xl">{g.emoji}</div>
                      <div className="text-sm font-bold">{g.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  🏢 İşletme adı <span className="text-gray-400 font-normal">(opsiyonel)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örnek: Sevda Güzellik Merkezi"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 text-base"
                />
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white font-black rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                ✨ AI Post Üret
              </button>
            </div>
          </div>

          {/* Generated */}
          {generated && (
            <div className="mt-8 bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-3xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-black text-pink-900 mb-4">✨ Hazır postların:</h3>

              {/* Tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {(['instagram', 'facebook', 'whatsapp'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                      activeTab === t
                        ? 'bg-pink-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {t === 'instagram' && '📷 Instagram'}
                    {t === 'facebook' && '👥 Facebook'}
                    {t === 'whatsapp' && '📱 WhatsApp'}
                  </button>
                ))}
              </div>

              {/* Post content */}
              <div className="bg-white rounded-2xl p-5 border border-pink-100 mb-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                  {generated[activeTab]}
                </pre>
              </div>

              <button
                onClick={() => handleCopy(generated[activeTab])}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                {copied ? '✅ Kopyalandı!' : '📋 Kopyala'}
              </button>

              <button
                onClick={handleGenerate}
                className="w-full mt-2 py-3 bg-white text-pink-700 font-bold rounded-xl border border-pink-300 hover:bg-pink-50 transition"
              >
                🔄 Yeni Versiyon Üret
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-pink-100 to-fuchsia-100 rounded-2xl p-6 border border-pink-200">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <h4 className="font-black text-pink-900 text-lg mb-1">Daha fazla AI özelliği için</h4>
                <p className="text-sm text-pink-800 mb-3">
                  kooza Randevu, kooza Emlak ve diğer ürünlerde AI destekli müşteri analizi, otomatik mesajlaşma, lead skorlama
                  zaten dahil. 14 gün ücretsiz dene.
                </p>
                <Link
                  href="/fiyatlandirma"
                  className="inline-block px-5 py-2 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition text-sm"
                >
                  Tüm AI özellikleri →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
