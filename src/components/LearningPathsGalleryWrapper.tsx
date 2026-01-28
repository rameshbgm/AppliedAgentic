"use client";

import { LearningPathsGallery, type CategoryData } from "@/components/LearningPathsGallery";

interface LearningPathsGalleryWrapperProps {
    categories: CategoryData[];
}

export function LearningPathsGalleryWrapper({ categories }: LearningPathsGalleryWrapperProps) {
    return <LearningPathsGallery categories={categories} />;
}

