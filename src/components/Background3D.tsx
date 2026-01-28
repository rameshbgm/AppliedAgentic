"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles({ count = 2000 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;

        // Slow rotation
        ref.current.rotation.x += 0.0003;
        ref.current.rotation.y += 0.0005;

        // Subtle mouse influence
        const targetX = mouseRef.current.x * 0.1;
        const targetY = mouseRef.current.y * 0.1;
        ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.01;
        ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.01;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#8b5cf6"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

export function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={["#0a0a0f"]} />
                <ambientLight intensity={0.5} />
                <FloatingParticles />
            </Canvas>
        </div>
    );
}
