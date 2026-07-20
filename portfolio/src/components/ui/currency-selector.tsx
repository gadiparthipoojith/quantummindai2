"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Search, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/lib/currency";

interface CurrencySelectorProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  align?: "left" | "right" | "center";
  size?: "sm" | "md" | "lg";
}

export function CurrencySelector({
  value,
  onChange,
  className,
  align = "center",
  size = "md",
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search query when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const activeCurrency = CURRENCIES.find((c) => c.code === value) || CURRENCIES[0];

  const filteredCurrencies = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonSizeClasses = {
    sm: "px-3.5 py-1.5 text-[10px] gap-1.5 h-8",
    md: "px-4 py-2 text-xs gap-2 h-10",
    lg: "px-5 py-2.5 text-sm gap-2.5 h-12",
  }[size];

  const iconSizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-4.5 w-4.5",
  }[size];

  const chevronSizeClasses = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  }[size];

  return (
    <div className={cn("relative inline-block text-left z-40", className)} ref={dropdownRef}>
      {/* Active Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          "flex items-center bg-slate-900/60 backdrop-blur-md rounded-full border border-foreground/10 hover:border-violet-core/40 shadow-lg text-slate-100 font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer outline-none",
          buttonSizeClasses
        )}
      >
        <Globe className={cn("text-violet-glow animate-pulse shrink-0", iconSizeClasses)} />
        {size !== "sm" && <span className="text-muted-foreground mr-0.5">Currency:</span>}
        <span className="text-slate-100 flex items-center gap-1.5">
          {size === "sm" ? `${activeCurrency.name.split(" ")[0]} ${activeCurrency.code}` : activeCurrency.name}
        </span>
        <ChevronDown
          className={cn(
            "text-muted-foreground transition-transform duration-300 shrink-0",
            chevronSizeClasses,
            isOpen && "rotate-180 text-violet-glow"
          )}
        />
      </button>

      {/* Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute mt-2 w-64 rounded-2xl border border-foreground/10 bg-slate-950/95 backdrop-blur-xl p-3 shadow-2xl z-50 flex flex-col gap-2 max-h-[350px] overflow-hidden",
              align === "right" && "right-0 origin-top-right",
              align === "left" && "left-0 origin-top-left",
              align === "center" && "left-1/2 -translate-x-1/2 origin-top"
            )}
          >
            {/* Search Input */}
            <div className="relative flex items-center bg-slate-900/80 rounded-xl border border-foreground/5 px-2.5 py-1.5 focus-within:border-violet-core/30 transition-all duration-300">
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search currency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-slate-100 border-none outline-none pl-2 pr-1 w-full focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Scrollable Currencies List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-0.5 custom-scrollbar max-h-[250px]">
              {filteredCurrencies.length > 0 ? (
                filteredCurrencies.map((c) => {
                  const isSelected = c.code === value;
                  return (
                    <button
                      key={c.code}
                      onClick={() => {
                        onChange(c.code);
                        setIsOpen(false);
                      }}
                      type="button"
                      className={cn(
                        "w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all duration-200 cursor-pointer",
                        isSelected
                          ? "bg-gradient-to-r from-violet-core/20 to-cyan-pulse/10 text-white border border-violet-core/20 font-semibold"
                          : "text-muted-foreground hover:text-slate-100 hover:bg-white/5 border border-transparent"
                      )}
                    >
                      <span>{c.name}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-cyan-pulse shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="text-[10px] text-center text-muted-foreground py-6">
                  No currencies match your search.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
