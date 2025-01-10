import dbConnect from '@/db/mongodb';
import Course from '@/models/Course';
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find().limit(20);
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error fetching courses ${error}` }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const course = new Course(data);


    await course.save();
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error fetching courses ${error}` }, { status: 500 });
  }
}
