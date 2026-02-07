"use client";

import Link from "next/link";
import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "About Us",
    links: ["About us", "Contact us", "Press", "How Foodhub works", "Download apps", "Careers", "Help & support"],
  },
  {
    title: "Our Services",
    links: ["Food delivery", "Pick-up", "Flowers delivery", "Super Foodhub subscription", "Foodhub deals", "Reward programms", "Terms Of Referral and Condition"],
  },
  {
    title: "Partner with us",
    links: ["Partner with us", "Ride with us", "Terms & conditions", "Refund & cancellation", "Privacy policy", "Rider Privacy policy", "Partner Privacy policy", "Security policy"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-black italic text-orange-600 tracking-tighter">
              foodhub 
            </h2>
            <div className="space-y-4 max-w-md">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                Order food from the best restaurants and shops with Foodhub Bangladesh
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Bangladesh's leading food delivery app with over 10,000+ restaurants along with amazing deals and services. 
                Discover a world of culinary delights and flavorful experiences with Foodhub, your ultimate food destination.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Linkedin, Instagram, Youtube].map((Icon, idx) => (
                <Link key={idx} href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-5">
                <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
            © Copyright 2026 Foodhub Express Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-wide  st text-zinc-400 dark:text-zinc-500">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Privacy</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Terms</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}