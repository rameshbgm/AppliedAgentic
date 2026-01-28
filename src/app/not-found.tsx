"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-8 text-blue-600">
                    <span className="font-heading font-bold text-3xl">AA</span>
                </div>

                <h1 className="font-heading text-6xl font-black text-slate-900 mb-4 tracking-tight">404</h1>
                <h2 className="text-2xl font-bold text-slate-700 mb-6">Data Not Found</h2>

                <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                    The requested resource could not be found. It may have been moved, deleted, or never existed in the first place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl text-slate-600 bg-white border border-gray-200 hover:bg-gray-50 font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>

            <div className="mt-20 text-slate-400 font-medium text-sm">
                AppliedAgentic Learning Platform
            </div>
        </div>
    );
}
