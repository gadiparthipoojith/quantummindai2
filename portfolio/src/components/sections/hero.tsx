"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studio } from "@/lib/data/team";
import { HeroScene } from "@/components/effects/hero-scene";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-28 pb-12">
      <HeroScene />

      <div className="container relative z-10 mx-auto px-4 py-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-core/30 bg-violet-core/10 px-4 py-1.5 text-sm text-violet-core"
          >
            <Sparkles className="h-4 w-4" />
            AI Engineering & Data Intelligence Studio
          </motion.div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">We Engineer Intelligence.</span>
            <span className="gradient-text">Elegant Software Solutions.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            {studio.name} is a boutique software engineering studio. We design, build, and deploy high-performance applications, AI agents, and data systems for ambitious teams worldwide.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#contact">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#services">View Our Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
