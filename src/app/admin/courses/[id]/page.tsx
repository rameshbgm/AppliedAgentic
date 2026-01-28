import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Plus, Edit } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCourseDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            lessons: {
                orderBy: { order: "asc" }
            }
        }
    });

    if (!course) notFound();

    return (
        <div>
            <Link href="/admin/courses" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-8">
                <ArrowLeft size={16} /> Back to Courses
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
                    <code className="text-zinc-500 bg-white/5 px-2 py-1 rounded">/courses/{course.slug}</code>
                </div>
                <form action="/api/admin/lessons/create" method="POST">
                    <input type="hidden" name="courseId" value={course.id} />
                    <button type="submit" className="bg-neon-cyan text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neon-cyan/90">
                        <Plus size={18} /> Add Lesson
                    </button>
                </form>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 text-zinc-400 text-sm bg-black/20">
                            <th className="p-4 w-16 text-center">#</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {course.lessons.map((lesson, idx) => (
                            <tr key={lesson.id} className="hover:bg-white/5">
                                <td className="p-4 text-center text-zinc-500">{idx + 1}</td>
                                <td className="p-4 font-medium text-white">{lesson.title}</td>
                                <td className="p-4 text-zinc-400 font-mono text-sm">{lesson.slug}</td>
                                <td className="p-4 text-right">
                                    <Link href={`/admin/lessons/${lesson.id}`} className="inline-flex items-center gap-1 text-neon-cyan hover:underline">
                                        <Edit size={14} /> Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {course.lessons.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                        No lessons yet. Click "Add Lesson" to start.
                    </div>
                )}
            </div>
        </div>
    );
}
