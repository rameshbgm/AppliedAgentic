"use client";

import { useState, useEffect, use } from "react";
import ReactMarkdown from "react-markdown";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LessonEditor({ params }: { params: Promise<{ id: string }> }) {
    // In client components, we use `use()` to unwrap the promise or strict props type
    // Next.js 15 Client Comp params are promises too if passed from layout?
    // Actually params prop to page is Promise.
    const { id } = use(params);

    const [lesson, setLesson] = useState<any>(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/admin/lessons/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setLesson(data);
                setTitle(data.title);
                setSlug(data.slug);
                setContent(data.content || "");
            });
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/lessons/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug, content }),
            });
            if (res.ok) {
                router.refresh();
                alert("Saved!");
            } else {
                alert("Error saving");
            }
        } finally {
            setSaving(false);
        }
    };

    if (!lesson) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/courses/${lesson.courseId}`} className="text-zinc-500 hover:text-white">
                        <ArrowLeft size={20} />
                    </Link>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent text-2xl font-bold text-white border-none focus:outline-none focus:ring-0 placeholder:text-zinc-600"
                        placeholder="Lesson Title"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-sm">/</span>
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-black/20 text-zinc-400 text-sm px-2 py-1 rounded border border-white/10 focus:border-neon-cyan/50 outline-none font-mono"
                    />
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-neon-cyan hover:bg-neon-cyan/90 text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                {/* Editor */}
                <div className="flex flex-col">
                    <div className="bg-white/5 text-zinc-400 text-xs px-4 py-2 rounded-t-lg border border-white/10 border-b-0">
                        MARKDOWN INPUT
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 bg-void-900/50 border border-white/10 rounded-b-lg p-4 text-zinc-300 font-mono text-sm focus:border-neon-cyan/30 outline-none resize-none"
                        placeholder="# Start writing..."
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden flex-1 min-h-0">
                    <div className="bg-black/20 text-zinc-400 text-xs px-4 py-2 border-b border-white/10">
                        PREVIEW
                    </div>
                    <div className="flex-1 overflow-y-auto p-8">
                        <article className="prose prose-invert prose-sm max-w-none prose-headings:font-heading prose-headings:text-white prose-p:text-zinc-300 prose-a:text-neon-cyan">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
