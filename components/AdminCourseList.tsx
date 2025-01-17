'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Course } from '@/types/course'
import axios from 'axios'

export function AdminCourseList() {

  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [])

  const handleDelete = async (id: string) => {
    const response = await axios.delete(`/api/courses/${id}`);
    if (response.status === 200) {
      setCourses(courses.filter(course => course.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Courses</h2>
      {courses.map(course => (
        <div key={course.id} className="flex justify-between items-center border p-4 rounded">
          <span>{course.title}</span>
          <Button variant="destructive" onClick={() => handleDelete(course.id)}>Delete</Button>
        </div>
      ))}
    </div>
  )
}

