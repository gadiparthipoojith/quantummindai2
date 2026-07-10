"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { caseStudies } from "@/lib/data/case-studies";

export function CaseStudies() {
  return (
    <section id="case-studies" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-emerald-signal">
            Case Studies
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Real Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Measurable outcomes from production deployments.
          </p>
        </ScrollReveal>

        <div className="space-y-12">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.id} delay={i * 0.1}>
              <article className="glass overflow-hidden rounded-2xl">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 lg:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="rounded-full bg-violet-core/20 px-3 py-1 text-xs font-medium text-violet-core">
                        {study.industry}
                      </span>
                      <span className="text-sm text-muted-foreground">{study.client}</span>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold">{study.title}</h3>
                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-semibold text-rose-alert">Challenge</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="mb-2 text-sm font-semibold text-cyan-pulse">Solution</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 px-2 py-1 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center bg-gradient-to-br from-violet-core/10 to-cyan-pulse/5 p-8 lg:p-10">
                    <div className="mb-8 grid grid-cols-2 gap-4">
                      {study.results.map((result) => (
                        <div key={result.label} className="text-center">
                          <div className="text-3xl font-bold gradient-text">{result.metric}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{result.label}</div>
                        </div>
                      ))}
                    </div>
                    <blockquote className="border-l-2 border-violet-core pl-4">
                      <p className="text-sm italic text-muted-foreground">
                        &ldquo;{study.testimonial.quote}&rdquo;
                      </p>
                      <footer className="mt-2 text-sm font-medium">
                        — {study.testimonial.author}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
