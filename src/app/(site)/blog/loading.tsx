import { BlogListSkeleton } from '@/components/site/Skeleton'

export default function BlogLoading() {
  return (
    <div className="bg-white">
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-7 w-20 mx-auto bg-gray-100 rounded-full animate-pulse mb-6" />
          <div className="h-12 w-3/4 mx-auto bg-gray-100 rounded-lg animate-pulse mb-5" />
          <div className="h-5 w-2/3 max-w-lg mx-auto bg-gray-100 rounded-md animate-pulse" />
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogListSkeleton count={6} />
        </div>
      </section>
    </div>
  )
}
