"use client";

import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function SyncButton() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleSync = async () => {
        setStatus("loading");
        try {
            const res = await fetch("/api/admin/sync", { method: "POST" });
            if (!res.ok) throw new Error("Sync failed");
            setStatus("success");
            router.refresh();
            setTimeout(() => setStatus("idle"), 2000);
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    return (
        <button
            onClick={handleSync}
            disabled={status === "loading"}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${status === "idle" ? "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50 hover:text-blue-600" : ""}
                ${status === "loading" ? "bg-blue-50 text-blue-700 border border-blue-100" : ""}
                ${status === "success" ? "bg-green-50 text-green-700 border border-green-100" : ""}
                ${status === "error" ? "bg-red-50 text-red-700 border border-red-100" : ""}
            `}
        >
            {status === "idle" && (
                <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync AI Memory</span>
                </>
            )}
            {status === "loading" && (
                <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Syncing...</span>
                </>
            )}
            {status === "success" && (
                <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Synced</span>
                </>
            )}
            {status === "error" && (
                <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Failed</span>
                </>
            )}
        </button>
    );
}
