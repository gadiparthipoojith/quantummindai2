"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { skillCategories } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-amber-trust">
            Expertise
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Tech Stack & Skills
          </h2>
          <p className="text-muted-foreground text-lg">
            Production-proven technologies across AI, full stack, data, and cloud.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, ci) => (
            <ScrollReveal key={category.category} delay={ci * 0.1}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-6 text-lg font-semibold">{category.category}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-core to-cyan-pulse"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
