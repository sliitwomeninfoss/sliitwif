"use client";

import React, { useState, useCallback } from "react";
import { MapPin, Phone, Mail, Send, Zap, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <main className="bg-[#0b041a] text-white selection:bg-purple-500 font-sans min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      
      {/* GLOBAL AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-purple-600/30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1300px] mx-auto px-8 relative z-10">
        
        <header className="mb-20">
          <div className="w-16 h-1 bg-purple-500 mb-6" />
          <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-3">
            Communication // Connection // Support
          </span>
          <h1 className="text-[10vw] lg:text-[7vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-12">
            GET IN <br />
            <span className="text-transparent stroke-text-white">TOUCH</span>
            <span className="text-purple-500 not-italic">.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* INFO CARDS */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { icon: MapPin, title: "Location", detail: "SLIIT MALABE" },
              { icon: Phone, title: "Call Us", detail: "+94 74 178 9977" },
              { icon: Mail, title: "Email Us", detail: "infowifsliit@gmail.com" },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-white/[0.02] border border-white/5 p-8 rounded-2xl transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                    {item.title}
                  </h3>
                </div>
                <p className="text-lg font-black italic uppercase tracking-tight text-white group-hover:text-purple-400 transition-colors">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-10 lg:p-16 rounded-3xl relative">
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[9px] font-mono uppercase tracking-[0.3em] text-purple-400 ml-1">Identity</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER FULL NAME"
                    className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white placeholder-white/5 focus:outline-none focus:border-purple-500 transition-colors font-black uppercase italic text-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[9px] font-mono uppercase tracking-[0.3em] text-purple-400 ml-1">Digital Mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="USER@DOMAIN.COM"
                    className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white placeholder-white/5 focus:outline-none focus:border-purple-500 transition-colors font-black uppercase italic text-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[9px] font-mono uppercase tracking-[0.3em] text-purple-400 ml-1">Transmission</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="WRITE YOUR MESSAGE HERE..."
                  rows={4}
                  className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white placeholder-white/5 focus:outline-none focus:border-purple-500 transition-colors font-black uppercase italic text-xl resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative inline-flex items-center justify-between w-full md:w-auto md:min-w-[300px] p-6 font-[1000] uppercase tracking-[0.2em] text-[11px] transition-all ${
                  isSuccess 
                  ? "bg-green-500 text-white" 
                  : "bg-white text-black hover:bg-purple-500 hover:text-white"
                } disabled:opacity-50`}
              >
                {isSubmitting ? "Processing..." : isSuccess ? "Transmission Complete" : "Send Message"}
                <div className="flex items-center gap-3">
                   {isSuccess ? <CheckCircle2 size={14} /> : <Zap size={14} className="fill-current" />}
                   <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4); }
        }
      `}</style>
    </main>
  );
}