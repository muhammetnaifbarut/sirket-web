import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

/**
 * Atomic skeleton placeholder — animated pulse with subtle gradient sweep.
 * Use as loading state while real content streams in.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100 rounded-md',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:animate-[shimmer_1.6s_infinite]',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className,
      )}
      aria-hidden
    />
  )
}

/** Card skeleton — for product/blog grid placeholders */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-4/5 rounded-md" />
        <div className="pt-4 border-t border-gray-100 flex justify-between">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}

/** Blog list skeleton — 6 card placeholders in grid */
export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

/** Hero skeleton */
export function HeroSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 lg:py-28 space-y-8">
      <div className="flex justify-center">
        <Skeleton className="h-7 w-72 rounded-full" />
      </div>
      <div className="space-y-3 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-3/4 mx-auto rounded-md" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-5 w-2/3 max-w-md rounded-md" />
      </div>
      <div className="flex gap-3 justify-center">
        <Skeleton className="h-12 w-40 rounded-xl" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
      <Skeleton className="h-96 max-w-5xl mx-auto rounded-2xl mt-12" />
    </div>
  )
}
