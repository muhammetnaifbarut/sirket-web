'use client'

import { useEffect, useState } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [healthCheck, setHealthCheck] = useState<any>(null)
  const [loadingHealth, setLoadingHealth] = useState(false)

  useEffect(() => {
    // Otomatik /api/health çağır → DB / env durumunu öğren
    setLoadingHealth(true)
    fetch('/api/health')
      .then(r => r.json())
      .then(data => setHealthCheck(data))
      .catch(e => setHealthCheck({ error: String(e) }))
      .finally(() => setLoadingHealth(false))
  }, [])

  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#fff' }}>
        <div style={{ minHeight: '100vh', padding: '24px', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: '#fef2f2', color: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 28 }}>
              ⚠️
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>Sistemsel bir hata oluştu</h1>
            <p style={{ color: '#6b7280', lineHeight: 1.6, margin: '0 0 24px' }}>
              Aşağıdaki teşhisi geliştirici ekibe gönderin.
            </p>
            <button
              onClick={() => reset()}
              style={{ padding: '12px 24px', borderRadius: 12, background: '#714B67', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
            >
              Tekrar Dene
            </button>
          </div>

          {/* Hata Detayı */}
          <div style={{ marginTop: 32, padding: 16, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', margin: '0 0 8px' }}>🔴 Runtime Hatası</h3>
            <p style={{ fontSize: 13, color: '#7f1d1d', fontFamily: 'monospace', wordBreak: 'break-all', margin: 0 }}>
              <strong>Mesaj:</strong> {error?.message || '(yok)'}
            </p>
            {error?.digest && (
              <p style={{ fontSize: 11, color: '#991b1b', fontFamily: 'monospace', marginTop: 4 }}>
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
            {error?.stack && (
              <details style={{ marginTop: 8 }}>
                <summary style={{ fontSize: 12, color: '#7f1d1d', cursor: 'pointer' }}>Stack trace</summary>
                <pre style={{ fontSize: 10, color: '#7f1d1d', whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: 4 }}>
                  {error.stack}
                </pre>
              </details>
            )}
          </div>

          {/* Health Check Sonucu */}
          <div style={{ marginTop: 16, padding: 16, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>🩺 Sistem Teşhisi</h3>
            {loadingHealth ? (
              <p style={{ fontSize: 12, color: '#6b7280' }}>Yükleniyor...</p>
            ) : healthCheck ? (
              <pre style={{ fontSize: 11, color: '#111827', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
                {JSON.stringify(healthCheck, null, 2)}
              </pre>
            ) : (
              <p style={{ fontSize: 12, color: '#dc2626' }}>Health check de başarısız!</p>
            )}
          </div>

          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 16, textAlign: 'center' }}>
            kooza Debug Mode · Bu ekran sorun çözüldükten sonra kaldırılır
          </p>
        </div>
      </body>
    </html>
  )
}
