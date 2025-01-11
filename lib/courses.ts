import clientPromise from '@/db/mongodb'
import { Course } from '@/types/course'
import { ObjectId } from 'mongodb'

export async function getCourses(cursor = '', limit = 20, search = '') {
    const client = await clientPromise
    const db = client.db("finderx")
    const coursesCollection = db.collection("courses")

    let query = {}
    if (search) {
        query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ]
        }
    }

    const cursorObject = cursor ? { _id: { $gt: new ObjectId(cursor) } } : {}
    const finalQuery = { ...query, ...cursorObject }

    const courses = await coursesCollection
        .find(finalQuery)
        .limit(limit + 1)
        .toArray()

    const hasNextPage = courses.length > limit
    const paginatedCourses = hasNextPage ? courses.slice(0, -1) : courses

    const nextCursor = hasNextPage ? paginatedCourses[paginatedCourses.length - 1]._id.toString() : null

    return {
        courses: paginatedCourses.map(course => ({
            ...course,
            id: course._id.toString(),
            _id: undefined
        })),
        nextCursor
    }
}

export async function getCourse(id: string) {
    const client = await clientPromise
    const db = client.db("finderx")
    const coursesCollection = db.collection("courses")

    const course = await coursesCollection.findOne({ _id: new ObjectId(id) })

    if (course) {
        return {
            ...course,
            id: course._id.toString(),
            _id: undefined
        }
    }

    return null
}

export async function addCourse(course: Course) {
    const client = await clientPromise
    const db = client.db("finderx")
    const coursesCollection = db.collection("courses")

    const courseWithObjectId = { ...course, _id: new ObjectId(course.id), timestamp: new Date().toISOString() }
    const result = await coursesCollection.insertOne(courseWithObjectId)
    return {
        ...course,
        id: result.insertedId.toString(),
        _id: undefined
    }
}

export async function updateCourse(id: string, updatedCourse: Partial<Course>) {
    const client = await clientPromise
    const db = client.db("finderx")
    const coursesCollection = db.collection("courses")

    const result = await coursesCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedCourse },
        { returnDocument: 'after' }
    )

    if (result && result.value) {
        return {
            ...result.value,
            id: result.value._id.toString(),
            _id: undefined
        }
    }

    return null
}

export async function deleteCourse(id: string) {
    const client = await clientPromise
    const db = client.db("finderx")
    const coursesCollection = db.collection("courses")

    await coursesCollection.deleteOne({ _id: new ObjectId(id) })
}

