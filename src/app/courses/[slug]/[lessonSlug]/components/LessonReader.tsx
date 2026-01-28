"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight, ChevronLeft, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Lesson {
    id: string;
    title: string;
    slug: string;
    content: string;
}

interface Course {
    title: string;
    slug: string;
}

interface Category {
    title: string;
    slug: string;
    color: string | null;
}

interface LessonReaderProps {
    lesson: Lesson;
    course: Course;
    category: Category;
    currentIndex: number;
    totalLessons: number;
    prevLesson?: { title: string; slug: string };
    nextLesson?: { title: string; slug: string };
}

export function LessonReader({
    lesson,
    course,
    category,
    currentIndex,
    totalLessons,
    prevLesson,
    nextLesson,
}: LessonReaderProps) {
    const [isComplete, setIsComplete] = useState(false);

    // Save progress to localStorage
    useEffect(() => {
        const key = `progress-${course.slug}`;
        const progress = JSON.parse(localStorage.getItem(key) || "{}");
        progress[lesson.slug] = { visited: true, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(progress));
    }, [course.slug, lesson.slug]);

    const handleMarkComplete = () => {
        setIsComplete(true);
        const key = `progress-${course.slug}`;
        const progress = JSON.parse(localStorage.getItem(key) || "{}");
        progress[lesson.slug] = { visited: true, completed: true, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(progress));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="font-medium text-sm">Back to Course</span>
                    </Link>

                    <div className="text-center hidden sm:block">
                        <span className="text-xs text-slate-500 font-mono uppercase tracking-wide">
                            Lesson {currentIndex + 1} of {totalLessons}
                        </span>
                    </div>

                    <button
                        onClick={handleMarkComplete}
                        disabled={isComplete}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isComplete
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 hover:bg-gray-200 text-slate-700"
                            }`}
                    >
                        <CheckCircle className={`w-4 h-4 ${isComplete ? "fill-current" : ""}`} />
                        <span>{isComplete ? "Completed" : "Mark Complete"}</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-32 px-6">
                <article className="max-w-prose mx-auto">
                    {/* Title */}
                    <div className="mb-10 text-center">
                        <div
                            className="inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider mb-4 text-slate-500 bg-gray-100"
                        >
                            {category.title}
                        </div>
                        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                            {lesson.title}
                        </h1>
                        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-slate max-w-none prose-lg prose-headings:font-heading prose-headings:font-bold prose-a:text-blue-600">
                        <ReactMarkdown>{lesson.content}</ReactMarkdown>
                    </div>

                    {/* Navigation */}
                    <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                        {prevLesson ? (
                            <Link
                                href={`/courses/${course.slug}/${prevLesson.slug}`}
                                className="flex-1 p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                            >
                                <div className="text-xs text-slate-500 mb-1 group-hover:text-blue-600">Previous Lesson</div>
                                <div className="font-bold text-slate-900">{prevLesson.title}</div>
                            </Link>
                        ) : <div className="flex-1" />}

                        {nextLesson ? (
                            <Link
                                href={`/courses/${course.slug}/${nextLesson.slug}`}
                                className="flex-1 p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-right"
                            >
                                <div className="text-xs text-slate-500 mb-1 group-hover:text-blue-600">Next Lesson</div>
                                <div className="font-bold text-slate-900">{nextLesson.title}</div>
                            </Link>
                        ) : (
                            <Link
                                href={`/courses/${course.slug}`}
                                className="flex-1 p-6 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all text-center"
                            >
                                <div className="font-bold text-slate-900">Finish Course</div>
                                <div className="text-xs text-slate-500 mt-1">Return to Overview</div>
                            </Link>
                        )}
                    </div>
                </article>
            </main>
        </div>
    );
}
