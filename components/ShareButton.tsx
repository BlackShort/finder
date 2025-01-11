'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ShareButtonProps {
    courseId: string
    courseTitle: string
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    size: "default" | "sm" | "lg" | "icon" | null | undefined
}

export function ShareButton({ courseId, courseTitle, variant, size }: ShareButtonProps) {
    const { toast } = useToast()
    const [isSharing, setIsSharing] = useState(false)

    const shareUrl = `${window.location.origin}/courses/${courseId}`

    const handleShare = async () => {
        setIsSharing(true)
        try {
            if (navigator.share) {
                await navigator.share({
                    title: courseTitle,
                    text: `Check out this course: ${courseTitle}`,
                    url: shareUrl,
                })
            } else {
                await navigator.clipboard.writeText(shareUrl)
                toast({
                    title: "Link copied!",
                    description: "The course link has been copied to your clipboard.",
                })
            }
        } catch (error) {
            console.error('Error sharing:', error)
            toast({
                title: "Sharing failed",
                description: "There was an error sharing the course link.",
                variant: "destructive",
            })
        } finally {
            setIsSharing(false)
        }
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleShare}
            disabled={isSharing}
        >
            <Share2 className="h-4 w-4 mr-2 text-muted-foreground" />
            {size !== 'icon' && (isSharing ? 'Sharing...' : 'Share')}
        </Button>
    )
}
