export default function SiteLoading() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060d1f 0%, #0a1628 50%, #070f23 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="mx-auto h-8 w-56 rounded-full bg-white/5 animate-pulse" />
          <div className="h-14 sm:h-20 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-14 sm:h-20 rounded-2xl bg-white/5 animate-pulse w-4/5 mx-auto" />
          <div className="h-5 rounded-lg bg-white/5 animate-pulse max-w-2xl mx-auto" />
          <div className="h-5 rounded-lg bg-white/5 animate-pulse max-w-xl mx-auto" />
          <div className="flex gap-3 justify-center pt-4">
            <div className="h-12 w-44 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-12 w-36 rounded-xl bg-white/5 animate-pulse" />
          </div>
          <div className="mt-14 h-[22rem] rounded-2xl bg-white/5 animate-pulse border border-white/10" />
        </div>
      </div>
    </div>
  )
}
