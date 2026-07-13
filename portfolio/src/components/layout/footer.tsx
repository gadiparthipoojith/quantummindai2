import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { studio } from "@/lib/data/team";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/50">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-core to-cyan-pulse text-sm font-bold text-white">
                AF
              </div>
              <span className="font-semibold">{studio.name}</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">{studio.description}</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/quantummind-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 transition-colors hover:border-violet-core/50 hover:bg-violet-core/10"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/quantummind-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 transition-colors hover:border-violet-core/50 hover:bg-violet-core/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/quantummind_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 transition-colors hover:border-violet-core/50 hover:bg-violet-core/10"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${studio.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 transition-colors hover:border-violet-core/50 hover:bg-violet-core/10"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#services" className="hover:text-violet-core transition-colors">AI Agents</Link></li>
              <li><Link href="/#services" className="hover:text-violet-core transition-colors">SaaS Development</Link></li>
              <li><Link href="/#services" className="hover:text-violet-core transition-colors">Automation</Link></li>
              <li><Link href="/#services" className="hover:text-violet-core transition-colors">Data Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/resume" className="hover:text-violet-core transition-colors">Resume</Link></li>
              <li><Link href="/dashboard" className="hover:text-violet-core transition-colors">Dashboard</Link></li>
              <li><Link href="/#faq" className="hover:text-violet-core transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {studio.name}. All rights reserved.</p>
          <p>{studio.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
