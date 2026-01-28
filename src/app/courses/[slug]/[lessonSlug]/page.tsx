import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LessonReader } from "@/app/courses/[slug]/[lessonSlug]/components/LessonReader";

export const dynamic = "force-dynamic";

export default async function LessonPage({
    params
}: {
    params: Promise<{ slug: string; lessonSlug: string }>
}) {
    const { slug, lessonSlug } = await params;

    const lesson = await prisma.lesson.findUnique({
        where: { slug: lessonSlug },
        include: {
            course: {
                include: {
                    lessons: { orderBy: { order: "asc" } },
                    category: true,
                }
            }
        }
    });

    if (!lesson || lesson.course.slug !== slug) notFound();

    const currentIndex = lesson.course.lessons.findIndex(l => l.id === lesson.id);
    const nextLesson = lesson.course.lessons[currentIndex + 1];
    const prevLesson = lesson.course.lessons[currentIndex - 1];
    const totalLessons = lesson.course.lessons.length;

    return (
        <LessonReader
            lesson={lesson}
            course={lesson.course}
            category={lesson.course.category}
            currentIndex={currentIndex}
            totalLessons={totalLessons}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        />
    );
}
