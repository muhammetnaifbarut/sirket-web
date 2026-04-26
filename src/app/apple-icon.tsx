import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function AppleIcon() {
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
        }}
      >
        <svg viewBox="0 0 180 90" width="140" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="45" r="34" fill="white" />
          <circle cx="50" cy="45" r="14" fill="#714B67" />
          <circle cx="125" cy="45" r="34" fill="none" stroke="white" strokeWidth="11" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
