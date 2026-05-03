import Link from "next/link";
import { Facebook, Linkedin, Instagram, Youtube, Mail, ArrowRight, MapPin, Phone, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "About Us",
    links: [
      { name: "About us", href: "/about" },
      { name: "Contact us", href: "/contact" },
      { name: "Press", href: "/press" },
      { name: "How Foodhub works", href: "/about" },
      { name: "Download apps", href: "/apps" },
      { name: "Careers", href: "/careers" },
      { name: "Help & support", href: "/contact" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { name: "Food delivery", href: "/meals" },
      { name: "Pick-up", href: "/meals" },
      { name: "Categories", href: "/categories" },
      { name: "Super Foodhub subscription", href: "/subscription" },
      { name: "Foodhub deals", href: "/deals" },
      { name: "Reward programs", href: "/rewards" },
      { name: "Referral conditions", href: "/referral" },
    ],
  },
  {
    title: "Partner with us",
    links: [
      { name: "Partner with us", href: "/partner" },
      { name: "Ride with us", href: "/ride" },
      { name: "Terms & conditions", href: "/terms" },
      { name: "Refund & cancellation", href: "/refund" },
      { name: "Privacy policy", href: "/privacy" },
      { name: "Rider Privacy policy", href: "/privacy/rider" },
      { name: "Partner Privacy policy", href: "/privacy/partner" },
      { name: "Security policy", href: "/security" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-orange-50/50 dark:from-zinc-950 dark:to-orange-950/20 border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-8 transition-colors duration-300 overflow-hidden relative">
      {/* Decorative gradient blur in background */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-orange-500/5 dark:from-orange-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Newsletter & Contact Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 mb-12 border-b border-zinc-100 dark:border-zinc-900/80">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="h-14 w-14 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
               <Mail className="text-orange-600 dark:text-orange-500" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">Subscribe to Newsletter</h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Get updates on new restaurants and special offers.</p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="h-12 w-full lg:w-80 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
            />
            <Button className="h-12 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold gap-2 shrink-0">
              Subscribe <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-500 to-rose-500 text-white p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <ChefHat size={28} />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-500">
                Foodhub
              </h2>
            </Link>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium max-w-sm">
              Bangladesh's leading food delivery app with over 10,000+ restaurants along with amazing deals and services. 
              Discover a world of culinary delights and flavorful experiences with Foodhub, your ultimate food destination.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>123 Food Street, Dhanmondi, Dhaka 1205</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+880 1234-567890</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { Icon: Facebook, label: "Facebook", href: "https://facebook.com/foodhub" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/foodhub" },
                { Icon: Instagram, label: "Instagram", href: "https://instagram.com/foodhub" },
                { Icon: Youtube, label: "YouTube", href: "https://youtube.com/foodhub" }
              ].map((social, idx) => (
                <Link key={idx} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 dark:hover:border-orange-600 hover:scale-110 transition-all shadow-sm">
                  <social.Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 pl-0 lg:pl-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 relative inline-block">
                  {section.title}
                  <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-orange-500 rounded-full" />
                </h4>
                <ul className="space-y-3.5 pt-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative z-10">
          <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} Foodhub Express Limited. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-orange-500 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}