import { NextResponse } from 'next/server'
import { getCourse, updateCourse, deleteCourse } from '@/lib/courses'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const course = await getCourse(params.id)
  if (course) {
    return NextResponse.json(course)
  } else {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedCourseData = await request.json();

    const updatedCourse = await updateCourse(params.id, updatedCourseData);

    if (updatedCourse) {
      return NextResponse.json(updatedCourse);
    } else {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating course:", error); 
    return NextResponse.json({ error: 'Error updating course' }, { status: 500 });
  }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await deleteCourse(params.id)
  return NextResponse.json({ message: 'Course deleted successfully' })
}

