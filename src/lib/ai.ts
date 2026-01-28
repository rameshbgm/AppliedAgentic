import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import prisma from "@/lib/prisma";

export async function findRelevantContent(query: string) {
    // Generate embedding for the query
    const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: query,
    });

    // Query database for similar content
    // Note: We cast the vector to string for pgvector query formatted as '[1,2,3]'
    // Prisma 5.19+ supports vector types in simpler ways but raw query remains most robust for vector ops
    const vectorQuery = `[${embedding.join(",")}]`;

    // Use raw query to calculate cosine distance
    // We use <=> operator for cosine distance (lower is better, so we sort ASC)
    // Or 1 - (v1 <=> v2) for similarity (higher is better)
    const results = await prisma.$queryRaw`
    SELECT 
      le.content,
      l.title as "lessonTitle",
      c.title as "courseTitle",
      1 - (le.vector <=> ${vectorQuery}::vector) as similarity
    FROM "LessonEmbedding" le
    JOIN "Lesson" l ON le."lessonId" = l.id
    JOIN "Course" c ON l."courseId" = c.id
    WHERE 1 - (le.vector <=> ${vectorQuery}::vector) > 0.5
    ORDER BY similarity DESC
    LIMIT 3;
  `;

    return results as Array<{ content: string; lessonTitle: string; courseTitle: string; similarity: number }>;
}
