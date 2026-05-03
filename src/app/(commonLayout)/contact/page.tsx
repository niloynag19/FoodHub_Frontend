import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Get in <span className="text-amber-200">Touch</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about your order or want to partner with FoodHub? We're here to help you 24/7.
          </p>
        </div>
        <div className="absolute -bottom-12 -right-12 size-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-12 -left-12 size-64 bg-amber-300/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Contact Information */}
            <div className="p-8 md:p-12 bg-gray-50 border-r border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <MapPin className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Our Location</h3>
                    <p className="text-gray-600 mt-1">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <Phone className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Phone Number</h3>
                    <p className="text-gray-600 mt-1">+8801764838234</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <Mail className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Email Address</h3>
                    <p className="text-gray-600 mt-1">support@foodhub.com<br />partnerships@foodhub.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <Clock className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Working Hours</h3>
                    <p className="text-gray-600 mt-1">Mon-Fri: 8:00 AM - 10:00 PM<br />Sat-Sun: 9:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                  ></textarea>
                </div>

                <Button className="w-full py-6 text-lg font-bold bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-xl transition-all shadow-lg hover:shadow-orange-500/25">
                  <Send className="size-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}