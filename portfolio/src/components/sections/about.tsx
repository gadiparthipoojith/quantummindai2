"use client";


import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { team, studio } from "@/lib/data/team";

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-core">
            About Us
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Our Leadership & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            {studio.description} Founded in {studio.founded}, we combine AI engineering
            with data intelligence to deliver measurable outcomes.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.15}>
              <div className="glass group h-full rounded-2xl p-8 transition-all hover:border-violet-core/40">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-core to-cyan-pulse text-xl font-bold text-white">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-violet-core text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="mb-6 text-foreground/90 leading-relaxed">{member.bio}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs"
                    >
                      {skill}
                    </span>
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
