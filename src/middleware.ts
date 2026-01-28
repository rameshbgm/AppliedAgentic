import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Skip protection for login
        if (request.nextUrl.pathname === "/admin/login") {
            return NextResponse.next();
        }

        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-change-me");
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
