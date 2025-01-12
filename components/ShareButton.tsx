'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ShareButtonProps {
    courseId: string
    courseTitle: string
    size: "default" | "sm" | "lg" | "icon" | null | undefined
}

export function ShareButton({ courseId, courseTitle, size }: ShareButtonProps) {
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
        <>
            {size === "icon" ? (
                <div className="flex items-center text-sm text-muted-foreground cursor-pointer">
                    <Share className="h-4 w-4 mr-2" />
                    <span>share</span>
                </div>
            ) : (
                <Button
                    variant='default'
                    size={size}
                    onClick={handleShare}
                    disabled={isSharing}
                >
                    <Share2 className="h-5 w-5 mr-2" />
                    {isSharing ? 'Sharing...' : 'Share'}
                </Button>
            )}
        </>
    )
}
