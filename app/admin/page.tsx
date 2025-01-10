import { AdminCourseList } from '@/components/AdminCourseList'
import { AdminCourseForm } from '@/components/AdminCourseForm'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <AdminCourseForm />
      <AdminCourseList />
    </div>
  )
}

