"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CategoryHeroProps {
    title: string;
    description: string | null;
    color: string | null;
    courseCount: number;
}

export function CategoryHero({ title, description, color, courseCount }: CategoryHeroProps) {
    return (
        <section className="pt-24 pb-16 px-6 bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-medium text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div>
                    <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6 bg-blue-50 text-blue-700"
                    >
                        {courseCount} Courses
                    </div>

                    <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
