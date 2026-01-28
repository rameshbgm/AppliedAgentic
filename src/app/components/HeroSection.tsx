"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-32 px-6 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="font-heading text-5xl sm:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                    Master Agentic AI & <br /> Intelligent Systems
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                    A comprehensive, guided curriculum for building production-grade autonomous agents and generative AI applications.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="#categories"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        Start Learning <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/category/agentic-ai"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl text-slate-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 font-bold transition-all flex items-center justify-center"
                    >
                        Browse Catalog
                    </Link>
                </div>
            </div>
        </section>
    );
}
