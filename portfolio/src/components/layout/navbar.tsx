"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { studio } from "@/lib/data/team";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

const baseNavLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#portfolio", label: "Projects", requiresProjects: true },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const router = useRouter();
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      setShowLogoModal(true);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        router.push("/");
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function checkProjects() {
      try {
        const res = await fetch("/api/projects/public");
        const data = await res.json();
        if (data.success && data.projects && data.projects.length > 0) {
          setHasProjects(true);
        }
      } catch (error) {
        console.error("Failed to check projects for navbar", error);
      }
    }
    checkProjects();
  }, []);

  const navLinks = baseNavLinks.filter(
    (link) => !link.requiresProjects || hasProjects
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong py-3 shadow-lg shadow-black/10"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-6 relative">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group cursor-pointer">
          <Logo />
          <span className="hidden font-semibold tracking-tight sm:block">
            Quantum Mind <span className="text-violet-core">AI Innovations</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong border-t border-foreground/10 lg:hidden overflow-hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm transition-colors hover:bg-foreground/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-violet-core"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoModal(false)}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl cursor-zoom-out select-none"
          >
            {/* Header branding info */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute top-8 text-center"
            >
              <h2 className="text-xl font-bold text-slate-100 tracking-wide uppercase">Quantum Mind AI Innovations</h2>
              <p className="text-xs text-muted-foreground mt-1">Double click or click anywhere to exit full view</p>
            </motion.div>

            {/* Scale-up animated logo image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative p-12 bg-slate-950/40 rounded-3xl border border-slate-800/80 shadow-[0_0_80px_rgba(14,165,233,0.15)] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking the card
              onDoubleClick={() => setShowLogoModal(false)}
            >
              <Logo className="h-64 w-64 md:h-80 md:w-80 drop-shadow-[0_0_40px_rgba(0,245,212,0.4)]" />
            </motion.div>
            
            {/* Close action at bottom */}
            <button 
              onClick={() => setShowLogoModal(false)}
              className="absolute bottom-8 px-6 py-2 rounded-full border border-slate-700/60 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Close View
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
