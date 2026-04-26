import { ImageResponse } from 'next/og'

export const alt = 'kooza — Tek platformda tüm iş yazılımları'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ffffff',
          color: '#0f172a',
          position: 'relative',
          padding: 80,
          fontFamily: 'system-ui',
        }}
      >
        {/* Soft purple orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(135, 90, 123,0.22) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 16px',
            borderRadius: 9999,
            background: 'rgba(113, 75, 103,0.08)',
            border: '1px solid rgba(113, 75, 103,0.2)',
            color: '#714B67',
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: '#714B67',
            }}
          />
          Türkiye'nin Yeni Nesil İşletme Platformu
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 700,
            lineHeight: 1.0,
            textAlign: 'center',
            letterSpacing: -5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#0f172a',
          }}
        >
          <div>İşletmenin tüm yazılımları,</div>
          <div style={{ color: '#714B67' }}>tek platformda.</div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: '#64748b',
            marginTop: 36,
            textAlign: 'center',
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          Randevu, stok, CRM, finans ve İK — bir akıllı platformda.
        </div>

        {/* KOOZA logo + wordmark — bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <svg viewBox="0 0 64 32" width="80" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="16" r="13" fill="#714B67" />
            <circle cx="18" cy="16" r="5" fill="white" />
            <circle cx="44" cy="16" r="13" fill="none" stroke="#714B67" strokeWidth="5" />
          </svg>
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: -2,
            }}
          >
            kooza
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
