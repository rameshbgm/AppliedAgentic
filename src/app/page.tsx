import prisma from "@/lib/prisma";
import { HeroSection } from "@/app/components/HeroSection";
import { FeaturedCourses } from "@/app/components/FeaturedCourses";
import { Footer } from "@/app/components/Footer";
import { LearningPathsGalleryWrapper } from "@/components/LearningPathsGalleryWrapper";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { courses: true } },
      courses: {
        where: { status: "PUBLISHED" },
        take: 3,
        orderBy: { order: "asc" },
        include: { _count: { select: { lessons: true } } }
      },
    },
    orderBy: { title: "asc" },
  });

  const featuredCourses = categories.flatMap(c =>
    c.courses.map(course => ({ ...course, categoryTitle: c.title, categoryColor: c.color }))
  ).slice(0, 6);

  // Transform categories for the 3D gallery
  const galleryCategories = categories.map(c => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description || "Explore this learning path",
    courseCount: c._count.courses,
    color: c.color || "#8b5cf6",
    icon: c.icon || "bot",
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />

      {/* 3D Learning Paths Gallery */}
      <section className="py-16">
        <LearningPathsGalleryWrapper categories={galleryCategories} />
      </section>

      {/* Featured Courses */}
      <FeaturedCourses courses={featuredCourses} />

      <Footer />
    </div>
  );
}

