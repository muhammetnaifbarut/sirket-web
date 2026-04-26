import { CardSkeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <div className="bg-white">
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="h-7 w-32 mx-auto bg-gray-100 rounded-full animate-pulse" />
          <div className="h-14 w-3/4 mx-auto bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-5 w-2/3 max-w-lg mx-auto bg-gray-100 rounded-md animate-pulse" />
        </div>
      </section>
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
