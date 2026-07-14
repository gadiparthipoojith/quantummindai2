"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import { pricingPlans, addOns } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-amber-trust">
            Pricing
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Transparent Packages
          </h2>
          <p className="text-muted-foreground text-lg">
            Fixed-price packages with clear deliverables. Custom scopes available.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.1}>
              <div
                className={cn(
                  "glass relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-core/50 hover:shadow-xl hover:shadow-violet-core/20",
                  plan.popular && "border-violet-core/50 shadow-lg shadow-violet-core/10"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-core to-cyan-pulse px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-3 text-3xl font-bold">{plan.price}</div>
                <p className="mt-4 mb-6 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-signal" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="hoverHighlight"
                  className="w-full"
                >
                  <Link href="#contact">{plan.cta}</Link>
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Dynamic Interactive Cost Estimator CTA (Replaces Add-ons) */}
        <ScrollReveal className="mt-12 text-center">
          <div className="glass mx-auto max-w-3xl rounded-2xl p-8 flex flex-col items-center gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Need a custom scope?</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Configure your exact services, development modules, and support retainers to calculate a custom project quote dynamically.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="font-bold"
            >
              <Link href="/dashboard?tab=calculator">Interactive Cost Estimator</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
