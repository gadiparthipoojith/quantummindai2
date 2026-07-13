"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { projects } from "@/lib/data/projects";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section-padding bg-background/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-core">
            Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Production-ready applications with measurable outcomes.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:border-violet-core/40">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-core/20 to-cyan-pulse/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 backdrop-blur-sm transition-colors hover:bg-violet-core/50"
                      aria-label="View on GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <Link
                      href={project.href}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 backdrop-blur-sm transition-colors hover:bg-violet-core/50"
                      aria-label="View project"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 text-xs font-medium uppercase tracking-wider text-cyan-pulse">
                    {project.category}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  {project.metrics && (
                    <div className="mb-4 flex gap-4">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-lg font-bold text-violet-core">{m.value}</div>
                          <div className="text-xs text-muted-foreground">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-foreground/10 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
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
