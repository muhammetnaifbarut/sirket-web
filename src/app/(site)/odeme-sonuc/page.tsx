import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function OdemeSonucPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; message?: string; amount?: string; conv?: string }>
}) {
  const params = await searchParams
  const status = params.status || 'pending'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        {isSuccess && (
          <>
            <div className="text-7xl mb-4">🎉</div>
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Ödemeniz Alındı!
            </h1>
            <p className="text-gray-600 mb-2 leading-relaxed">
              Aboneliğiniz aktive edildi. Birkaç dakika içinde e-posta adresinize
              giriş bilgileri gönderilecek.
            </p>
            {params.amount && (
              <p className="text-sm text-gray-500 mb-6">
                Ödeme tutarı: <strong>{params.amount} ₺</strong>
              </p>
            )}
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold transition"
            >
              Ana Sayfaya Dön
            </Link>
          </>
        )}

        {isError && (
          <>
            <div className="text-7xl mb-4">⚠️</div>
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Ödeme Tamamlanamadı
            </h1>
            <p className="text-red-600 mb-6 leading-relaxed text-sm">
              {params.message || 'Beklenmeyen bir hata oluştu.'}
            </p>
            <Link
              href="/fiyatlandirma"
              className="inline-block px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold transition mr-2"
            >
              Tekrar Dene
            </Link>
            <Link
              href="/iletisim"
              className="inline-block px-6 py-3 rounded-xl border-2 border-purple-700 text-purple-700 font-bold hover:bg-purple-50 transition"
            >
              Destek
            </Link>
          </>
        )}

        {!isSuccess && !isError && (
          <>
            <div className="text-7xl mb-4">⏳</div>
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Ödeme İşleniyor
            </h1>
            <p className="text-gray-600 mb-6">Lütfen bekleyin...</p>
          </>
        )}
      </div>
    </div>
  )
}
