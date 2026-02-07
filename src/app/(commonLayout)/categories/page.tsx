import { getAllCategoriesAction } from "@/actions/category.actions";
import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";

export default async function AllCategoriesPage() {
  const result = await getAllCategoriesAction();
  const categories = result?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-10 space-y-10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
          <LayoutGrid size={20} />
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter">Food Categories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat: any) => (
          <Link 
            key={cat.id} 
            href={`/categories/${cat.id}`}
            className="group bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-2xl hover:border-orange-500 transition-all text-center space-y-4"
          >
            <div className="h-20 w-20 bg-orange-50 rounded-[2rem] mx-auto flex items-center justify-center text-orange-600 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <span className="text-3xl font-black uppercase">{cat.name[0]}</span>
            </div>
            <h3 className="font-black text-zinc-900 group-hover:text-orange-600 uppercase tracking-tighter">{cat.name}</h3>
            <div className="flex justify-center text-zinc-300 group-hover:text-orange-500 transition-colors">
              <ChevronRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}