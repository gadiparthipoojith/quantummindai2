"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, Sparkles, ArrowLeft, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GradientMesh } from "@/components/effects/gradient-mesh";
import {
  FALLBACK_RATES,
  fetchExchangeRates,
  detectUserCurrency,
  formatCurrencyValue,
} from "@/lib/currency";
import { CurrencySelector } from "@/components/ui/currency-selector";

export default function CostEstimatorPage() {
  const [currency, setCurrency] = useState<string>("INR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [tier, setTier] = useState<"starter" | "professional" | "enterprise">("professional");
  const [services, setServices] = useState<Record<string, boolean>>({
    chatbot: false,
    agent: true,
    app: true,
    dashboard: false,
    api: false,
    database: false
  });
  const [support, setSupport] = useState<"none" | "basic" | "standard" | "premium">("none");
  const [servicePrices, setServicePrices] = useState<any[]>([
    { id: "chatbot", label: "AI Chatbot MVP", price: "₹35,000", desc: "Conversational RAG agent", value: 35000 },
    { id: "agent", label: "AI Agent Workflow", price: "₹70,000", desc: "Multi-agent LangGraph flows", value: 70000 },
    { id: "app", label: "Full Stack App", price: "₹70,000", desc: "Next.js frontend + FastAPI", value: 70000 },
    { id: "dashboard", label: "Data Dashboard", price: "₹30,000", desc: "Real-time analytics UI", value: 30000 },
    { id: "api", label: "API Integrations", price: "₹20,000", desc: "Custom webhooks & gateways", value: 20000 },
    { id: "database", label: "Database Design", price: "₹25,000", desc: "Supabase / PostgreSQL setup", value: 25000 }
  ]);
  const [tierPrices, setTierPrices] = useState<any[]>([
    { id: "starter", label: "Starter Tier", price: "Base: ₹20,000", desc: "MVP / Proof of Concept", value: 20000 },
    { id: "professional", label: "Professional", price: "Base: ₹80,000", desc: "Production-ready apps", value: 80000 },
    { id: "enterprise", label: "Enterprise", price: "Base: ₹2,50,000", desc: "High scale & compliance", value: 250000 }
  ]);
  const [supportPrices, setSupportPrices] = useState<any[]>([
    { id: "none", label: "No Support", price: "₹0", value: 0 },
    { id: "basic", label: "Basic Plan", price: "₹3,000", value: 3000 },
    { id: "standard", label: "Standard Plan", price: "₹10,000", value: 10000 },
    { id: "premium", label: "Premium Plan", price: "₹15,000", value: 15000 }
  ]);

  const fetchPricing = async () => {
    try {
      const res = await fetch("/api/config");
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.services) setServicePrices(json.data.services);
        if (json.data.tiers) setTierPrices(json.data.tiers);
        if (json.data.support) setSupportPrices(json.data.support);
      }
    } catch (e) {
      console.error("Failed to fetch pricing", e);
    }
  };

  useEffect(() => {
    fetchPricing();
    fetchExchangeRates().then(setRates);

    const stored = localStorage.getItem("selected_currency");
    if (stored) {
      setCurrency(stored);
    } else {
      detectUserCurrency().then((detected) => {
        setCurrency(detected);
        localStorage.setItem("selected_currency", detected);
      });
    }

    const handleCurrencySync = () => {
      const updated = localStorage.getItem("selected_currency");
      if (updated) setCurrency(updated);
    };
    window.addEventListener("currency_changed", handleCurrencySync);
    return () => window.removeEventListener("currency_changed", handleCurrencySync);
  }, []);

  const formatVal = (val: number) => {
    return formatCurrencyValue(val, currency, rates);
  };

  const calculateEstimate = () => {
    const activeTier = tierPrices.find(t => t.id === tier);
    const base = activeTier ? activeTier.value : 80000;

    let addOnsCost = 0;
    servicePrices.forEach(sp => {
      if (services[sp.id]) addOnsCost += sp.value;
    });

    const activeSupport = supportPrices.find(s => s.id === support);
    const supportMonthly = activeSupport ? activeSupport.value : 0;

    const totalSetup = base + addOnsCost;
    
    // Real-world dynamic timeline calculation
    let minWeeks = 3;
    let maxWeeks = 4;
    
    if (tier === "professional") {
      minWeeks = 6;
      maxWeeks = 8;
    } else if (tier === "enterprise") {
      minWeeks = 12;
      maxWeeks = 16;
    }

    let extraWeeks = 0;
    if (services.app) extraWeeks += 1;
    if (services.dashboard) extraWeeks += 1;
    if (services.api) extraWeeks += 1;
    if (services.database) extraWeeks += 1;
    if (services.chatbot) extraWeeks += 2;
    if (services.agent) extraWeeks += 3;

    minWeeks += extraWeeks;
    maxWeeks += extraWeeks;

    const time = `${minWeeks}-${maxWeeks} weeks`;

    return { totalSetup, supportMonthly, time };
  };

  const { totalSetup, supportMonthly, time } = calculateEstimate();

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 font-sans">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientMesh />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen pt-24 pb-16">
          <main className="container mx-auto px-4 md:px-6 max-w-5xl flex-grow space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/5 pb-6">
              <div>
                <span className="text-xxs uppercase tracking-wider text-violet-glow font-bold flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Dynamic Estimation Engine
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
                  Interactive Cost Estimator
                </h1>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                  Tailor project development tiers, target modules, and support packages to instantly calculate customized timeline and budget guidelines.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Currency Switcher */}
                <CurrencySelector
                  value={currency}
                  onChange={(val) => {
                    setCurrency(val);
                    localStorage.setItem("selected_currency", val);
                    window.dispatchEvent(new Event("currency_changed"));
                  }}
                  align="right"
                />

                <Button asChild variant="outline" className="border-foreground/10 hover:bg-foreground/5 h-10">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Portfolio
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="glass border-foreground/10 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 h-40 w-40 bg-violet-core/5 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-cyan-pulse/5 blur-[80px] pointer-events-none" />
              
              <CardContent className="grid gap-8 md:grid-cols-12 p-6 md:p-8">
                <div className="md:col-span-7 space-y-6">
                  {/* TIER SELECTION */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 block">
                      1. Project Development Tier
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {tierPrices.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setTier(c.id as any)}
                          type="button"
                          className={`rounded-xl border p-4 text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                            tier === c.id
                              ? "border-violet-core bg-violet-core/5 text-slate-100 shadow-lg shadow-violet-core/10"
                              : "border-foreground/10 hover:border-foreground/20 bg-foreground/5 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{c.label}</span>
                            <span className="text-[10px] text-muted-foreground line-clamp-2 mt-1 leading-tight">{c.desc}</span>
                          </div>
                          <span className="text-xs font-bold text-violet-glow mt-3 block">Base: {formatVal(c.value)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SERVICES SELECTION */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      2. Select Targeted Services & Modules
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {servicePrices.map((item) => {
                        const isSelected = !!services[item.id];
                        return (
                          <label
                            key={item.id}
                            className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? "border-violet-core/60 bg-violet-core/5 shadow-md shadow-violet-core/5" 
                                : "border-foreground/5 bg-foreground/3 hover:bg-foreground/8"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => setServices(prev => ({ ...prev, [item.id]: e.target.checked }))}
                              className="mt-1 accent-violet-core cursor-pointer h-4 w-4 rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-slate-100 truncate">{item.label}</span>
                                <span className="text-[10px] font-bold text-violet-glow shrink-0">{formatVal(item.value)}</span>
                              </div>
                              <span className="text-[10px] text-muted-foreground block leading-tight mt-1">{item.desc}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* SUPPORT PLAN SELECTION */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 block">
                      3. Support Retainer Plan (Monthly Add-on)
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {supportPrices.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSupport(s.id as any)}
                          type="button"
                          className={`rounded-xl border p-3 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[64px] ${
                            support === s.id
                              ? "border-violet-core bg-violet-core/5 text-slate-100 shadow-md shadow-violet-core/5"
                              : "border-foreground/10 hover:border-foreground/20 bg-foreground/5 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="text-xxs font-bold block">{s.label}</span>
                          <span className="text-[10px] text-violet-glow font-semibold mt-1 block">
                            {formatVal(s.value)}{s.id !== "none" ? "/mo" : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ESTIMATOR OUTCOME CARD */}
                <div className="md:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-2xl border border-violet-core/20 bg-gradient-to-br from-violet-core/5 to-slate-900/50 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-violet-core/10 blur-3xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-foreground/5 pb-3">
                      <Calculator className="h-5 w-5 text-violet-glow" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Estimated Investment Summary</h4>
                    </div>

                    <div className="space-y-5">
                      <div className="p-3 rounded-lg bg-black/10 border border-foreground/5">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">Project Development Duration</span>
                        <span className="text-lg font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">{time}</span>
                      </div>

                      <div className="p-4 rounded-xl bg-violet-core/10 border border-violet-core/20">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">One-time Setup Budget</span>
                        <span className="text-3xl font-extrabold text-white block mt-1 tracking-tight">{formatVal(totalSetup)}</span>
                        <span className="text-[9px] text-muted-foreground mt-1 block leading-tight">*Calculated base plus selected modules</span>
                      </div>

                      {supportMonthly > 0 && (
                        <div className="p-3.5 rounded-lg bg-cyan-pulse/5 border border-cyan-pulse/15">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Ongoing Support Retainer</span>
                          <span className="text-lg font-bold text-cyan-pulse mt-0.5 block">{formatVal(supportMonthly)} / month</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Button asChild size="lg" className="w-full bg-violet-core hover:bg-violet-glow text-white font-bold h-12">
                      <Link href="/#contact">Schedule Consultation</Link>
                    </Button>
                    <p className="text-[9px] text-center text-muted-foreground leading-normal px-2">
                      Submit this scope request details in the contact form to lock in this pricing matrix code.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
