"use client";

import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

interface Course {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    categoryTitle: string;
    categoryColor: string | null;
    _count: { lessons: number };
}

interface FeaturedCoursesProps {
    courses: Course[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
    return (
        <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h2 className="font-heading text-4xl font-bold text-slate-900 mb-4">
                            Featured Courses
                        </h2>
                        <p className="text-lg text-slate-600 max-w-xl">
                            Handpicked curricula designed to help you master the latest in AI orchestration and deployment.
                        </p>
                    </div>
                    <Link
                        href="/category/agentic-ai"
                        className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        View all courses <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Link href={`/courses/${course.slug}`} key={course.id} className="block group h-full">
                            <div className="h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col">
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-slate-600">
                                            {course.categoryTitle}
                                        </div>
                                    </div>

                                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>

                                    {course.description && (
                                        <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                                            {course.description}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-6 text-slate-500 text-xs font-bold pt-6 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-blue-600" />
                                            <span>{course._count.lessons} Lessons</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span>{Math.ceil(course._count.lessons * 12)}m</span>
                                        </div>
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
