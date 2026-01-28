"use client";

import { BookOpen, GraduationCap, Layers, Users, CheckCircle } from "lucide-react";

interface DashboardStatsProps {
    categories: number;
    courses: number;
    lessons: number;
    users: number;
    publishedCourses: number;
}

export function DashboardStats({ categories, courses, lessons, users, publishedCourses }: DashboardStatsProps) {
    const stats = [
        { label: "Categories", value: categories, icon: Layers, color: "bg-blue-600" },
        { label: "Total Courses", value: courses, icon: BookOpen, color: "bg-indigo-600" },
        { label: "Published", value: publishedCourses, icon: CheckCircle, color: "bg-emerald-600" },
        { label: "Lessons", value: lessons, icon: GraduationCap, color: "bg-amber-500" },
        { label: "Users", value: users, icon: Users, color: "bg-rose-500" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${stat.color}`}
                        >
                            <stat.icon className="w-4 h-4" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-500">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
