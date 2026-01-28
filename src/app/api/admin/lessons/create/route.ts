import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
    const formData = await req.formData();
    const courseId = formData.get("courseId") as string;

    const count = await prisma.lesson.count({ where: { courseId } });

    const lesson = await prisma.lesson.create({
        data: {
            title: "Untitled Lesson",
            slug: `untitled-lesson-${Date.now()}`,
            content: "# New Lesson",
            courseId,
            order: count + 1
        }
    });

    // Since we are using form action, we redirect
    return redirect(`/admin/lessons/${lesson.id}`);
}
