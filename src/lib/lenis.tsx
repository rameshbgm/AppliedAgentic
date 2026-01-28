"use client";

import { Lenis as ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function Lenis({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
