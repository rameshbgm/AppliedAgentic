"use client";

import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative pt-20 sm:pt-28 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="p-6 sm:p-10"
                >
                    <h1 className="font-heading text-5xl sm:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                        <span className="neon-gradient-text-multi">Master Agentic AI</span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        A comprehensive, guided curriculum for building production-grade autonomous agents and generative AI applications.
                    </p>
                </motion.div>
            </div>

            {/* Full Width Animated Gradient Line */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] animated-gradient-line"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </section>
    );
}
