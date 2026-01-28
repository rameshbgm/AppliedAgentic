import prisma from "@/lib/prisma";
import { SyncButton } from "./sync-button";
import { DashboardStats } from "./components/DashboardStats";
import { QuickActions } from "./components/QuickActions";
import { RecentActivity } from "./components/RecentActivity";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const [categories, courses, lessons, users, publishedCourses] = await Promise.all([
        prisma.category.count(),
        prisma.course.count(),
        prisma.lesson.count(),
        prisma.user.count(),
        prisma.course.count({ where: { status: "PUBLISHED" } }),
    ]);

    const recentCourses = await prisma.course.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        include: { category: true },
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1 text-sm">Overview of platform activity</p>
                </div>
                <SyncButton />
            </div>

            {/* Stats Grid */}
            <DashboardStats
                categories={categories}
                courses={courses}
                lessons={lessons}
                users={users}
                publishedCourses={publishedCourses}
            />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RecentActivity courses={recentCourses} />
                </div>
                <div>
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}
