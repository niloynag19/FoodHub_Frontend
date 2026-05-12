import { userService } from "@/services/user.service";
import { UsersTable } from "@/components/admin/UsersTable";
import { Users } from "lucide-react";

export default async function AllUsersPage() {
  const result = await userService.getAllUsers();
  const users = result.data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black italic tracking-tighter text-zinc-900 flex items-center gap-3">
          <Users className="h-10 w-10 text-orange-600" />
          COMMUNITY CONTROL
        </h1>
        <p className="text-zinc-500 font-medium">Manage and monitor all users in the system.</p>
      </div>

      <UsersTable initialUsers={users} />
    </div>
  );
}