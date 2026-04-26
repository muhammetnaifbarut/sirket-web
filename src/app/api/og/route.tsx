import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Türkiye\'nin yeni nesil işletme platformu'
  const subtitle = searchParams.get('subtitle') || 'Web · Sektörel Otomasyon · İK · Muhasebe · Danışmanlık'
  const badge = searchParams.get('badge') || 'kooza'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #714B67 0%, #4a2f44 100%)',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative dots */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(255,182,193,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#714B67',
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>{badge}</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 28,
            maxWidth: '85%',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.4,
            maxWidth: '85%',
          }}
        >
          {subtitle}
        </div>

        {/* Footer band */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 22, color: 'rgba(255,255,255,0.85)' }}>
            <span>500+ KOBİ</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>12 Sektörel Modül</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>24/7 Türkçe Destek</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>kooza.com.tr</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
