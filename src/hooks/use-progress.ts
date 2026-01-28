"use client";

import { useState, useEffect } from "react";

export function useProgress(courseSlug: string) {
    const [currentLesson, setCurrentLesson] = useState<string | null>(null);

    useEffect(() => {
        // Load progress
        const saved = localStorage.getItem(`appliedagentic-progress-${courseSlug}`);
        if (saved) {
            setCurrentLesson(saved);
        }
    }, [courseSlug]);

    const saveProgress = (lessonSlug: string) => {
        localStorage.setItem(`appliedagentic-progress-${courseSlug}`, lessonSlug);
        setCurrentLesson(lessonSlug);
    };

    return { currentLesson, saveProgress };
}
