"use client";

import Link from "next/link";
import { BookOpen, Clock, ChevronRight } from "lucide-react";

interface Course {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    _count: { lessons: number };
    lessons: { slug: string }[];
}

interface CourseListProps {
    courses: Course[];
    categorySlug: string;
    categoryColor: string | null;
}

export function CourseList({ courses, categorySlug, categoryColor }: CourseListProps) {
    return (
        <section className="px-6 py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <div className="space-y-6">
                    {courses.map((course, idx) => (
                        <Link href={`/courses/${course.slug}`} key={course.id} className="block group">
                            <div className="bg-white rounded-xl p-8 border border-gray-200 transition-all hover:border-blue-500 hover:shadow-md">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span
                                                className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400"
                                            >
                                                Course {String(idx + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {course.title}
                                        </h3>

                                        {course.description && (
                                            <p className="text-slate-600 mb-4 line-clamp-2 text-lg">
                                                {course.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{course._count.lessons} Lessons</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>~{Math.ceil(course._count.lessons * 8)} min</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-start sm:self-center">
                                        <span
                                            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-all"
                                        >
                                            Start Learning
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
