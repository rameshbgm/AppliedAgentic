"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Eye, Edit, BookOpen } from "lucide-react";

interface Course {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    status: string;
    updatedAt: Date;
    category: { title: string; color: string | null };
    _count: { lessons: number };
}

interface CoursesTableProps {
    courses: Course[];
}

export function CoursesTable({ courses }: CoursesTableProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lessons</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Updated</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {courses.map((course) => (
                            <tr
                                key={course.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div>
                                        <Link
                                            href={`/admin/courses/${course.id}`}
                                            className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                                        >
                                            {course.title}
                                        </Link>
                                        {course.description && (
                                            <p className="text-sm text-slate-500 truncate max-w-xs mt-0.5">
                                                {course.description}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                                    >
                                        {course.category.title}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <BookOpen className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">{course._count.lessons}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === "PUBLISHED"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-amber-100 text-amber-700"
                                        }`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {formatDistanceToNow(new Date(course.updatedAt), { addSuffix: true })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            className="p-2 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-900 transition-colors"
                                            title="View Public"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/courses/${course.id}`}
                                            className="p-2 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-900 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {courses.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No courses found. Create your first course to get started.
                </div>
            )}
        </div>
    );
}
