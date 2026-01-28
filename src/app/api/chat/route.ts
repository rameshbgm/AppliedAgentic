import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { findRelevantContent } from "@/lib/ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const context = await findRelevantContent(lastMessage.content);

    const systemMessage = `You reside in "AppliedAgentic", a futuristic learning platform for masters.
  You are the "Agent Guide", an AI Tutor.
  
  Context from the learning modules:
  ${context.map((c) => `[${c.courseTitle} - ${c.lessonTitle}]: ${c.content}`).join("\n\n")}
  
  Instructions:
  - Answer questions based ONLY on the provided context if possible.
  - If the answer is not in the context, use your general knowledge but mention it's outside the current course material.
  - Keep tone mysterious but helpful, concise, and precise.
  - Format answers with Markdown.
  `;

    const result = await streamText({
        model: openai("gpt-4o"),
        messages: [
            { role: "system", content: systemMessage },
            ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
    });

    return result.toTextStreamResponse();
}
