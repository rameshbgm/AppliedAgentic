"use client";

import { useEffect, useRef } from "react";

export function AnimatedGridBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = clientX - container.getBoundingClientRect().left;
            const y = clientY - container.getBoundingClientRect().top;
            container.style.setProperty("--mouse-x", `${x}px`);
            container.style.setProperty("--mouse-y", `${y}px`);
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#030b17]">
            {/* Zooming Dots Pattern */}
            <div
                className="absolute inset-0 animate-zoom"
                style={{
                    backgroundImage: `radial-gradient(circle, #7dd3fc 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030b17]/50 to-[#030b17]" />
        </div>
    );
}
