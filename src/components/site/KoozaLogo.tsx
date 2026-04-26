interface Props {
  className?: string
  variant?: 'mark' | 'full'
  color?: string
  accentColor?: string
}

/**
 * KOOZA logo — the signature double-O renders as two interlocking circles:
 * left filled (cocoon/seed), right outlined (transformation/expansion).
 * Together they form an infinity-like loop, representing the
 * continuous transformation cycle KOOZA enables for businesses.
 */
export default function KoozaLogo({
  className = 'h-8',
  variant = 'mark',
  color = '#714B67',
  accentColor = '#875A7B',
}: Props) {
  if (variant === 'full') {
    return (
      <svg
        viewBox="0 0 220 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="kooza"
      >
        {/* k */}
        <path
          d="M14 8 L14 48 M14 30 L30 14 M14 30 L30 46"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* o (filled) */}
        <circle cx="58" cy="32" r="14" fill={color} />
        <circle cx="58" cy="32" r="6" fill="white" />
        {/* o (outlined) */}
        <circle cx="92" cy="32" r="14" fill="none" stroke={color} strokeWidth="6" />
        {/* z */}
        <path
          d="M115 22 L138 22 L115 46 L138 46"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* a */}
        <path
          d="M155 32 a12 12 0 1 1 0 0.01 M170 22 L170 46"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* accent dot */}
        <circle cx="200" cy="14" r="4" fill={accentColor} />
      </svg>
    )
  }

  // mark variant — just the double-O symbol
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left O — solid (the "cocoon" — origin) */}
      <circle cx="18" cy="20" r="14" fill={color} />
      {/* Inner highlight to feel hollow */}
      <circle cx="18" cy="20" r="6" fill="white" />
      {/* Right O — outlined (the "expansion" — transformation) */}
      <circle cx="42" cy="20" r="14" fill="none" stroke={color} strokeWidth="5" />
      {/* Accent dot — top-right spark */}
      <circle cx="58" cy="6" r="3" fill={accentColor} />
    </svg>
  )
}
