import Link from 'next/link'
import { ShieldCheck, Users, Settings, Phone, Award, Lock, Server, ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Enterprise — Kurumsal Çözümler & SLA',
  description: 'kooza Enterprise: 100+ kullanıcı, white-label, özel SLA, dedicated hesap müdürü, ISO 27001, on-premise opsiyonu. Holdingler, üretim, zincir.',
}

export default function EnterprisePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur border border-amber-400/30 text-amber-200 text-sm font-semibold mb-6">
            🏢 Enterprise
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 tracking-tight">
            Kurumsal güç,<br />kooza esnekliği.
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10">
            100+ kullanıcı, çoklu lokasyon, özel SLA, kurumsal güvenlik —
            <strong className="text-white"> dedicated hesap müdürünüz hep yanınızda.</strong>
          </p>
          <Link
            href="/iletisim?konu=enterprise"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 text-slate-900 font-bold hover:-translate-y-0.5 transition-all shadow-2xl shadow-amber-500/30"
          >
            Sales ile görüş →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Enterprise pakette ne var?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, t: 'Sınırsız kullanıcı', d: 'Şirketinizdeki herkesi sisteme katın — kişi başı ek ücret yok.', c: 'bg-purple-100 text-purple-700' },
              { icon: ShieldCheck, t: 'SLA %99.99', d: 'Sözleşmede yazılı uptime garantisi. Düşerse tazminat hakkı.', c: 'bg-emerald-100 text-emerald-700' },
              { icon: Phone, t: 'Dedicated Hesap Müdürü', d: '7/24 telefon, doğrudan WhatsApp, kişiye özel danışman.', c: 'bg-rose-100 text-rose-700' },
              { icon: Award, t: 'Beyaz Etiket (White-label)', d: 'Kendi markanız ile yayınlayın. kooza arkaplanda.', c: 'bg-amber-100 text-amber-700' },
              { icon: Settings, t: 'Özel Entegrasyonlar', d: 'LUCA, Mikro, ETA, SAP, Oracle - özel API/webhook.', c: 'bg-cyan-100 text-cyan-700' },
              { icon: Lock, t: 'Single Sign-On (SSO)', d: 'Microsoft 365, Google Workspace, Okta, SAML 2.0.', c: 'bg-purple-100 text-purple-700' },
              { icon: Server, t: 'On-Premise Opsiyon', d: 'Kendi sunucunuzda. Veri tamamen sizde. (Talep üzerine)', c: 'bg-slate-100 text-slate-700' },
              { icon: ShieldCheck, t: 'ISO 27001 + KVKK + SOC 2', d: 'Tam denetim raporları, sözleşme içinde.', c: 'bg-emerald-100 text-emerald-700' },
              { icon: Settings, t: 'Sınırsız API çağrı', d: 'Rate limit yok, webhook, GraphQL desteği.', c: 'bg-cyan-100 text-cyan-700' },
            ].map((it, i) => {
              const Icon = it.icon
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-cardHover transition-all">
                  <div className={`w-12 h-12 rounded-xl ${it.c} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{it.t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{it.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-tight">Enterprise süreç</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', t: 'İhtiyaç görüşmesi', d: '30 dakika ücretsiz görüşme. İhtiyaç analizi.' },
              { step: '2', t: 'Özel Proposal', d: '5 iş günü içinde sektörünüze özel teklif.' },
              { step: '3', t: 'Pilot proje', d: '90 günlük pilot — 1 departman. Risk yok.' },
              { step: '4', t: 'Tam ölçek', d: 'Pilot başarılıysa tüm şirkete ölçeklendirme.' },
            ].map((it) => (
              <div key={it.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-3">
                  {it.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{it.t}</h3>
                <p className="text-sm text-gray-600">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Sales ekibi sizi 24 saat içinde arar.</h2>
          <p className="text-slate-300 mb-7 leading-relaxed">
            İletişim formundan başvurun, dedicated hesap müdürü size atanır.
            İlk görüşme 30 dakika, ücretsiz, taahhütsüz.
          </p>
          <Link
            href="/iletisim?konu=enterprise"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 text-slate-900 font-bold hover:-translate-y-0.5 transition-all shadow-2xl"
          >
            Sales ile Görüş →
          </Link>
        </div>
      </section>
    </div>
  )
}
