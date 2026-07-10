"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/layout/footer";
import { AIAssistant } from "@/components/assistant/ai-assistant";
import { GradientMesh } from "@/components/effects/gradient-mesh";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Globally fixed 3D Rotating Data Globe background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientMesh />
        </div>

        <main className="relative z-10 flex flex-col flex-1">
          <Hero />
          <About />
          <Services />
          <Skills />
          <Portfolio />
          <Pricing />
          <Contact />
          <FAQ />
        </main>
      </div>
      <Footer />
      <AIAssistant />
    </>
  );
}
