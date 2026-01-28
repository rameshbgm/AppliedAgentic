import prisma from "@/lib/prisma";
import { UsersTable } from "@/app/admin/users/components/UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === "ADMIN").length,
        superAdmins: users.filter(u => u.role === "SUPER_ADMIN").length,
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-heading text-2xl font-bold text-slate-900">Users</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage platform administrators</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="text-2xl font-heading font-bold text-slate-900">{stats.total}</div>
                    <div className="text-sm text-slate-500">Total Users</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="text-2xl font-heading font-bold text-blue-600">{stats.admins}</div>
                    <div className="text-sm text-slate-500">Admins</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="text-2xl font-heading font-bold text-purple-600">{stats.superAdmins}</div>
                    <div className="text-sm text-slate-500">Super Admins</div>
                </div>
            </div>

            {/* Users Table */}
            <UsersTable users={users} />
        </div>
    );
}
