import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Rocket } from 'lucide-react'
import { Course } from '@/types/course'
import Link from 'next/link'
import { ShareButton } from './ShareButton'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col h-full cursor-default transition-all shadow-bottom hover:scale-[1.02] hover:transition-all">
      <CardHeader className="p-0">
        <div className="relative w-full h-40">
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
      <CardContent className="flex-grow px-4 pt-4 pb-0">
        <CardTitle className="text-xl mb-2">{course.title.length > 24 ? course.title.slice(0, 24) + '...' : course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{course.description.length > 70 ? course.description.slice(0, 70) + '...' : course.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-4">
        <div className="flex items-baseline justify-between w-full gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.timeline}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Rocket className="w-4 h-4 mr-2" />
            <span>{course.careerOpportunities.length} careers</span>
          </div>
          <ShareButton courseId={course.id} courseTitle={course.title} size={"icon"} />
        </div>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button variant="default" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

