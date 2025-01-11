import { Suspense } from 'react'
import { CourseList } from '@/components/CourseList'
import { QueryProvider } from '@/components/QueryProvider'

export default async function Home() {
  return (
    <QueryProvider>
      <div className="space-y-6 mt-4">
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-100">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neutral-900"></div>
          </div>
        }>
          <CourseList />
        </Suspense>
      </div>
    </QueryProvider>
  )
}

