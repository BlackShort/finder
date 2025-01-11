"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Star, BookOpen, Award, ExternalLink, Calendar } from 'lucide-react';
import axios from 'axios';
import { Course } from '@/types/course';

interface Params {
  id: string;
}

export default function CoursePage({ params }: { params: Params }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${params.id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

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
    <div className="mx-auto px-6 py-6">
      <Link href="/" passHref>
        <Button variant="default" className="mb-6 transition-colors duration-200">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Courses
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={course?.imageUrl || '/placeholder.jpg'}
            alt={course?.title || 'Course Image'}
            fill
            objectFit="cover"
            className="rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              {course?.title}
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {course?.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-3 py-1 rounded-full bg-blue-500/80 text-white font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-medium">{course?.timeline || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-medium">{course?.timestamp ? new Date(course.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="p-8 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Content Outline</h2>
          <ul className="space-y-4">
            {course?.contentOutline?.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                <span className="text-gray-700 text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Career Opportunities</h2>
          <div className="flex items-center space-x-3 text-gray-600">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-medium">
              {course?.careerOpportunities?.length || 0} potential career paths
            </span>
          </div>
          <ul className="space-y-4">
            {course?.careerOpportunities?.map((opportunity, index) => (
              <li key={index} className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-700 text-base">{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Resources</h2>
          <ul className="space-y-4">
            {course?.resources?.map((resource, index) => (
              <li key={index} className="flex items-center space-x-4">
                <BookOpen className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <a
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 text-base hover:text-blue-500 transition-colors duration-200 flex items-center space-x-2 overflow-hidden"
                >
                  <span className="truncate max-w-xs">{resource.split('//')[1]}</span>
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
