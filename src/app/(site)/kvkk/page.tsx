import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'kooza ekosistemi 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
}

export default function KvkkPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          📜 Yasal Belge
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-gray-500 mb-12">Son güncelleme: 1 Mayıs 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <h2>1. Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca,
            kooza markası altında yürütülen tüm yazılım hizmetlerinin (kooza Randevu, kooza Eğitim,
            kooza Mesken, kooza Tamir, kooza Hukuk, kooza İnşaat, kooza Emlak, kooza Servis,
            kooza Muhasebe, kooza İK) veri sorumlusu sıfatıyla kişisel verileriniz aşağıda
            açıklanan amaç ve esaslar çerçevesinde işlenmektedir.
          </p>

          <h2>2. İşlenen Kişisel Veri Kategorileri</h2>
          <ul>
            <li><strong>Kimlik bilgileri:</strong> Ad, soyad, T.C. kimlik no (faturalama için)</li>
            <li><strong>İletişim bilgileri:</strong> E-posta, telefon, adres</li>
            <li><strong>Müşteri işlem bilgileri:</strong> Üyelik kaydı, sipariş, fatura geçmişi</li>
            <li><strong>İşlem güvenliği:</strong> IP adresi, log kayıtları, çerez bilgileri</li>
            <li><strong>Finansal bilgiler:</strong> Ödeme bilgileri (PCI-DSS uyumlu sanal POS sağlayıcısı tarafından)</li>
            <li><strong>Hizmete özel veriler:</strong> Randevu kaydı, dava bilgisi, müvekkil bilgisi, çalışan bilgisi vb.</li>
          </ul>

          <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
          <ul>
            <li>Hizmetin sunulması ve sözleşmenin ifası</li>
            <li>Kullanıcı hesabının oluşturulması ve yönetimi</li>
            <li>Faturalama ve ödeme işlemleri</li>
            <li>Müşteri destek ve şikayet yönetimi</li>
            <li>Bilgi güvenliği ve dolandırıcılığın önlenmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Pazarlama (açık rıza ile)</li>
          </ul>

          <h2>4. Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, hizmetin sürdürülmesi için zorunlu olduğu hallerde:
          </p>
          <ul>
            <li>Yasal yükümlülükler kapsamında resmi kurumlara (GİB, mahkemeler vb.)</li>
            <li>Bulut altyapı sağlayıcıları (Vercel, Render, Neon — AB içi)</li>
            <li>Ödeme hizmet sağlayıcıları (iyzico, PayTR — Türkiye içi)</li>
            <li>İletişim sağlayıcıları (e-posta servisleri — açık rıza ile)</li>
          </ul>
          <p>
            Verileriniz <strong>Türkiye ve AB sınırları içinde</strong> tutulur, üçüncü ülkelere
            açık rızanız olmadan aktarılmaz.
          </p>

          <h2>5. Saklama Süresi</h2>
          <p>
            Kişisel verileriniz, hizmet sözleşmesi süresince ve mevzuatın öngördüğü saklama
            sürelerince işlenir. Sözleşme sona erdikten sonra:
          </p>
          <ul>
            <li>Faturalandırma ile ilgili veriler: <strong>10 yıl</strong> (VUK)</li>
            <li>İşlem güvenliği logları: <strong>2 yıl</strong></li>
            <li>Hesap verileri: 6 ay sonra silinir veya anonimleştirilir</li>
          </ul>

          <h2>6. Haklarınız (KVKK m.11)</h2>
          <p>Veri sahibi olarak şu haklara sahipsiniz:</p>
          <ul>
            <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse bilgi talep etme</li>
            <li>İşlenme amacını öğrenme, amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde/dışında aktarıldığı kişileri öğrenme</li>
            <li>Eksik/yanlış verilerin düzeltilmesini talep etme</li>
            <li>Verilerin silinmesini/yok edilmesini talep etme</li>
            <li>Düzeltme/silme işlemlerinin aktarıldığı 3. kişilere bildirilmesini isteme</li>
            <li>Otomatik sistemlerce işlenmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme</li>
            <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde tazminat talep etme</li>
          </ul>

          <h2>7. Başvuru Yöntemi</h2>
          <p>
            Haklarınızı kullanmak için <a href="mailto:kvkk@kooza.tr" className="text-purple-700 hover:underline">kvkk@kooza.tr</a> adresine
            kimlik bilgilerinizle birlikte yazılı başvuru gönderebilirsiniz. Başvurularınız en geç
            <strong> 30 gün</strong> içinde ücretsiz olarak yanıtlanır.
          </p>

          <h2>8. İletişim</h2>
          <p>
            <strong>Veri Sorumlusu:</strong> kooza<br />
            <strong>E-posta:</strong> <a href="mailto:kvkk@kooza.tr" className="text-purple-700 hover:underline">kvkk@kooza.tr</a><br />
            <strong>Web:</strong> <a href="https://kooza.tr" className="text-purple-700 hover:underline">kooza.tr</a>
          </p>
        </div>
      </section>
    </div>
  )
}
