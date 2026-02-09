import { getAllUsersAction } from "@/actions/user.action";
import StatusDropdown from "@/components/admin/StatusDropdown";
import { userService } from "@/services/user.service";

export default async function AllUsersPage() {
  // Action theke data niye asha
  const result = await userService.getAllUsers();
  const users=result.data;
  console.log(users);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex items-center gap-4 border-l-8 border-zinc-900 pl-6">
        <h1 className="text-5xl font-black italic tracking-tighter">Community Control</h1>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3rem] border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50/50 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <tr>
              <th className="px-10 py-6">User Info</th>
              <th className="px-10 py-6">Role</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {users.map((user: any) => {
             
              const isSuspended = user.status === "SUSPENDED";

              return (
                <tr key={user.id} className="hover:bg-zinc-50/30 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-black text-zinc-400 uppercase group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        {user.name ? user.name[0] : "U"}
                      </div>
                      <div>
                        <p className="font-black text-zinc-900 uppercase tracking-tighter">
                          {user.name}
                        </p>
                        <p className="text-xs text-zinc-400 font-bold">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${
                      user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      user.role === 'PROVIDER' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        isSuspended 
                        ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                        : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      }`} />
                      <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    
                    <StatusDropdown userId={user.id} currentStatus={user.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}