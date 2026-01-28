"use client";

import Link from "next/link";
import { Bot, Database, Rocket, Sparkles, Workflow, ArrowRight } from "lucide-react";

interface CategoryCardProps {
    title: string;
    slug: string;
    description?: string;
    count: number;
    color?: string;
    icon?: string;
    index: number;
}

const iconMap: Record<string, React.ReactNode> = {
    Bot: <Bot className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    Workflow: <Workflow className="w-6 h-6" />,
    Rocket: <Rocket className="w-6 h-6" />,
};

export function CategoryCard({ title, slug, description, count, color = "#2563eb", icon, index }: CategoryCardProps) {
    return (
        <Link href={`/category/${slug}`} className="block h-full group">
            <div className="h-full bg-white border border-gray-200 rounded-2xl p-8 transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600"
                    >
                        {icon && iconMap[icon] ? iconMap[icon] : <Sparkles className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50/50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {count} Courses
                    </span>
                </div>

                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {title}
                </h2>

                {description && (
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                        {description}
                    </p>
                )}

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-blue-600 font-bold text-sm">
                    <span>View Path</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
