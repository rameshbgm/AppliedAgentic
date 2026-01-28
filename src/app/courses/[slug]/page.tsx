import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CourseHero } from "./components/CourseHero";
import { LessonList } from "./components/LessonList";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const course = await prisma.course.findUnique({
        where: { slug },
        include: {
            lessons: { orderBy: { order: "asc" } },
            category: true,
        },
    });

    if (!course) notFound();

    const totalTime = course.lessons.length * 8; // ~8 min per lesson

    return (
        <div className="min-h-screen">
            <CourseHero
                title={course.title}
                description={course.description}
                category={course.category}
                updatedAt={course.updatedAt}
                lessonCount={course.lessons.length}
            />

            <LessonList
                lessons={course.lessons}
                courseSlug={course.slug}
                categoryColor={course.category.color}
            />
        </div>
    );
}
