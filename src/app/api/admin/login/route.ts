import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple hash function matching seed.ts
function hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
}

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        // Find user in database
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Verify password
        const hashedAttempt = hashPassword(password);
        if (user.password !== hashedAttempt) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create JWT with user info
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-change-me");
        const alg = "HS256";

        const token = await new SignJWT({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        })
            .setProtectedHeader({ alg })
            .setExpirationTime("24h")
            .sign(secret);

        (await cookies()).set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
