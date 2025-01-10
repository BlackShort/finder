'use client';

import { useEffect, useState } from 'react';
import { CourseCard } from './CourseCard';
import { useSearch } from './SearchProvider';
import axios from 'axios';
import { Course } from '@/types/course';

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { debouncedSearch } = useSearch();


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        const data = response.data;
        if (data && data.length > 0) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);


  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    course.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neutral-900"></div>
      </div>
    );
  }


  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2">No courses found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search terms or browse all courses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
      {filteredCourses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
