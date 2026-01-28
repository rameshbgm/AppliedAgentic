import prisma from "@/lib/prisma";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroSection } from "./components/HeroSection";
import { FeaturedCourses } from "./components/FeaturedCourses";
import { Footer } from "./components/Footer";

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

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Categories Section */}
      <section className="px-6 sm:px-12 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Explore Learning Paths
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Curated knowledge modules designed to take you from fundamentals to production-ready skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <CategoryCard
                key={category.id}
                index={idx}
                title={category.title}
                slug={category.slug}
                description={category.description || undefined}
                count={category._count.courses}
                color={category.color || undefined}
                icon={category.icon || undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <FeaturedCourses courses={featuredCourses} />

      <Footer />
    </div>
  );
}
