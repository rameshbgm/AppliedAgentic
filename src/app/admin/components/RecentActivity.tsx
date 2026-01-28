"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Course {
    id: string;
    title: string;
    slug: string;
    status: string;
    updatedAt: Date;
    category: { title: string; color: string | null };
}

interface RecentActivityProps {
    courses: Course[];
}

export function RecentActivity({ courses }: RecentActivityProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wide">Recent Activity</h3>
                <Link
                    href="/admin/courses"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-3">
                {courses.map((course) => (
                    <Link
                        key={course.id}
                        href={`/admin/courses/${course.id}`}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-8 rounded-full bg-blue-500" />
                            <div>
                                <h4 className="font-medium text-slate-900">
                                    {course.title}
                                </h4>
                                <p className="text-sm text-slate-500">{course.category.title}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${course.status === "PUBLISHED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}>
                                {course.status}
                            </span>
                            <p className="text-xs text-slate-400 mt-1">
                                {formatDistanceToNow(new Date(course.updatedAt), { addSuffix: true })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
