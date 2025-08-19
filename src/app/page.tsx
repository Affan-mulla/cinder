"use client";
import CTA from "@/components/Landing/CTA";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import Pricing from "@/components/Landing/Pricing";

export default function Home() {
  return (
   <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
