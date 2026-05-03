import React from 'react';
import { ShieldCheck, Store, ShoppingBag, BarChart3, Globe, Lock, ArrowRight, Users, Heart, Zap, Award } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen font-sans transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-zinc-100 dark:border-zinc-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/5 skew-x-12 transform translate-x-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/10 px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                System Version 3.0 Stable
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-zinc-900 dark:text-white">
              The Engine <br />
              <span className="text-orange-500">Behind Taste.</span>
            </h1>
            
            <p className="text-zinc-500 dark:text-zinc-400 font-bold text-lg leading-relaxed max-w-lg">
              FoodHub is a sophisticated multi-role ecosystem engineered to manage local food economies with precision, security, and absolute transparency.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all">
                Explore Documentation
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border-2 border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-orange-500/5 relative group">
             <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-50 dark:border-zinc-800 pb-4">
                   <span className="text-[10px] font-black uppercase text-zinc-400">Platform Status</span>
                   <span className="text-[10px] font-black uppercase text-emerald-500">Operational</span>
                </div>
                <div className="space-y-4">
                   <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-orange-500 rounded-full" />
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-zinc-500">Network Scalability</span>
                      <span className="text-zinc-900 dark:text-white">85%</span>
                   </div>
                </div>
                <p className="text-xs text-zinc-400 italic font-medium leading-relaxed">
                  "FoodHub utilizes a decentralized service model, allowing for 99.9% uptime across all Provider nodes and Admin control panels."
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- OUR MISSION & STORY SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-100 dark:border-zinc-900">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-zinc-800">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <h3 className="text-2xl font-black uppercase text-white mb-2 italic">Founded in 2026</h3>
               <p className="text-zinc-300 font-medium text-sm">Born from the idea that local culinary talent deserves a global-standard platform.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 mb-4">
               <Heart className="size-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tighter">Our Mission</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-lg">
              We started FoodHub with a simple, unifying goal: to democratize access to high-quality, local food while empowering the creators behind the meals. 
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-lg">
              The food delivery industry was plagued by high fees, opaque algorithms, and poor vendor support. FoodHub changes that narrative by providing an open, secure, and technologically advanced infrastructure for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* --- KEY STATS / METRICS --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-100 dark:border-zinc-900">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Users />} number="100k+" label="Active Users" />
            <StatCard icon={<Store />} number="5,000+" label="Verified Providers" />
            <StatCard icon={<Globe />} number="50+" label="Cities Covered" />
            <StatCard icon={<Award />} number="4.9" label="Average Rating" />
         </div>
      </section>

      {/* --- CORE PHILOSOPHY SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tighter">The Vision</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              FoodHub was engineered to solve the fragmentation in local food delivery. 
              By utilizing a three-tier architecture—comprising Admins, Providers, 
              and Customers—we ensure that every meal served is a product of 
              verified quality and secure transactions.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Our system integrates <strong>Better Auth</strong> for military-grade security 
              and <strong>Prisma</strong> for robust data integrity, ensuring that 
              from the moment a Provider lists a dish to the point a Customer receives 
              it, every byte of data is accounted for.
            </p>
          </div>
          <div className="bg-zinc-900 dark:bg-orange-600/10 p-10 rounded-[3rem] border border-zinc-800 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <Zap className="size-32 text-orange-500" />
            </div>
            <h3 className="text-orange-500 text-sm font-black uppercase tracking-[0.2em] mb-4 relative z-10">Core Tech Stack</h3>
            <ul className="space-y-4 relative z-10">
              {['Next.js 16 (Server Actions)', 'Prisma ORM (PostgreSQL)', 'Better Auth (Session Management)', 'Tailwind CSS v4', 'Framer Motion (Animations)'].map((tech) => (
                <li key={tech} className="flex items-center gap-3 text-white font-bold italic tracking-tight">
                  <div className="h-1.5 w-1.5 bg-orange-500 rounded-full" /> {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- ROLE DETAILED BREAKDOWN --- */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-24">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-zinc-900 dark:text-white mb-4">System Ecosystem</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">A seamless orchestration of three distinct roles, working in harmony to deliver perfection.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
            <RoleCard 
               icon={<ShieldCheck className="text-orange-500" />}
               role="Admin"
               details={[
                  "Manage and verify user accounts",
                  "Monitor global platform transactions",
                  "Maintain system-wide security standards",
                  "Handle conflict resolution between parties",
                  "Review provider applications"
               ]}
            />
            <RoleCard 
               icon={<Store className="text-orange-500" />}
               role="Provider"
               details={[
                  "List and manage digital menus",
                  "Real-time order processing",
                  "Earnings and analytics dashboard",
                  "Quality assurance management",
                  "Direct customer communication"
               ]}
            />
            <RoleCard 
               icon={<ShoppingBag className="text-orange-500" />}
               role="Customer"
               details={[
                  "Explore local verified kitchens",
                  "Secure checkout via Better Auth",
                  "Real-time order status tracking",
                  "Provider rating and feedback system",
                  "Personalized food recommendations"
               ]}
            />
            </div>
         </div>
      </section>

      {/* --- PLATFORM VALUES FOOTER --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white tracking-tighter">Why We Are Different</h2>
         </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <ValueBlock icon={<Lock size={24}/>} title="Uncompromised Security" desc="End-to-end encrypted session management and secure payment gateways." />
          <ValueBlock icon={<BarChart3 size={24}/>} title="Deep Analytics" desc="Data-driven insights for providers to optimize their offerings." />
          <ValueBlock icon={<Globe size={24}/>} title="Infinite Scale" desc="Architecture optimized for rapid multi-city deployment globally." />
          <ValueBlock icon={<ShieldCheck size={24}/>} title="Verified Quality" desc="Rigorous onboarding processes ensuring only the best providers." />
        </div>
      </section>
    </div>
  );
}

// Sub-components for better organization
function RoleCard({ icon, role, details }: { icon: React.ReactNode, role: string, details: string[] }) {
  return (
    <div className="p-10 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all group">
      <div className="mb-6 scale-125 origin-left bg-orange-50 dark:bg-orange-500/10 w-fit p-4 rounded-2xl">{icon}</div>
      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-6">{role}</h3>
      <ul className="space-y-4">
        {details.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-relaxed">
            <span className="text-orange-500 mt-0.5">•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ValueBlock({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4 text-center flex flex-col items-center">
      <div className="text-orange-500 bg-orange-50 dark:bg-orange-500/10 p-4 rounded-full inline-flex justify-center items-center">
         {icon}
      </div>
      <h4 className="font-black uppercase text-sm tracking-widest text-zinc-900 dark:text-white">{title}</h4>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-xs">{desc}</p>
    </div>
  );
}

function StatCard({ icon, number, label }: { icon: React.ReactNode, number: string, label: string }) {
   return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group">
         <div className="text-zinc-400 group-hover:text-orange-500 transition-colors">
            {icon}
         </div>
         <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            {number}
         </div>
         <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {label}
         </div>
      </div>
   )
}