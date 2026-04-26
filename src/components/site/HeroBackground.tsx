/**
 * Light hero background — animated soft pastel orbs + ultra-fine dot grid.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Top-right purple orb — drifts and breathes */}
      <div
        className="absolute -top-32 -right-20 w-[640px] h-[640px] rounded-full hero-orb-a"
        style={{
          background:
            'radial-gradient(circle at center, rgba(135, 90, 123, 0.22) 0%, rgba(135, 90, 123, 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Bottom-left pink/amber orb */}
      <div
        className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full hero-orb-b"
        style={{
          background:
            'radial-gradient(circle at center, rgba(251, 146, 60, 0.18) 0%, rgba(236, 72, 153, 0.10) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Top-left mint orb */}
      <div
        className="absolute top-40 -left-20 w-[420px] h-[420px] rounded-full hero-orb-c"
        style={{
          background:
            'radial-gradient(circle at center, rgba(34, 197, 94, 0.13) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgb(0 0 0 / 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center top, black 30%, transparent 80%)',
        }}
      />

      <style>{`
        @keyframes heroOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50%      { transform: translate(-30px, 24px) scale(1.08); opacity: 0.85; }
        }
        @keyframes heroOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50%      { transform: translate(36px, -18px) scale(1.12); opacity: 0.88; }
        }
        @keyframes heroOrbC {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
          50%      { transform: translate(20px, 40px) scale(0.92); opacity: 1; }
        }
        .hero-orb-a { animation: heroOrbA 14s ease-in-out infinite; }
        .hero-orb-b { animation: heroOrbB 18s ease-in-out infinite; }
        .hero-orb-c { animation: heroOrbC 22s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-a, .hero-orb-b, .hero-orb-c { animation: none; }
        }
      `}</style>
    </div>
  )
}
