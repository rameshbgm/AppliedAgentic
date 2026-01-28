import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CategoriesGrid } from "@/app/admin/categories/components/CategoriesGrid";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            _count: { select: { courses: true } },
        },
        orderBy: { title: "asc" },
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-slate-900">Categories</h1>
                    <p className="text-slate-500 mt-1 text-sm">Organize courses into learning paths</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all text-sm shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    New Category
                </button>
            </div>

            {/* Categories Grid */}
            <CategoriesGrid categories={categories} />
        </div>
    );
}
