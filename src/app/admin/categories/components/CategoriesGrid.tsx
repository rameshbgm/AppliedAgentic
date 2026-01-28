"use client";

import Link from "next/link";
import { Bot, Sparkles, Database, Workflow, Rocket, Edit, BookOpen } from "lucide-react";

interface Category {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    color: string | null;
    icon: string | null;
    _count: { courses: number };
}

interface CategoriesGridProps {
    categories: Category[];
}

const iconMap: Record<string, React.ReactNode> = {
    Bot: <Bot className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    Workflow: <Workflow className="w-6 h-6" />,
    Rocket: <Rocket className="w-6 h-6" />,
};

export function CategoriesGrid({ categories }: CategoriesGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm group hover:border-blue-500 transition-colors"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600"
                        >
                            {category.icon && iconMap[category.icon]
                                ? iconMap[category.icon]
                                : <Sparkles className="w-6 h-6" />
                            }
                        </div>
                        <button
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-gray-50 transition-colors"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                        {category.title}
                    </h3>

                    {category.description && (
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                            {category.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                            <BookOpen className="w-4 h-4" />
                            <span>{category._count.courses} courses</span>
                        </div>
                        <Link
                            href={`/category/${category.slug}`}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            View →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
