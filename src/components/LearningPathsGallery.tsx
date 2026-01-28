"use client";

import { useState, useRef, useEffect } from "react";
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

// ... imports
export function LearningPathsGallery({ categories }: LearningPathsGalleryProps) {
    const [rotation, setRotation] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPointerX = useRef(0);
    const [radius, setRadius] = useState(300);

    // Responsive radius
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setRadius(140);
            } else if (width < 1024) {
                setRadius(220);
            } else {
                setRadius(320);
            }
        };

        handleResize(); // Set initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const count = categories.length;
    const anglePerItem = 360 / count;

    const handleWheel = (e: React.WheelEvent) => {
        if (!isPaused) return; // Only allow manual scroll if paused
        setRotation(prev => prev + e.deltaY * 0.1); // Adjust sensitivity
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        lastPointerX.current = e.clientX;
        containerRef.current?.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastPointerX.current;
        setRotation(prev => prev + deltaX * 0.1); // Adjust sensitivity
        lastPointerX.current = e.clientX;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        containerRef.current?.releasePointerCapture(e.pointerId);
    };

    // Auto-rotation loop
    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (!isPaused && !isDragging) {
                setRotation(prev => prev + 0.2); // Faster rotation
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isDragging]);

    return (
        <div
            ref={containerRef}
            className="w-full h-[350px] sm:h-[450px] relative overflow-hidden flex items-center justify-center perspective-[1000px] touch-none select-none"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {/* Section Title */}
            <div className="absolute top-4 sm:top-8 left-0 w-full text-center z-50 pointer-events-none px-4">
                <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-md">
                    Explore Learning Paths
                </h2>
            </div>

            <div className="relative w-full h-full flex items-center justify-center transform-style-3d top-8 sm:top-12">
                {categories.map((category, index) => {
                    const itemAngle = (index * anglePerItem) + rotation;
                    const radian = (itemAngle * Math.PI) / 180;

                    // 3D positioning
                    const x = Math.sin(radian) * radius;
                    const z = Math.cos(radian) * radius - radius;

                    // Visibility logic
                    const distance = Math.abs(z);
                    const opacity = Math.max(0.1, 1 - (distance / (radius * 1.8)));
                    const scale = Math.max(0.6, 1 - (distance / (radius * 3)));
                    const zIndex = Math.round(100 - distance);

                    return (
                        <motion.div
                            key={category.id}
                            className="absolute"
                            style={{
                                x: x,
                                z: z,
                                scale: scale,
                                opacity: opacity,
                                zIndex: zIndex,
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onTouchStart={() => setIsPaused(true)}
                            onTouchEnd={() => setIsPaused(false)}
                        >
                            <div className="w-[240px] sm:w-[280px] p-5 sm:p-6 rounded-2xl
                                bg-white/5 backdrop-blur-xl border border-white/10
                                shadow-2xl flex flex-col items-center text-center
                                cursor-default">

                                {/* Icon */}
                                <div
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
                                    style={{ backgroundColor: `${category.color}20` }}
                                >
                                    <CategoryIcon iconName={category.icon} className="w-6 h-6 sm:w-7 sm:h-7" color={category.color} />
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{category.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-400 mb-4 line-clamp-2">{category.description}</p>

                                {/* Link wraps ONLY the button part */}
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline cursor-pointer transition-all hover:scale-105 active:scale-95"
                                    style={{ color: category.color }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <span>View Path</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export { type CategoryData };
