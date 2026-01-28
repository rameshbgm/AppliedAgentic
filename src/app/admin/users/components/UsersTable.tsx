"use client";

import { formatDistanceToNow } from "date-fns";
import { Shield, ShieldCheck, MoreVertical } from "lucide-react";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
}

interface UsersTableProps {
    users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{user.name}</div>
                                            <div className="text-sm text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "SUPER_ADMIN"
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-blue-100 text-blue-700"
                                        }`}>
                                        {user.role === "SUPER_ADMIN" ? (
                                            <ShieldCheck className="w-3 h-3" />
                                        ) : (
                                            <Shield className="w-3 h-3" />
                                        )}
                                        {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end">
                                        <button
                                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-gray-100 transition-colors"
                                            aria-label="User actions"
                                            title="User actions"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No users found.
                </div>
            )}
        </div>
    );
}
