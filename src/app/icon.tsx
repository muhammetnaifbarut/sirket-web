import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#714B67',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
        }}
      >
        <svg viewBox="0 0 32 16" width="24" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="8" r="6" fill="white" />
          <circle cx="9" cy="8" r="2.5" fill="#714B67" />
          <circle cx="22" cy="8" r="6" fill="none" stroke="white" strokeWidth="2.2" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
