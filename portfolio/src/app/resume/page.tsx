"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Download, GraduationCap, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const educations = [
  {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    school: "NRI Institute of Technology",
    period: "2021 - 2025",
    description: "CGPA: 7.1/10. Visadala, Andhra Pradesh.",
  },
];

const skillCategories = [
  {
    name: "AI, ML & Agents",
    skills: ["Artificial Intelligence", "Machine Learning", "OpenAI API", "LangChain", "LangGraph", "CrewAI", "RAG Systems", "Vector Databases", "Prompt Engineering"],
  },
  {
    name: "Software & Web Development",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Python", "C", "FastAPI", "Express.js", "PHP", "HTML & CSS", "Tailwind CSS"],
  },
  {
    name: "Cloud, Databases & Security",
    skills: ["Supabase", "PostgreSQL", "SQL", "MongoDB", "Data Administration", "Prisma ORM", "Docker", "AWS", "Cloud Computing", "Cybersecurity", "Network Admin"],
  },
];

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-32 pb-20 print:pt-0 print:pb-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden print:hidden" aria-hidden="true">
          <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-core/10 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between print:hidden">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print / Save PDF
              </Button>
            </div>
          </div>

          {/* Resume Card */}
          <div className="glass rounded-3xl p-8 md:p-12 shadow-xl bg-background/30 border-foreground/10 print:border-none print:bg-transparent print:shadow-none print:p-0">
            <header className="border-b border-foreground/10 pb-8 mb-8 print:border-zinc-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Gadiparthi Poojith</h1>
                  <h2 className="text-xl text-violet-core font-medium mb-4 print:text-indigo-600">AI Engineer, Full Stack & AI Developer</h2>
                  <p className="text-muted-foreground text-sm max-w-xl print:text-zinc-600">
                    High-performance developer specializing in building production-ready AI agents, stateful RAG applications, automation pipelines, and modern SaaS products.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground print:text-zinc-700">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-violet-core print:text-indigo-600" />
                    info@qmai.in
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-violet-core print:text-indigo-600" />
                    Hyderabad, India
                  </span>
                </div>
              </div>
            </header>



            {/* Skills Section */}
            <section className="mb-10">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-violet-core mb-6 flex items-center gap-2 print:text-indigo-600">
                Skills & Technologies
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {skillCategories.map((cat, index) => (
                  <div key={index} className="glass p-4 rounded-xl border-foreground/5 print:border-zinc-200">
                    <h4 className="font-bold text-sm text-foreground mb-3 print:text-black">{cat.name}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-xs text-muted-foreground print:bg-zinc-100 print:text-zinc-800 print:border-zinc-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h3 className="text-lg font-semibold uppercase tracking-wider text-violet-core mb-6 flex items-center gap-2 print:text-indigo-600">
                <GraduationCap className="h-5 w-5" />
                Education
              </h3>
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div key={index} className="pl-6 relative">
                    <div className="absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-core border border-background print:bg-indigo-600" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-foreground print:text-black">{edu.degree}</h4>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-violet-core/80 mb-2 print:text-indigo-600">{edu.school}</div>
                    <p className="text-sm text-muted-foreground leading-6 print:text-zinc-700">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
