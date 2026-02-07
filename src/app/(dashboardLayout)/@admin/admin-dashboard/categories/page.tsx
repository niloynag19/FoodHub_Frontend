import { getAllCategoriesAction } from "@/actions/category.actions";
import { Layers, Tag, Calendar } from "lucide-react";
import UpdateCategoryModal from "@/components/admin/UpdateCategoryModal";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const result = await getAllCategoriesAction();
  const categories = result?.data || [];

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      {/* Premium Header */}
      <div className="bg-zinc-900 rounded-[3rem] p-12 text-white flex justify-between items-center relative overflow-hidden shadow-2xl">
        <div className="z-10">
          <h1 className="text-5xl font-black italic tracking-tighter">Manage Categories</h1>
          <p className="text-zinc-400 mt-2 font-medium">Control the global meal types of FoodHub</p>
        </div>
        <div className="z-10"><AddCategoryModal /></div>
        <Layers className="absolute right-[-20px] top-[-20px] h-64 w-64 text-white/5 rotate-12" />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-[3.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-50">
            <tr>
              <th className="px-12 py-7">Category Details</th>
              <th className="px-12 py-7">Created On</th>
              <th className="px-12 py-7 text-right font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {categories.map((cat: any) => (
              <tr key={cat.id} className="hover:bg-zinc-50/30 transition-all group">
                <td className="px-12 py-7">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                      <Tag size={20} />
                    </div>
                    <span className="text-xl font-black text-zinc-800 tracking-tight">{cat.name}</span>
                  </div>
                </td>
                <td className="px-12 py-7 text-zinc-400 font-bold text-sm italic">
                  {new Date(cat.createdAt).toDateString()}
                </td>
                <td className="px-12 py-7">
                  <div className="flex items-center justify-end gap-3">
                    <UpdateCategoryModal category={cat} />
                    <DeleteCategoryButton id={cat.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}