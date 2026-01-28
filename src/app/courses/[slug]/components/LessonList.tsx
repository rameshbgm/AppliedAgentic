"use client";

import Link from "next/link";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import { useEffect, useState } from "react";

interface Lesson {
    id: string;
    title: string;
    slug: string;
    order: number;
}

interface LessonListProps {
    lessons: Lesson[];
    courseSlug: string;
}

export function LessonList({ lessons, courseSlug }: LessonListProps) {
    const [progress, setProgress] = useState<Record<string, { visited: boolean; completed: boolean }>>({});

    useEffect(() => {
        const key = `progress-${courseSlug}`;
        const saved = JSON.parse(localStorage.getItem(key) || "{}");
        setProgress(saved);
    }, [courseSlug]);

    return (
        <section className="px-6 py-12 bg-gray-50 min-h-[50vh]">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-heading text-xl font-bold text-slate-900">Course Content</h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {lessons.map((lesson, idx) => {
                            const isCompleted = progress[lesson.slug]?.completed;
                            const isVisited = progress[lesson.slug]?.visited;

                            return (
                                <Link
                                    href={`/courses/${courseSlug}/${lesson.slug}`}
                                    key={lesson.id}
                                    className="flex items-center gap-4 p-5 hover:bg-blue-50/50 transition-colors group"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                                        {isCompleted ? (
                                            <CheckCircle className="w-6 h-6 text-green-500 fill-green-50" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className={`font-medium ${isVisited ? "text-slate-900" : "text-slate-700"} group-hover:text-blue-700 transition-colors`}>
                                            {lesson.title}
                                        </h3>
                                    </div>

                                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                                        <PlayCircle className="w-5 h-5" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
