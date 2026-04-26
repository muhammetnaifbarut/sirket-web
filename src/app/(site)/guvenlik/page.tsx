import Link from 'next/link'
import { Shield, Lock, Server, FileCheck, Users, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Güvenlik & Uyumluluk',
  description: 'kooza\'da verilerin nasıl korunuyor: KVKK, ISO 27001, şifreleme ve daha fazlası.',
}

const PILLARS = [
  {
    icon: Lock,
    title: 'Şifreleme',
    items: [
      'Tüm trafik AES-256 ile şifrelenir',
      'Veriler dinlenirken (TLS 1.3) ve dururken (AES-256) korunur',
      'API endpoint\'leri SSL/TLS zorunlu',
    ],
  },
  {
    icon: Server,
    title: 'Altyapı',
    items: [
      'Tier 4 veri merkezi (Türkiye)',
      'Saatlik otomatik yedekleme',
      'Disaster Recovery planı (RPO < 1 saat)',
      '%99.95 uptime SLA',
    ],
  },
  {
    icon: FileCheck,
    title: 'Sertifikasyon',
    items: [
      'ISO 27001:2022 (Bilgi Güvenliği Yönetim Sistemi)',
      'KVKK uyumlu altyapı',
      'GDPR uyum hazırlığı',
      'PCI DSS uyumu (ödeme modülünde)',
    ],
  },
  {
    icon: Users,
    title: 'Erişim Kontrolü',
    items: [
      'Rol bazlı yetkilendirme (RBAC)',
      'İki faktörlü kimlik doğrulama (2FA)',
      'Single Sign-On (SSO) Enterprise planda',
      'Aktivite log\'ları her aksiyon için',
    ],
  },
]

export default function Page() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(135, 90, 123,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Güvenlik & Uyumluluk
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Verin güvende. Hep.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            KOBİ\'lerin verisini korumak bizim 1 numaralı önceliğimiz. İşte nasıl yaptığımız.
          </p>
        </div>
      </section>

      {/* Certifications row */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50/30 border-y border-purple-100/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Award className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">ISO 27001</p>
              <p className="text-xs text-gray-500">Bilgi Güvenliği</p>
            </div>
            <div>
              <Shield className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">KVKK</p>
              <p className="text-xs text-gray-500">Tam Uyumlu</p>
            </div>
            <div>
              <Server className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">Türkiye Sunucu</p>
              <p className="text-xs text-gray-500">Yerel Veri</p>
            </div>
            <div>
              <Lock className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">AES-256</p>
              <p className="text-xs text-gray-500">Şifreleme</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl lg:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
            Güvenlik altyapımızın 4 sütunu
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="p-6 lg:p-8 rounded-2xl bg-white border border-gray-200 shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{p.title}</h3>
                <ul className="space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 shadow-soft">
            <h3 className="font-bold text-gray-900 text-xl mb-4">Veri sahipliği</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Verin senin.</strong> İstediğin zaman tüm verini export edebilir, hesabını kapattığında 30 gün içinde tamamen silebilirsin. kooza hiçbir zaman verini üçüncü partilere satmaz veya paylaşmaz.
            </p>

            <h3 className="font-bold text-gray-900 text-xl mb-4 mt-8">KVKK Aydınlatma</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kişisel verilerinizin işlenme süreçleri 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında yönetilir. Detaylı aydınlatma metni için:
            </p>
            <Link
              href="/gizlilik-politikasi"
              className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:underline"
            >
              Gizlilik Politikamızı oku →
            </Link>

            <h3 className="font-bold text-gray-900 text-xl mb-4 mt-8">Güvenlik açığı bildirimi</h3>
            <p className="text-gray-700 leading-relaxed">
              Sistemde güvenlik açığı tespit ettiyseniz lütfen <a href="mailto:security@kooza.com.tr" className="text-purple-700 font-semibold hover:underline">security@kooza.com.tr</a> üzerinden bildirin. 48 saat içinde yanıt veriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-500 mb-6 text-sm">Güvenlik politikamız hakkında detaylı bilgi almak ister misin?</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-button"
          >
            Güvenlik Ekibiyle Görüş
          </Link>
        </div>
      </section>
    </div>
  )
}
