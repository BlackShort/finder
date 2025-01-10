"use client";

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users } from 'lucide-react';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { Course } from '@/types/course';

interface Params {
  id: string;
}

export default function CoursePage({ params }: { params: Params }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${params.id}`);
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neutral-900"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="text-3xl font-bold text-neutral-900">Course not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-6 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Button */}
      <Link href="/" passHref>
        <Button variant="default" className="mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Courses
        </Button>
      </Link>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Image */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={course?.imageUrl || '/placeholder.jpg'}
            alt={course?.title || 'Course Image'}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        {/* Right Side - Details */}
        <div className="space-y-6">
          {/* Title and Description */}
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {course.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-md font-medium">{course.timeline}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {/* Content Outline */}
        <div className="p-8 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Content Outline</h2>
          <ul className="space-y-4">
            {course.contentOutline.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                <span className="text-gray-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Career Opportunities */}
        <div className="p-8 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Career Opportunities</h2>
          <div className="flex items-center space-x-3 text-gray-600">
            <Users className="w-6 h-6 text-green-500" />
            <span className="text-lg font-medium">
              {course.careerOpportunities.length} potential career paths
            </span>
          </div>
          <ul className="space-y-4">
            {course.careerOpportunities.map((opportunity, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                <span className="text-gray-700 text-lg">{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="mt-6 p-8 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 rounded-xl shadow-2xl space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Resources</h2>
          <ul className="space-y-4">
            {course.resources.map((resource, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-gray-500 rounded-full mt-1"></div>
                <a href={resource} className="text-gray-700 text-lg hover:text-black transition-all">{resource}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
