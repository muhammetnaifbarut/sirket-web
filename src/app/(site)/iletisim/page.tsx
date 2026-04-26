import ContactForm from '@/components/site/ContactForm'
import { getSettings } from '@/lib/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin',
}

export default async function IletisimPage() {
  const settings = await getSettings('contact')

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(135, 90, 123,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            İletişim
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Sorularınız için buradayız.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uzman ekibimiz size yardımcı olmaya hazır. Aşağıdaki kanallardan ulaşabilir
            veya formu doldurabilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  ),
                  label: 'Telefon',
                  value: settings.site_phone,
                  href: `tel:${settings.site_phone}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  ),
                  label: 'E-posta',
                  value: settings.site_email,
                  href: `mailto:${settings.site_email}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  ),
                  label: 'Adres',
                  value: settings.site_address,
                  href: undefined,
                },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 text-gray-700">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                <p className="text-sm font-bold text-purple-900 mb-1">Çalışma Saatleri</p>
                <p className="text-sm text-purple-800">Pazartesi – Cuma: 09:00 – 18:00</p>
                <p className="text-sm text-purple-800">Cumartesi: 10:00 – 14:00</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
