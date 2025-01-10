import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users } from 'lucide-react'
import { Course } from '@/types/course'
import Link from 'next/link'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col h-full transition-all shadow-sm hover:scale-[1.02] hover:transition-all">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={course.imageUrl}
            alt={course.title}
            blurDataURL="data:..."
            fill
            placeholder="blur"
            objectFit="cover"
            className="rounded-t-lg w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>{course.timeline}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-2" />
          <span>{course.careerOpportunities.length} career paths</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <Link href={`/courses/${course._id}`} className="w-full">
          <Button variant="default" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

