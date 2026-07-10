"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { studio } from "@/lib/data/team";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-obsidian/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-emerald-signal">
            Contact
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Start Your Project
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us about your project. We respond within 2 hours.
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Email</h3>
                <a
                  href={`mailto:${studio.email}`}
                  className="text-violet-core hover:underline"
                >
                  {studio.email}
                </a>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Location</h3>
                <p className="text-muted-foreground">{studio.location}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Response Time</h3>
                <p className="text-muted-foreground">Within 2 hours (business days)</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="mb-2 font-semibold">Free Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  30-minute discovery call to discuss scope, timeline, and architecture — no obligation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                    Company
                  </label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
                    Budget
                  </label>
                  <Input
                    id="budget"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="$1,500 – $15,000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Project Details *
                </label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your project, goals, and timeline..."
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-emerald-signal">
                  <CheckCircle className="h-4 w-4" />
                  Message sent! We&apos;ll respond within 2 hours.
                </div>
              )}
              {status === "error" && (
                <p className="text-sm text-rose-alert">
                  Something went wrong. Email us at {studio.email}
                </p>
              )}

              <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
