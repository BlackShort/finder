import { NextResponse } from 'next/server'
import { getCourses, addCourse } from '@/lib/courses'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') || ''
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const search = searchParams.get('search') || ''

  const { courses, nextCursor } = await getCourses(cursor, limit, search)

  return NextResponse.json({ courses, nextCursor })
}

export async function POST(request: Request) {
  try {
    const courseData = await request.json()

    if (!courseData.title || !courseData.description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const newCourse = await addCourse(courseData)
    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    console.error('Error adding course:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


