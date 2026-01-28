import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const maxDuration = 60; // Allow longer timeout for sync

export async function POST(req: Request) {
    // 1. Fetch all lessons
    const lessons = await prisma.lesson.findMany();
    let count = 0;

    // 2. Clear existing embeddings (optional, or upsert)
    // For simplicity, we delete all and recreate. 
    // In prod, check hash or 'updatedAt' vs 'lastEmbeddedAt'
    await prisma.lessonEmbedding.deleteMany({});

    // 3. Generate embeddings
    for (const lesson of lessons) {
        try {
            const { embedding } = await embed({
                model: openai.embedding("text-embedding-3-small"),
                value: lesson.content,
            });

            // 4. Save to DB
            // Prisma 5.19+ pgvector support through raw query or TypedSQL 
            // We use executeRaw to insert vector data
            const vectorString = `[${embedding.join(",")}]`;

            await prisma.$executeRaw`
                INSERT INTO "LessonEmbedding" ("id", "lessonId", "content", "vector", "createdAt")
                VALUES (gen_random_uuid(), ${lesson.id}, ${lesson.content}, ${vectorString}::vector, NOW())
            `;

            count++;
        } catch (e) {
            console.error(`Failed to embed lesson ${lesson.id}`, e);
        }
    }

    return NextResponse.json({ success: true, count });
}
