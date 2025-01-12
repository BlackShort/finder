'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Course } from '@/types/course'

export function AdminCourseForm() {
  // Initialize course state with the correct type
  const [course, setCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    contentOutline: [],
    resources: [],
    videos: [],
    timeline: '',
    careerOpportunities: [],
    tags: [],
    imageUrl: '',
    timestamp: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission behavior

    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...course,
        contentOutline: course.contentOutline.join('\n'), // Join array into newline-separated string
        careerOpportunities: course.careerOpportunities.join('\n'), // Join array into newline-separated string
        tags: course.tags.join(',').trim(), // Join array into comma-separated string
      }),
    });

    if (response.ok) {
      setCourse({
        id: '',
        title: '',
        description: '',
        contentOutline: [],
        resources: [],
        videos: [],
        timeline: '',
        careerOpportunities: [],
        tags: [],
        imageUrl: '',
        timestamp: '',
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value.split('\n'), // Split the content into arrays if it's a list
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={course.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="contentOutline">Content Outline (one item per line)</Label>
        <Textarea
          id="contentOutline"
          name="contentOutline"
          value={course.contentOutline.join('\n')} // Join array into string for display
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="timeline">Timeline</Label>
        <Input
          id="timeline"
          name="timeline"
          value={course.timeline}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="careerOpportunities">Career Opportunities (one item per line)</Label>
        <Textarea
          id="careerOpportunities"
          name="careerOpportunities"
          value={course.careerOpportunities.join('\n')} // Join array into string for display
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={course.tags.join(', ')} // Join array into comma-separated string for display
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={course.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Add Course</Button>
    </form>
  );
}
