import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog"
import { FileText } from "lucide-react"
import Link from "next/link"

export function CourseModal() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Resource Details</DialogTitle>
                <DialogDescription>
                    You request for a new resource or if you have an existing one then submit the details here.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 items-center gap-4">
                    <DialogClose asChild>
                        <Link href="/request-course">
                            <Button variant="default" size="sm" className="flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Request a Resource
                            </Button>
                        </Link>
                    </DialogClose>
                    <DialogClose asChild>
                        <Link href="/submit-course">
                            <Button variant="default" size="sm" className="flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Submit a Resource
                            </Button>
                        </Link>
                    </DialogClose>
                </div>
            </div>
        </DialogContent>
    )
}
