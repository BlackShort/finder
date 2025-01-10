import { NextResponse } from 'next/server';
import Course from '@/models/Course';
import dbConnect from '@/db/mongodb';

// Define the Params type
interface Params {
  id: string;
}

// Correctly typed GET, PUT, DELETE handlers
export async function GET(req: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const course = await Course.findById(params.id);
    if (course) {
      return NextResponse.json(course);
    } else {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error fetching course, ${error}` }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const updatedCourseData = await req.json();
    const updatedCourse = await Course.findByIdAndUpdate(
      params.id,
      updatedCourseData,
      { new: true }
    );

    if (updatedCourse) {
      return NextResponse.json(updatedCourse);
    } else {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error updating course, ${error}` }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const deletedCourse = await Course.findByIdAndDelete(params.id);

    if (deletedCourse) {
      return NextResponse.json({ message: 'Course deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error deleting course, ${error}` }, { status: 500 });
  }
}
