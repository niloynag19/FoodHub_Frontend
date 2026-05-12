"use client";

import React, { useState } from "react";
import StatusDropdown from "@/components/admin/StatusDropdown";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsersTableProps {
  initialUsers: any[];
}

export const UsersTable = ({ initialUsers }: UsersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredUsers = initialUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-12 h-12 rounded-2xl border-zinc-100 focus:border-orange-500 focus:ring-orange-500 bg-zinc-50/50 font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-zinc-100 font-bold uppercase tracking-widest text-[10px] gap-2">
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">
            {filteredUsers.length} Users Found
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3rem] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50/50 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100">
              <tr>
                <th className="px-10 py-6">User Info</th>
                <th className="px-10 py-6">Role</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {currentUsers.length > 0 ? (
                currentUsers.map((user: any) => {
                  const isSuspended = user.status === "SUSPENDED";

                  return (
                    <tr key={user.id} className="hover:bg-zinc-50/30 transition-all group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-black text-zinc-400 uppercase group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-sm">
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
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border shadow-sm ${
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
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center">
                    <p className="text-zinc-400 font-black uppercase tracking-widest italic">No users found matching your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-10 py-6 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-zinc-100"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={`h-10 w-10 rounded-xl border-zinc-100 text-[10px] font-black ${
                        currentPage === i + 1 ? "bg-zinc-900 text-white" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-zinc-100"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
