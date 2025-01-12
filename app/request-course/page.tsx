'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { key } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'

export default function CourseRequestForm() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        courseDetails: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    access_key: key,
                }),
            });
            const result = await response.json();
            if (result.success) {
                toast({
                    title: "Course request submitted",
                    description: "Thank you for your request. We'll get back to you soon!",
                })
                setFormData({ name: '', email: '', courseDetails: '' })
            } else {
                throw new Error('Failed to submit course request')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was a problem submitting your request. Please try again.",
                variant: "destructive",
            });
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="flex items-center justify-center h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="shadow-lg rounded-lg p-4 md:p-8 m-4 md:m-0 w-full max-w-xl space-y-6 border border-gray-200"
            >
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 text-center">Course Request Form</h1>
                    <p className="text-gray-600 text-center">
                        Let us know about the course you&apos;d like to see!
                    </p>
                </div>

                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                </div>

                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                </div>

                <div>
                    <Label htmlFor="courseDetails" className="block text-sm font-medium text-gray-700">
                        Course Details
                    </Label>
                    <Textarea
                        id="courseDetails"
                        name="courseDetails"
                        value={formData.courseDetails}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="Please describe the course you'd like to see offered."
                        className="mt-1 resize-none block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white py-2 px-4 rounded-md shadow-md"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
            </form>
        </div>

    )
}
