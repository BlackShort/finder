'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CourseSubmissionForm() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        courseName: "",
        courseDescription: "",
        contentOutline: [""],
        resources: [""],
        careerOpportunities: [""],
    })

    // Handle changes in single fields (courseName, courseDescription)
    const handleFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: keyof typeof formData
    ) => {
        setFormData({ ...formData, [fieldName]: e.target.value })
    }

    // Handle changes in array fields (contentOutline, resources, careerOpportunities)
    const handleArrayChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof typeof formData,
        index: number
    ) => {
        const updatedArray = [...(formData[fieldName] as string[])]
        updatedArray[index] = e.target.value
        setFormData({ ...formData, [fieldName]: updatedArray })
    }

    // Add a new field in arrays
    const addField = (fieldName: keyof typeof formData) => {
        const updatedArray = [...(formData[fieldName] as string[]), ""]
        setFormData({ ...formData, [fieldName]: updatedArray })
    }

    // Remove a field from arrays
    const removeField = (fieldName: keyof typeof formData, index: number) => {
        const updatedArray = (formData[fieldName] as string[]).filter((_, i) => i !== index)
        setFormData({ ...formData, [fieldName]: updatedArray })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const dataToSubmit = {
                ...formData,
                access_key: process.env.WEB3FORMS_ACCESS_KEY,
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });
            const result = await response.json();
            if (result.success) {
                toast({
                    title: "Course submitted successfully",
                    description: "Thank you for your submission. We'll review it shortly.",
                })
                setFormData({
                    courseName: "",
                    courseDescription: "",
                    contentOutline: [""],
                    resources: [""],
                    careerOpportunities: [""],
                })
            } else {
                throw new Error('Failed to submit course')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was a problem submitting the course. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="shadow-lg rounded-lg p-8 w-full max-w-xl space-y-6 border border-gray-200"
            >
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                    Course Submission
                </h1>

                {/* Course Name */}
                <div>
                    <Label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                        Course Name
                    </Label>
                    <Input
                        value={formData.courseName}
                        onChange={(e) => handleFieldChange(e, "courseName")}
                        placeholder="Enter Course Name"
                        className="mt-2 rounded-md border-gray-300 focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                </div>

                {/* Course Description */}
                <div>
                    <Label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
                        Course Description
                    </Label>
                    <Textarea
                        value={formData.courseDescription}
                        onChange={(e) => handleFieldChange(e, "courseDescription")}
                        rows={5}
                        placeholder="Enter Course Description"
                        className="mt-2 resize-none rounded-md border-gray-300 focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                </div>

                {/* Content Outline */}
                <div>
                    <Label htmlFor="contentOutline" className="block text-sm font-medium text-gray-700">
                        Content Outline
                    </Label>
                    {formData.contentOutline.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                            <Input
                                value={item}
                                onChange={(e) => handleArrayChange(e, "contentOutline", index)}
                                placeholder={`Content Outline ${index + 1}`}
                                className="flex-1 rounded-md border-gray-300 focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                            />
                            {index === formData.contentOutline.length - 1 ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => addField("contentOutline")}
                                    className="p-2"
                                >
                                    <PlusIcon className="w-5 h-5 text-neutral-500" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeField("contentOutline", index)}
                                    className="p-2"
                                >
                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Resources */}
                <div>
                    <Label htmlFor="resources" className="block text-sm font-medium text-gray-700">
                        Resources
                    </Label>
                    {formData.resources.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                            <Input
                                value={item}
                                onChange={(e) => handleArrayChange(e, "resources", index)}
                                placeholder={`Resource ${index + 1}`}
                                className="flex-1 rounded-md border-gray-300 focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                            />
                            {index === formData.resources.length - 1 ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => addField("resources")}
                                    className="p-2"
                                >
                                    <PlusIcon className="w-5 h-5 text-neutral-500" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeField("resources", index)}
                                    className="p-2"
                                >
                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Career Opportunities */}
                <div>
                    <Label htmlFor="careerOpportunities" className="block text-sm font-medium text-gray-700">
                        Career Opportunities
                    </Label>
                    {formData.careerOpportunities.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                            <Input
                                value={item}
                                onChange={(e) => handleArrayChange(e, "careerOpportunities", index)}
                                placeholder={`Career Opportunity ${index + 1}`}
                                className="flex-1 rounded-md border-gray-300 focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                            />
                            {index === formData.careerOpportunities.length - 1 ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => addField("careerOpportunities")}
                                    className="p-2"
                                >
                                    <PlusIcon className="w-5 h-5 text-neutral-500" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeField("careerOpportunities", index)}
                                    className="p-2"
                                >
                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <Button type="submit"
                    disabled={isSubmitting}
                    className="w-full">
                    {isSubmitting ? 'Submitting...' : 'Submit Course'}
                </Button>
            </form>
        </div>
    )
}
