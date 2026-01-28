import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/lessons/[id]
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lesson = await prisma.lesson.findUnique({
        where: { id },
    });
    return NextResponse.json(lesson);
}

// PATCH /api/admin/lessons/[id]
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, content } = body;

    const lesson = await prisma.lesson.update({
        where: { id },
        data: { title, slug, content },
    });

    return NextResponse.json(lesson);
}
