"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services, Service } from "@/lib/data/services";
import { ArrowUpRight, X, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const categories = [
  "All Services",
  "Artificial Intelligence",
  "SaaS Platforms",
  "Core Engineering",
  "Data & Craft Design"
];

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  const filteredServices = services.filter((service) => {
    if (selectedCategory === "All Services") return true;
    if (selectedCategory === "Data & Craft Design") {
      return service.tags.includes("data") || service.tags.includes("design");
    }
    return service.category === selectedCategory;
  });

  const handleConsultService = (serviceName: string) => {
    window.dispatchEvent(
      new CustomEvent("open-advisor", {
        detail: { message: `I'd like to learn more about your ${serviceName} service.` },
      })
    );
    setSelectedService(null);
  };

  return (
    <section id="services" className="section-padding bg-background/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-cyan-pulse">
            Services
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            What We Build
          </h2>
          <p className="text-muted-foreground text-lg">
            End-to-end delivery from AI strategy to production deployment.
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-violet-core text-white"
                  : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={service.id}
                className="h-full"
              >
                <Card 
                  onClick={() => setSelectedService(service)}
                  className="h-full flex flex-col group hover:-translate-y-1 transition-all duration-300 border-foreground/10 hover:border-violet-core/30 hover:shadow-lg hover:shadow-violet-core/5 cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-core/20 to-cyan-pulse/20 text-violet-core group-hover:from-violet-core/30 group-hover:to-cyan-pulse/30 transition-colors">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-muted-foreground transition-all group-hover:text-cyan-pulse group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-foreground/10">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto pt-0">
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-foreground/5 text-[11px] font-mono text-muted-foreground tracking-tight"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="px-2.5 py-1 rounded bg-foreground/5 text-[11px] font-mono text-muted-foreground tracking-tight">
                          +{service.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed left-[50%] top-[50%] z-[101] grid w-[95%] max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-2xl sm:rounded-2xl md:w-full overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-4">
                   <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-core/20 to-cyan-pulse/20 text-violet-core">
                     <selectedService.icon className="h-6 w-6" />
                   </div>
                   <div>
                     <span className="text-xs font-semibold uppercase tracking-wider text-cyan-pulse mb-1 block">
                       {selectedService.categoryBadge}
                     </span>
                     <h2 className="text-2xl font-bold tracking-tight">{selectedService.title}</h2>
                   </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="rounded-full p-2 hover:bg-foreground/5 transition-colors shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {selectedService.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Supported Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Deliverables</h4>
                  <ul className="space-y-3">
                    {selectedService.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-cyan-pulse shrink-0" />
                        <span className="text-sm text-muted-foreground leading-snug">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-border">
                <Button 
                  onClick={() => handleConsultService(selectedService.title)}
                  className="w-full sm:flex-1 bg-violet-core hover:bg-violet-core/90 text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discuss Stack on AI Advisor
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto"
                >
                  Close Details
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
