import { NextResponse } from 'next/server'
import { updateCourse, deleteCourse, addCourse } from '@/lib/courses'
export async function POST(request: Request) {
    try {
        const courseDataArray = await request.json()

        if (!Array.isArray(courseDataArray) || courseDataArray.length === 0) {
            return NextResponse.json({ error: 'Invalid input: Expected an array of courses' }, { status: 400 })
        }

        // Validate each course's data
        for (const courseData of courseDataArray) {
            if (!courseData.title || !courseData.description) {
                return NextResponse.json({ error: 'Title and description are required for each course' }, { status: 400 })
            }
        }

        const newCourses = await Promise.all(courseDataArray.map(courseData => addCourse(courseData)))
        return NextResponse.json(newCourses, { status: 201 });
    } catch (error) {
        console.error('Error adding courses:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const updatedCoursesData = await request.json()

        if (!Array.isArray(updatedCoursesData) || updatedCoursesData.length === 0) {
            return NextResponse.json({ error: 'Invalid input: Expected an array of course updates' }, { status: 400 })
        }

        // Update each course
        const updatedCourses = await Promise.all(updatedCoursesData.map(courseData => {
            if (!courseData.id) {
                return { error: 'Course ID is required for each update' }
            }
            return updateCourse(courseData.id, courseData)
        }))

        return NextResponse.json(updatedCourses)
    } catch (error) {
        console.error("Error updating courses:", error)
        return NextResponse.json({ error: 'Error updating courses' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const ids = await request.json()

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Invalid input: Expected an array of course IDs' }, { status: 400 })
        }

        await Promise.all(ids.map(id => deleteCourse(id)))

        return NextResponse.json({ message: 'Courses deleted successfully' })
    } catch (error) {
        console.error('Error deleting courses:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
