"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Workflow, Sparkles, Server, Database, ArrowRight } from "lucide-react";

interface CategoryData {
    id: string;
    title: string;
    slug: string;
    description: string;
    courseCount: number;
    color: string;
    icon: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    bot: Bot,
    workflow: Workflow,
    sparkles: Sparkles,
    server: Server,
    database: Database,
};

function CategoryIcon({ iconName, className, color }: { iconName: string; className?: string; color?: string }) {
    const IconComponent = iconMap[iconName.toLowerCase()] || Bot;
    return (
        <span style={{ color }}>
            <IconComponent className={className} />
        </span>
    );
}

interface LearningPathsGalleryProps {
    categories: CategoryData[];
}

export function LearningPathsGallery({ categories }: LearningPathsGalleryProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full pt-4 pb-16">
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                    Explore Learning Paths
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg px-6">
                    Curated knowledge modules designed to take you from fundamentals to production-ready skills.
                </p>
            </div>

            {/* Cards Container */}
            <div className="relative px-[10%] sm:px-[15%] lg:px-[20%]">
                <div className="flex justify-center items-center gap-4">
                    {categories.map((category, index) => {
                        const isHovered = hoveredIndex === index;
                        const hasHover = hoveredIndex !== null;
                        const isBlurred = hasHover && !isHovered;

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: isHovered ? 1.08 : 1,
                                    filter: isBlurred ? "blur(3px)" : "blur(0px)",
                                    zIndex: isHovered ? 20 : 10,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                    delay: index * 0.05,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative flex-shrink-0 w-[280px] p-6 rounded-2xl cursor-pointer
                                    bg-white/5 backdrop-blur-xl border border-white/10
                                    transition-colors duration-300"
                                style={{
                                    boxShadow: isHovered
                                        ? `0 0 40px ${category.color}40, 0 20px 60px rgba(0,0,0,0.5)`
                                        : "0 10px 40px rgba(0,0,0,0.2)",
                                    marginLeft: index > 0 ? "-40px" : "0",
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                    style={{ backgroundColor: `${category.color}20` }}
                                >
                                    <CategoryIcon iconName={category.icon} className="w-7 h-7" color={category.color} />
                                </div>

                                {/* Course Count Badge */}
                                <div
                                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                                >
                                    {category.courseCount} COURSES
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-3 font-heading">
                                    {category.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                                    {category.description}
                                </p>

                                {/* View Path Link */}
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                                    style={{ color: category.color }}
                                >
                                    View Path <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { type CategoryData };
