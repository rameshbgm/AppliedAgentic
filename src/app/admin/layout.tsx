"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Layers, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/courses", icon: BookOpen, label: "Courses" },
        { href: "/admin/categories", icon: Layers, label: "Categories" },
        { href: "/admin/users", icon: Users, label: "Users" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-slate-900">
            {/* Sidebar */}
            <aside className="w-72 border-r border-gray-200 bg-white flex flex-col fixed inset-y-0 left-0 z-50">
                {/* Logo */}
                <div className="h-20 px-8 flex items-center border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <span className="font-heading font-bold">AA</span>
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-slate-900">AppliedAgentic</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive
                                    ? "text-blue-700 bg-blue-50/50"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-gray-50"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 space-y-1">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-gray-50 transition-all font-sans"
                    >
                        <Settings className="w-5 h-5 text-slate-400" />
                        <span>Settings</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-gray-50 transition-all font-sans"
                    >
                        <LogOut className="w-5 h-5 text-slate-400" />
                        <span>Exit Admin</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="pl-72 flex-1 w-full">
                <div className="p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
