import React from 'react';
import { ShieldCheck, Store, ShoppingBag, BarChart3, Globe, Lock, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen font-sans transition-colors duration-300">
      
      {/* --- NEW PROFESSIONAL HEADER SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-zinc-100 dark:border-zinc-900 overflow-hidden">
        {/* Abstract Background Element */}
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

      {/* --- CORE PHILOSOPHY SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white">The Vision</h2>
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
          <div className="bg-zinc-900 dark:bg-orange-600/10 p-10 rounded-[3rem] border border-zinc-800 flex flex-col justify-center">
            <h3 className="text-orange-500 text-sm font-black uppercase tracking-[0.2em] mb-4">Core Tech Stack</h3>
            <ul className="space-y-4">
              {['Next.js 15 (Server Actions)', 'Prisma ORM (PostgreSQL)', 'Better Auth (Session Management)', 'Tailwind CSS (Adaptive UI)'].map((tech) => (
                <li key={tech} className="flex items-center gap-3 text-white font-bold italic tracking-tight">
                  <div className="h-1.5 w-1.5 bg-orange-500 rounded-full" /> {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- ROLE DETAILED BREAKDOWN --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900 dark:text-white">System Ecosystem</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <RoleCard 
            icon={<ShieldCheck className="text-orange-500" />}
            role="Admin"
            details={[
              "Manage and verify user accounts",
              "Monitor global platform transactions",
              "Maintain system-wide security standards",
              "Handle conflict resolution between parties"
            ]}
          />
          <RoleCard 
            icon={<Store className="text-orange-500" />}
            role="Provider"
            details={[
              "List and manage digital menus",
              "Real-time order processing",
              "Earnings and analytics dashboard",
              "Quality assurance management"
            ]}
          />
          <RoleCard 
            icon={<ShoppingBag className="text-orange-500" />}
            role="Customer"
            details={[
              "Explore local verified kitchens",
              "Secure checkout via Better Auth",
              "Real-time order status tracking",
              "Provider rating and feedback system"
            ]}
          />
        </div>
      </section>

      {/* Platform Values Footer */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-100 dark:border-zinc-900">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <ValueBlock icon={<Lock size={20}/>} title="Security" desc="End-to-end encrypted session management." />
          <ValueBlock icon={<BarChart3 size={20}/>} title="Analytics" desc="Data-driven insights for all providers." />
          <ValueBlock icon={<Globe size={20}/>} title="Scale" desc="Optimized for multi-city deployment." />
          <ValueBlock icon={<ShieldCheck size={20}/>} title="Verify" desc="Rigorous onboarding for providers." />
        </div>
      </section>
    </div>
  );
}

// Sub-components for better organization
function RoleCard({ icon, role, details }: { icon: React.ReactNode, role: string, details: string[] }) {
  return (
    <div className="p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/30 hover:border-orange-500/50 transition-all group">
      <div className="mb-6 scale-125 origin-left">{icon}</div>
      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-6">{role}</h3>
      <ul className="space-y-4">
        {details.map((item, i) => (
          <li key={i} className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-relaxed">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ValueBlock({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-3">
      <div className="text-orange-500">{icon}</div>
      <h4 className="font-black uppercase text-xs tracking-widest text-zinc-900 dark:text-white">{title}</h4>
      <p className="text-zinc-500 dark:text-zinc-500 text-xs font-medium">{desc}</p>
    </div>
  );
}