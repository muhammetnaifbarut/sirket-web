'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#fff' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 440 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: '#fef2f2', color: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 28 }}>
              ⚠️
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>Sistemsel bir hata oluştu</h1>
            <p style={{ color: '#6b7280', lineHeight: 1.6, margin: '0 0 24px' }}>
              Sayfayı yenileyin. Sorun devam ederse lütfen bize ulaşın.
            </p>
            <button
              onClick={() => reset()}
              style={{ padding: '12px 24px', borderRadius: 12, background: '#714B67', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
            >
              Tekrar Dene
            </button>
            {error.digest && (
              <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 32, fontFamily: 'monospace' }}>
                Hata kodu: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
