"use client";

import { useProgress } from "@/hooks/use-progress";
import { useEffect } from "react";

export function ProgressUpdater({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
    const { saveProgress } = useProgress(courseSlug);

    useEffect(() => {
        saveProgress(lessonSlug);
    }, [courseSlug, lessonSlug, saveProgress]);

    return null;
}
