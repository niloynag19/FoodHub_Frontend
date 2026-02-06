// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
//   UtensilsCrossed,
//   ArrowRight,
//   ChevronUp,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";

// export default function Footer() {
//   const [email, setEmail] = useState("");

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="bg-background border-t mt-20">
//       {/* Newsletter Section */}
//       <div className="bg-orange-600 dark:bg-orange-700 py-10">
//         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="text-white">
//             <h2 className="text-2xl font-bold">Subscribe to our newsletter</h2>
//             <p className="text-orange-10/80">Get the latest updates, recipes, and exclusive offers.</p>
//           </div>
//           <div className="flex w-full max-w-md gap-2">
//             <Input 
//               placeholder="Enter your email" 
//               className="bg-white text-black border-none focus-visible:ring-offset-0"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Button className="bg-black hover:bg-zinc-800 text-white font-bold">
//               Join Now
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
//           {/* Brand Info */}
//           <div className="space-y-6">
//             <Link href="/" className="flex items-center gap-2">
//               <UtensilsCrossed className="size-8 text-orange-600" />
//               <span className="text-2xl font-extrabold tracking-tighter italic">
//                 FOOD<span className="text-orange-600">HUB</span>
//               </span>
//             </Link>
//             <p className="text-muted-foreground text-sm leading-relaxed">
//               We bring your favorite meals straight to your doorstep. Genuine ingredients, professional chefs, and fast delivery – that's our promise.
//             </p>
//             <div className="flex gap-4">
//               {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
//                 <Link key={i} href="#" className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
//                   <Icon className="size-4" />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-6">
//             <h3 className="text-lg font-bold">Quick Links</h3>
//             <ul className="space-y-3">
//               {["Home", "All Meals", "Top Categories", "Our Shop", "Track Order"].map((item) => (
//                 <li key={item}>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600 flex items-center gap-2 group transition-all">
//                     <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-all" />
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Business Hours */}
//           <div className="space-y-6">
//             <h3 className="text-lg font-bold">Working Hours</h3>
//             <ul className="space-y-3 text-sm text-muted-foreground">
//               <li className="flex justify-between items-center">
//                 <span>Monday - Friday:</span>
//                 <span className="font-semibold text-foreground">09:00 - 22:00</span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span>Saturday:</span>
//                 <span className="font-semibold text-foreground">10:00 - 23:00</span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span>Sunday:</span>
//                 <span className="font-semibold text-orange-600">Open 24/7</span>
//               </li>
//               <li className="flex items-center gap-2 mt-4 text-orange-600 italic">
//                 <Clock className="size-4" />
//                 <span>Fastest delivery in town!</span>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-6">
//             <h3 className="text-lg font-bold">Contact Info</h3>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <MapPin className="size-5 text-orange-600 shrink-0" />
//                 <span className="text-sm text-muted-foreground">123 Food Street, Culinary City, FC 45678</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone className="size-5 text-orange-600 shrink-0" />
//                 <span className="text-sm text-muted-foreground">+880 1234 567 890</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="size-5 text-orange-600 shrink-0" />
//                 <span className="text-sm text-muted-foreground">support@foodhub.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <Separator className="my-10" />

//         {/* Bottom Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-xs text-muted-foreground text-center md:text-left">
//             © {new Date().getFullYear()} FoodHub. Built with precision for food lovers.
//           </p>
          
//           <div className="flex gap-6 items-center">
//              <Link href="#" className="text-xs text-muted-foreground hover:text-orange-600">Privacy Policy</Link>
//              <Link href="#" className="text-xs text-muted-foreground hover:text-orange-600">Terms of Use</Link>
//              <Button 
//                 variant="outline" 
//                 size="icon" 
//                 onClick={scrollToTop} 
//                 className="rounded-full h-10 w-10 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
//              >
//                <ChevronUp className="size-5" />
//              </Button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }