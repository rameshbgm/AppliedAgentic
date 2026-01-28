"use client";

import { motion } from "framer-motion";
import { AnimatedGridBackground } from "./AnimatedGridBackground";

export function HeroSection() {
    return (
        <section className="relative pt-8 sm:pt-12 px-6 overflow-hidden">
            <AnimatedGridBackground />
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="p-6 sm:p-10"
                >
                    <h1 className="font-mono text-6xl sm:text-8xl font-bold mb-6 tracking-tight leading-[1.1]">
                        <span className="neon-gradient-text-multi">Applied Agentic</span>
                    </h1>

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
