"use client";

import Link from "next/link";
import { Plus, RefreshCw, Users, Settings } from "lucide-react";

export function QuickActions() {
    const actions = [
        { label: "New Course", href: "/admin/courses/new", icon: Plus, color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
        { label: "Sync Vectors", href: "#", icon: RefreshCw, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" },
        { label: "Manage Users", href: "/admin/users", icon: Users, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
        { label: "Settings", href: "/admin/settings", icon: Settings, color: "text-slate-600 bg-gray-50 hover:bg-gray-100" },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="font-heading font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Quick Actions</h3>
            <div className="space-y-2">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${action.color}`}
                    >
                        <action.icon className="w-5 h-5" />
                        <span className="font-medium text-slate-700">
                            {action.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
