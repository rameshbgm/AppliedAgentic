import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CategoryHero } from "./components/CategoryHero";
import { CourseList } from "./components/CourseList";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            courses: {
                where: { status: "PUBLISHED" },
                orderBy: { order: "asc" },
                include: {
                    _count: { select: { lessons: true } },
                    lessons: {
                        take: 1,
                        orderBy: { order: "asc" },
                        select: { slug: true }
                    }
                }
            }
        }
    });

    if (!category) notFound();

    return (
        <div className="min-h-screen">
            <CategoryHero
                title={category.title}
                description={category.description}
                color={category.color}
                courseCount={category.courses.length}
            />

            <CourseList
                courses={category.courses}
                categorySlug={category.slug}
                categoryColor={category.color}
            />
        </div>
    );
}
