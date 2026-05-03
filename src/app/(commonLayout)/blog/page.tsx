import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Superfoods You Need in Your Diet Right Now",
    excerpt: "Discover the most nutrient-dense foods that can boost your energy levels and improve your overall health.",
    category: "Health & Nutrition",
    author: "Sarah Jenkins",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Secret Behind Authentic Italian Pizza Dough",
    excerpt: "We visited top chefs in Naples to uncover the traditional methods for creating the perfect, airy pizza crust.",
    category: "Culinary Secrets",
    author: "Marco Rossi",
    date: "Oct 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "How FoodHub is Reducing Carbon Footprints",
    excerpt: "Learn about our new eco-friendly packaging initiatives and how we are working with local farmers to ensure sustainability.",
    category: "Inside FoodHub",
    author: "Alex Morgan",
    date: "Oct 08, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Quick & Easy 15-Minute Meals for Busy Weeknights",
    excerpt: "Don't have time to cook? Try these healthy and delicious recipes that you can whip up in under 15 minutes.",
    category: "Recipes",
    author: "Jessica Lee",
    date: "Oct 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "The Ultimate Guide to Coffee Beans and Roasts",
    excerpt: "From light roast to dark roast, arabica to robusta, find out which coffee perfectly matches your morning vibe.",
    category: "Beverages",
    author: "David Chen",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Must-Visit Street Food Destinations in Asia",
    excerpt: "Take a culinary journey through the vibrant night markets and street food stalls of Tokyo, Bangkok, and Taipei.",
    category: "Travel",
    author: "Elena Rodriguez",
    date: "Sep 22, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
          FoodHub <span className="text-orange-600">Journal</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Dive into our latest recipes, culinary tips, restaurant highlights, and behind-the-scenes stories from the FoodHub community.
        </p>
        
        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mt-8">
          {["All", "Health & Nutrition", "Recipes", "Travel", "Inside FoodHub", "Culinary Secrets"].map((cat, i) => (
            <button 
              key={cat} 
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                i === 0 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-500/20" 
                  : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-orange-600 flex items-center shadow-sm">
                  <Tag className="size-3 mr-1" />
                  {post.category}
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="size-4 mr-1.5 text-gray-400" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="size-4 mr-1.5 text-gray-400" />
                    {post.author}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">{post.readTime}</span>
                  <Button variant="ghost" className="text-orange-600 font-bold hover:text-orange-700 hover:bg-orange-50 group/btn">
                    Read More 
                    <ArrowRight className="size-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" className="px-8 py-6 rounded-xl border-2 hover:bg-orange-50 hover:text-orange-600 font-bold text-lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
