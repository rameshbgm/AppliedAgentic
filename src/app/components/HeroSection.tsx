"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass rounded-3xl p-10 sm:p-16 neon-glow"
                >
                    <h1 className="font-heading text-5xl sm:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
                        <span className="text-gradient">Master Agentic AI</span> & <br />
                        <span className="text-white">Intelligent Systems</span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        A comprehensive, guided curriculum for building production-grade autonomous agents and generative AI applications.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#categories"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
                        >
                            Start Learning <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/category/agentic-ai"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white glass border-white/10 hover:bg-white/10 font-bold transition-all flex items-center justify-center"
                        >
                            Browse Catalog
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

