'use client';

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { CourseCard } from './CourseCard';
import { useSearch } from './SearchProvider';
import axios from 'axios';
import { Course } from '@/types/course';
import { Loader2 } from 'lucide-react'

interface PageData {
  courses: Course[]
  nextCursor: string | null
}

const ITEMS_PER_PAGE = 12

export function CourseList() {
  const { debouncedSearch } = useSearch()
  const { ref, inView } = useInView()

  const fetchCourses = async ({ pageParam = '' }): Promise<PageData> => {
    try {
      const response = await axios.get('/api/courses', {
        params: { cursor: pageParam, limit: ITEMS_PER_PAGE, search: debouncedSearch }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { courses: [], nextCursor: null }
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ['courses', debouncedSearch],
    queryFn: fetchCourses,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: '',
  })

  useEffect(() => {
    refetch()
  }, [debouncedSearch, refetch])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const courses = data?.pages.flatMap(page => page.courses) ?? []

  if (status === 'pending') return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neutral-900"></div>
    </div>
  );

  if (status === 'error') return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">Error</h2>
        <p className="text-red-500">{(error as Error).message}</p>
      </div>
    </div>
  )

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2">No courses found</h2>
        <p className="text-muted-foreground">Try adjusting your search terms or browse all courses.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
      {(isFetching || isFetchingNextPage) && (
        <div className="flex items-center justify-center py-4">
          <Loader2 size={24} className="animate-spin text-neutral-900" />
        </div>
      )}
      <div ref={ref} className="h-1" />
    </div>
  )
};
