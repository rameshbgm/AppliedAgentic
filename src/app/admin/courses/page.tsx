import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { CoursesTable } from "@/app/admin/courses/components/CoursesTable";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
    const courses = await prisma.course.findMany({
        include: {
            category: true,
            _count: { select: { lessons: true } },
        },
        orderBy: { updatedAt: "desc" },
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-slate-900">Courses</h1>
                    <p className="text-slate-500 mt-1 text-sm">Manage all learning content</p>
                </div>
                <Link
                    href="/admin/courses/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all font-medium text-sm shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    New Course
                </Link>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatBox label="Total Courses" value={courses.length} />
                <StatBox label="Published" value={courses.filter(c => c.status === "PUBLISHED").length} color="text-emerald-700 bg-emerald-50" />
                <StatBox label="Draft" value={courses.filter(c => c.status === "DRAFT").length} color="text-amber-700 bg-amber-50" />
                <StatBox label="Total Lessons" value={courses.reduce((sum, c) => sum + c._count.lessons, 0)} />
            </div>

            {/* Courses Table */}
            <CoursesTable courses={courses} />
        </div>
    );
}

function StatBox({ label, value, color = "text-blue-700 bg-blue-50" }: { label: string; value: number; color?: string }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className={`text-2xl font-heading font-bold ${color.split(' ')[0] || 'text-slate-900'}`}>{value}</div>
            <div className="text-sm text-slate-500">{label}</div>
        </div>
    );
}
