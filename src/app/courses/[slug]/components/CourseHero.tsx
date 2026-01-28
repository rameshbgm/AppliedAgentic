"use client";

import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CourseHeroProps {
    title: string;
    description: string | null;
    category: { title: string; color: string | null; slug: string };
    updatedAt: Date;
    lessonCount: number;
}

export function CourseHero({ title, description, category, updatedAt, lessonCount }: CourseHeroProps) {
    return (
        <section className="pt-24 pb-16 px-6 bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/category/${category.slug}`}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-medium text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {category.title}
                </Link>

                <div>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Link href={`/category/${category.slug}`}>
                            <span
                                className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                                {category.title}
                            </span>
                        </Link>
                    </div>

                    <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
                            {description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500 font-medium py-6 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            <span>{lessonCount} Lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>Last updated {format(new Date(updatedAt), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>~{Math.ceil(lessonCount * 15)} min</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
