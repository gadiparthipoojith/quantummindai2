"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Rocket, ArrowRight } from "lucide-react";

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompletedProjects() {
      try {
        const res = await fetch("/api/projects/public");
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Failed to fetch completed projects", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompletedProjects();
  }, []);

  if (loading || projects.length === 0) {
    return null; // Don't show the section if loading or no completed projects
  }

  return (
    <section id="portfolio" className="section-padding bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-emerald-400">
            Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-white">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            A showcase of our successfully delivered solutions.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const roadmap = typeof project.roadmap === 'string' ? JSON.parse(project.roadmap || "[]") : (project.roadmap || []);
            
            return (
              <ScrollReveal key={project.id} delay={i * 0.05}>
                <Card className="h-full group hover:-translate-y-1 bg-black/40 border-white/10 overflow-hidden relative">

                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-400/20 transition-colors group-hover:from-emerald-500/30 group-hover:to-teal-400/30">
                      <Rocket className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-white text-xl">{project.projectName}</CardTitle>
                    <CardDescription className="text-slate-400 font-medium">
                      Client: {project.clientName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {roadmap.length > 0 && (
                      <div className="space-y-3 mt-2">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Key Deliverables</p>
                        <ul className="space-y-2">
                          {roadmap.slice(0, 3).map((milestone: any, index: number) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{milestone.title}</span>
                            </li>
                          ))}
                          {roadmap.length > 3 && (
                            <li className="text-xs text-slate-500 italic pl-6">
                              + {roadmap.length - 3} more phases completed
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
