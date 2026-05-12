"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  User, 
  Loader2, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Github, 
  Globe,
  ArrowRight
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    
    // Identity update via Better-Auth
    const { data, error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      toast.error(error.message || "Update failed");
      setLoading(false);
      return;
    }

    toast.success("Profile updated successfully! ✨");
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Profile</h1>
        <p className="text-zinc-500 font-medium">Manage your account settings and profile information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-zinc-100 p-8 text-center shadow-sm sticky top-24">
            <div className="mb-6">
              <div className="text-left mb-4">
                <h3 className="text-lg font-bold text-zinc-900">Profile Picture</h3>
                <p className="text-sm text-zinc-500">Update your avatar.</p>
              </div>
              
              <div className="relative w-40 h-40 mx-auto">
                <div className="w-full h-full rounded-full bg-blue-50/50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden group relative">
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-blue-600">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="text-white h-8 w-8" />
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-2.5 bg-cyan-700 text-white rounded-xl shadow-lg hover:bg-cyan-800 transition-all border-2 border-white">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-zinc-900">{user?.name}</h2>
              <p className="text-zinc-500 text-sm font-medium">{user?.email}</p>
            </div>

            <div className="mt-6">
              <span className="inline-flex items-center px-4 py-1 rounded-xl bg-zinc-50 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-zinc-100">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Information Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm space-y-10">
            {/* Section: Personal Info */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-900">Personal Information</h3>
                <p className="text-sm text-zinc-500">Update your personal details and links.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 ml-1">Full Name</label>
                  <Input 
                    name="name" 
                    defaultValue={user?.name} 
                    className="h-12 rounded-xl bg-white border-zinc-200 focus:border-cyan-500 focus:ring-cyan-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 ml-1">Email</label>
                  <div className="relative">
                    <Input 
                      value={user?.email} 
                      disabled 
                      className="h-12 rounded-xl bg-zinc-50/50 border-zinc-100 text-zinc-400 font-medium" 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Mail className="h-4 w-4 text-zinc-300" />
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-400 ml-1 italic">Email cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 ml-1">Phone Number</label>
                  <Input 
                    name="phone" 
                    defaultValue={user?.phone || ""} 
                    placeholder="+880 1XXX XXXXXX" 
                    className="h-12 rounded-xl border-zinc-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 ml-1">Location</label>
                  <div className="relative">
                    <Input 
                      name="address" 
                      defaultValue={user?.address || ""} 
                      placeholder="e.g. New York, USA" 
                      className="h-12 rounded-xl border-zinc-200" 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <MapPin className="h-4 w-4 text-zinc-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Professional Bio */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">Professional Bio</label>
              <Textarea 
                name="bio"
                placeholder="Tell us a little bit about yourself and your career goals..."
                className="min-h-[120px] rounded-2xl border-zinc-200 resize-none"
              />
            </div>

            {/* Section: Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-50">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 ml-1">LinkedIn URL</label>
                <div className="relative">
                  <Input 
                    placeholder="https://linkedin.com/in/..." 
                    className="h-12 rounded-xl border-zinc-200 pl-10" 
                  />
                  <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 ml-1">GitHub URL</label>
                <div className="relative">
                  <Input 
                    placeholder="https://github.com/..." 
                    className="h-12 rounded-xl border-zinc-200 pl-10" 
                  />
                  <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-zinc-700 ml-1">Portfolio URL</label>
                <div className="relative">
                  <Input 
                    placeholder="https://..." 
                    className="h-12 rounded-xl border-zinc-200 pl-10" 
                  />
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6">
              <Button 
                disabled={loading} 
                className="px-8 bg-cyan-800 hover:bg-cyan-900 text-white h-12 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}