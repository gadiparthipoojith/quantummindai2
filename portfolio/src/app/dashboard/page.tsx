"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  LayoutDashboard,
  FileText,
  FileCheck,
  TrendingUp,
  DollarSign,
  Briefcase,
  Sparkles,
  Calculator,
  ChevronRight,
  Download,
  Lock,
  Unlock,
  LogOut,
  LogIn,
  X,
  UserCheck,
  Layers,
  Database,
  Folder,
  FolderOpen,
  Menu,
  Plus,
  Key,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Types
type UserRole = "public" | "admin" | "client_acme" | "client_nova" | "client_apex";

interface Milestone {
  title: string;
  date: string;
  status: "Completed" | "In Progress" | "Scheduled";
}

interface SOWDoc {
  name: string;
  type: string;
  size: string;
  desc: string;
}

interface ProjectData {
  id: string;
  clientId: string;
  clientName: string;
  projectName: string;
  budget: string;
  timeline: string;
  progress: number;
  roadmap: Milestone[];
  documents: SOWDoc[];
}

// Replaced CLIENT_PROJECTS with dynamic DB fetching

export default function DashboardPage() {
  // Authentication Role State
  const [role, setRole] = useState<UserRole | string>("public");
  const [userId, setUserId] = useState("");
  const [signedInName, setSignedInName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  // Navigation and Sidebar Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "calculator" | "documents" | "devtools" | "projects" | "access">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync active tab with search parameter from URL on client side
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "calculator" || tab === "overview" || tab === "documents" || tab === "devtools" || tab === "projects" || tab === "access") {
      setActiveTab(tab as any);
    }
  }, []);

  // Founder Active Client Selection
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  // Project ROI & Estimate Calculator State
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
  const [showEditPricesModal, setShowEditPricesModal] = useState(false);
  const [isSavingPrices, setIsSavingPrices] = useState(false);

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
  }, []);

  // Admin Manage Projects State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClientForUpload, setSelectedClientForUpload] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectBudget, setNewProjectBudget] = useState("");
  const [newProjectTimeline, setNewProjectTimeline] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Status Update State
  const [projectToUpdate, setProjectToUpdate] = useState<ProjectData | null>(null);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateRoadmap, setUpdateRoadmap] = useState<Milestone[]>([]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Fetch clients for admin upload
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (res.ok && data.success) {
        setClients(data.clients);
      }
    } catch (e) {
      console.error("Failed to fetch clients", e);
    }
  };

  // Database Viewer State
  const [dbData, setDbData] = useState<{users: any[], contactMessages: any[], projects: any[], loginLogs: any[]} | null>(null);
  const [activeDbTable, setActiveDbTable] = useState<"users" | "contactMessages" | "projects" | "loginLogs">("users");

  const fetchDatabase = async () => {
    try {
      const res = await fetch("/api/database");
      const data = await res.json();
      if (res.ok && data.success) {
        setDbData(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch database", e);
    }
  };

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("client");
  const [newUserPasscode, setNewUserPasscode] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const generatePasscode = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewUserPasscode(random);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUserName, role: newUserRole, passcode: newUserPasscode }),
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to create user.");
      } else {
        setShowCreateUserModal(false);
        setNewUserName("");
        setNewUserRole("client");
        setNewUserPasscode("");
        fetchDatabase();
      }
    } catch (err) {
      console.error(err);
      alert("Error creating user.");
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to delete user.");
      } else {
        fetchDatabase();
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user.");
    }
  };

  useEffect(() => {
    if (activeTab === "devtools" && role === "admin") {
      fetchDatabase();
    }
  }, [activeTab, role]);

  // Authentication validation handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = passcode.trim();
    if (!key) return;

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: key }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setRole(data.user.role);
        setUserId(data.user.id);
        const displayName = data.user.role === "admin" 
          ? `${data.user.name} (Founder)` 
          : `Client: ${data.user.clientAlias || data.user.name}`;
        setSignedInName(displayName);
        setShowLoginModal(false);
        setPasscode("");
        
        fetchProjects(data.user.id);
        if (data.user.role === "admin") {
          fetchClients();
        }
      } else {
        setLoginError(data.error || "Invalid passcode. Please try again or contact support.");
      }
    } catch (err) {
      setLoginError("Failed to authenticate. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchProjects = async (uid: string) => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch(`/api/projects?userId=${uid}`);
      const data = await res.json();
      if (res.ok && data.success) {
        const parsed = data.projects.map((p: any) => ({
          ...p,
          id: p.id,
          roadmap: JSON.parse(p.roadmap),
          documents: JSON.parse(p.documents)
        }));
        setProjects(parsed);
        if (parsed.length > 0) setSelectedProjectId(parsed[0].id);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Failed to fetch projects.", err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleUploadProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientForUpload || !newProjectName) return;

    setIsUploading(true);
    try {
      const selectedClientObj = clients.find(c => c.id === selectedClientForUpload);
      
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClientForUpload,
          clientName: selectedClientObj?.clientAlias || selectedClientObj?.name || "Unknown",
          projectName: newProjectName,
          budget: newProjectBudget,
          timeline: newProjectTimeline,
          progress: 0,
          roadmap: JSON.stringify([
            { title: "Project Kickoff", date: "TBD", status: "Scheduled" }
          ]),
          documents: "[]"
        })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setShowUploadModal(false);
        setNewProjectName("");
        setNewProjectBudget("");
        setNewProjectTimeline("");
        setSelectedClientForUpload("");
        fetchProjects(userId);
      } else {
        alert(data.error || "Failed to create project");
      }
    } catch (err) {
      alert("Error creating project.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectToUpdate) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectToUpdate.id,
          progress: updateProgress,
          roadmap: JSON.stringify(updateRoadmap)
        })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setShowStatusModal(false);
        setProjectToUpdate(null);
        fetchProjects(userId);
      } else {
        alert(data.error || "Failed to update project status");
      }
    } catch (err) {
      alert("Error updating status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSignOut = () => {
    setRole("public");
    setUserId("");
    setSignedInName("");
    setProjects([]);
    setActiveTab("overview");
  };

  // Pricing Estimator math
  const calculateEstimate = () => {
    const activeTier = tierPrices.find(t => t.id === tier);
    const base = activeTier ? activeTier.value : 20000;

    let addOnsCost = 0;
    servicePrices.forEach(sp => {
      if (services[sp.id]) addOnsCost += sp.value;
    });

    const activeSupport = supportPrices.find(s => s.id === support);
    const supportMonthly = activeSupport ? activeSupport.value : 0;

    const totalSetup = base + addOnsCost;
    
    // Real-world dynamic timeline calculation
    let minWeeks = 3;
    let maxWeeks = 4; // starter base
    
    if (tier === "professional") {
      minWeeks = 6;
      maxWeeks = 8;
    } else if (tier === "enterprise") {
      minWeeks = 12;
      maxWeeks = 16;
    }

    // Add extra weeks for selected services
    let extraWeeks = 0;
    if (services.app) extraWeeks += 1;
    if (services.dashboard) extraWeeks += 1;
    if (services.api) extraWeeks += 1;
    if (services.database) extraWeeks += 1;

    // AI integrations increase the timeline even more
    if (services.chatbot) extraWeeks += 2; // AI chatbot MVP
    if (services.agent) extraWeeks += 3;   // AI Agent workflow (LangGraph etc)

    minWeeks += extraWeeks;
    maxWeeks += extraWeeks;

    const time = `${minWeeks}-${maxWeeks} weeks`;

    return { totalSetup, supportMonthly, time };
  };

  const { totalSetup, supportMonthly, time } = calculateEstimate();

  // Helper renderer to lock a tab for general visitors
  const renderLockedOverlay = () => {
    return (
      <div className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center border border-white/10 bg-slate-950/40 backdrop-blur-md p-8 text-center shadow-xl">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-core/20 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-pulse/10 blur-[60px] pointer-events-none" />
        
        <div className="max-w-md space-y-6 z-10">
          <div className="mx-auto rounded-full bg-rose-alert/10 w-16 h-16 flex items-center justify-center border border-rose-alert/20 animate-pulse">
            <Lock className="h-6 w-6 text-rose-alert" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-100">Client Workspace Locked</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Active milestone tracking, SOW documents, and budget reports are restricted for general visitors.
            </p>
            <p className="text-xs text-violet-glow font-medium mt-1">
              Are you a Partner or Quantum Mind AI Client? Sign in to unlock.
            </p>
          </div>
          <div>
            <Button onClick={() => setShowLoginModal(true)}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In to Workspace
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-core/5 blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-pulse/5 blur-[100px]" />
        </div>

        {/* SIDEBAR - DESKTOP FIXED */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-950/40 backdrop-blur-xl z-20 flex-shrink-0">
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-core to-cyan-pulse text-sm font-bold text-white transition-transform group-hover:scale-105">
                QM
              </div>
              <span className="font-semibold tracking-tight text-slate-100">
                QuantumMind<span className="text-violet-core"> AI</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard, lock: role === "public" },
              { id: "calculator", label: "Project Cost Estimator", icon: Calculator, lock: false },
              { id: "documents", label: "Agreements & Docs", icon: FileText, lock: role === "public" }
            ].map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer ${
                    isActive
                      ? "bg-violet-core/10 border-violet-core/30 text-violet-glow"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.lock && <Lock className="h-3 w-3 text-rose-alert/80" />}
                </button>
              );
            })}
            
            {role === "admin" && (
              <button
                onClick={() => setActiveTab("projects")}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer mt-4 ${
                  activeTab === "projects"
                    ? "bg-violet-core/20 border-violet-core/40 text-violet-glow"
                    : "bg-violet-core/5 border-violet-core/20 text-violet-glow/70 hover:text-violet-glow hover:bg-violet-core/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="h-4 w-4" />
                  <span>Manage Projects</span>
                </div>
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => setActiveTab("access")}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer mt-4 ${
                  activeTab === "access"
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                    : "bg-amber-500/5 border-amber-500/20 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Key className="h-4 w-4" />
                  <span>Access Management</span>
                </div>
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => setActiveTab("devtools")}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer mt-2 ${
                  activeTab === "devtools"
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4" />
                  <span>Developer Tools</span>
                </div>
              </button>
            )}
          </div>

          {/* Sidebar User Footer / Login / Logout */}
          <div className="p-4 border-t border-white/5">
            {role === "public" ? (
              <Button onClick={() => setShowLoginModal(true)} variant="outline" className="w-full text-xs font-semibold h-10 border-white/10 hover:bg-white/5">
                <LogIn className="h-4 w-4 mr-2" />
                Workspace Sign In
              </Button>
            ) : (
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Signed In As</span>
                  <span className="text-xs font-bold text-violet-glow truncate">{signedInName}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-rose-alert/10 hover:bg-rose-alert/20 text-rose-alert transition border border-rose-alert/15 cursor-pointer flex-shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* SIDEBAR - MOBILE SLIDEOVER DRAWER */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              />
              {/* Drawer Container */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-slate-950 z-40 flex flex-col lg:hidden"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-core to-cyan-pulse text-xs font-bold text-white">
                      QM
                    </div>
                    <span className="font-semibold tracking-tight text-sm text-slate-100">
                      QuantumMind<span className="text-violet-core"> AI</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                  {[
                    { id: "overview", label: "Overview", icon: LayoutDashboard, lock: role === "public" },
                    { id: "calculator", label: "Project Cost Estimator", icon: Calculator, lock: false },
                    { id: "documents", label: "Agreements & Docs", icon: FileText, lock: role === "public" }
                  ].map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setSidebarOpen(false);
                        }}
                        type="button"
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer ${
                          isActive
                            ? "bg-violet-core/10 border-violet-core/30 text-violet-glow"
                            : "bg-transparent border-transparent text-muted-foreground hover:text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.lock && <Lock className="h-3 w-3 text-rose-alert/80" />}
                      </button>
                    );
                  })}

                  {role === "admin" && (
                    <button
                      onClick={() => {
                        setActiveTab("projects");
                        setSidebarOpen(false);
                      }}
                      type="button"
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer mt-4 ${
                        activeTab === "projects"
                          ? "bg-violet-core/20 border-violet-core/40 text-violet-glow"
                          : "bg-violet-core/5 border-violet-core/20 text-violet-glow/70 hover:text-violet-glow hover:bg-violet-core/10"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Briefcase className="h-4 w-4" />
                        <span>Manage Projects</span>
                      </div>
                    </button>
                  )}

                  {role === "admin" && (
                    <button
                      onClick={() => {
                        setActiveTab("access");
                        setSidebarOpen(false);
                      }}
                      type="button"
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer mt-4 ${
                        activeTab === "access"
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : "bg-amber-500/5 border-amber-500/20 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Key className="h-4 w-4" />
                        <span>Access Management</span>
                      </div>
                    </button>
                  )}

                  {role === "admin" && (
                    <button
                      onClick={() => {
                        setActiveTab("devtools");
                        setSidebarOpen(false);
                      }}
                      type="button"
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border text-left cursor-pointer mt-2 ${
                        activeTab === "devtools"
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                          : "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Database className="h-4 w-4" />
                        <span>Developer Tools</span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Mobile User Footer */}
                <div className="p-4 border-t border-white/5">
                  {role === "public" ? (
                    <Button
                      onClick={() => {
                        setShowLoginModal(true);
                        setSidebarOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-xs font-semibold h-10 border-white/10"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Workspace Sign In
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Signed In As</span>
                        <span className="text-xs font-bold text-violet-glow truncate">{signedInName}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="h-8 w-8 rounded-lg flex items-center justify-center bg-rose-alert/10 hover:bg-rose-alert/20 text-rose-alert transition border border-rose-alert/15 cursor-pointer flex-shrink-0"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* MAIN PANEL CONTENT */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* TOP BAR / NAVIGATION */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-slate-950/20 backdrop-blur z-10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-slate-100 lg:hidden cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="hover:bg-white/5 h-8">
                  <Link href="/">
                    <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                    Back to Portfolio
                  </Link>
                </Button>
              </div>
            </div>

            {/* Dynamic Status / Badge */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-signal animate-pulse" />
                <span className="text-muted-foreground font-semibold">Workspace Live</span>
              </div>

              {role !== "public" && (
                <div className="hidden md:block text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-violet-core/10 border border-violet-core/20 text-violet-glow">
                  {role === "admin" ? "Founder View" : "Client Portal"}
                </div>
              )}
            </div>
          </header>

          {/* SCROLLABLE MAIN BODY VIEW */}
          <main className="flex-grow p-6 md:p-8 overflow-y-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                {activeTab === "overview" && "Milestone Overview & Tracking"}
                {activeTab === "calculator" && "Interactive Cost Estimator"}
                {activeTab === "documents" && "Workspace Folders & Agreements"}
                {activeTab === "devtools" && "Developer & Admin Tools"}
                {activeTab === "projects" && "Manage Projects"}
              </h1>
              <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
                {activeTab === "overview" && "Monitor active pipeline execution milestones, timeline tracking, and budgets."}
                {activeTab === "calculator" && "Tailor project development services to calculate custom budgets in Indian Rupees (₹)."}
                {activeTab === "documents" && "Access and review statements of work, HIPAA agreements, and contract files."}
                {activeTab === "devtools" && "Manage system database, view logs, and configure internal settings."}
                {activeTab === "projects" && "Upload new projects and update milestone statuses."}
              </p>
            </div>

            {/* TAB PANELS */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {role === "public" ? (
                  renderLockedOverlay()
                ) : role === "admin" ? (
                  /* Founder Dashboard view */
                  <>
                    {/* Founder Aggregate Metrics */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card className="glass border-white/10 p-5 bg-gradient-to-br from-violet-core/5 to-slate-900/50">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-violet-core/10 border border-violet-core/20 flex items-center justify-center text-violet-glow flex-shrink-0">
                            <DollarSign className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xxs uppercase tracking-wider text-muted-foreground font-bold">Total active Pipeline</span>
                            <h3 className="text-2xl font-bold text-slate-100 mt-0.5">₹7,50,000</h3>
                          </div>
                        </div>
                      </Card>
                      <Card className="glass border-white/10 p-5 bg-gradient-to-br from-cyan-pulse/5 to-slate-900/50">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-cyan-pulse/10 border border-cyan-pulse/20 flex items-center justify-center text-cyan-pulse flex-shrink-0">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xxs uppercase tracking-wider text-muted-foreground font-bold">Active Clients</span>
                            <h3 className="text-2xl font-bold text-slate-100 mt-0.5">3 Brands</h3>
                          </div>
                        </div>
                      </Card>
                      <Card className="glass border-white/10 p-5 bg-gradient-to-br from-violet-core/5 to-slate-900/50">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-violet-core/10 border border-violet-core/20 flex items-center justify-center text-violet-glow flex-shrink-0">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xxs uppercase tracking-wider text-muted-foreground font-bold">Studio Operations</span>
                            <h3 className="text-2xl font-bold text-slate-100 mt-0.5">Healthy (100%)</h3>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Timeline Quick Client Selection for Founders */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-violet-glow" />
                          Toggle Active Project Timeline
                        </h3>
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
                          {projects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedProjectId(p.id)}
                              type="button"
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                selectedProjectId === p.id
                                  ? "bg-violet-core text-white"
                                  : "text-muted-foreground hover:text-slate-100"
                              }`}
                            >
                              {p.clientName}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Display Selected Client Milestone tracker */}
                      {projects.length > 0 && selectedProjectId && (
                        <Card className="glass border-white/10">
                          <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center justify-between">
                              <span>{projects.find(p => p.id === selectedProjectId)?.projectName} ({projects.find(p => p.id === selectedProjectId)?.clientName})</span>
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-violet-glow">Est Budget: {projects.find(p => p.id === selectedProjectId)?.budget}</span>
                              </div>
                            </CardTitle>
                            <CardDescription>Founder milestone management and deliverables overview.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {projects.find(p => p.id === selectedProjectId)?.roadmap.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                                    step.status === "Completed"
                                      ? "bg-violet-core border-violet-core text-white"
                                      : step.status === "In Progress"
                                      ? "border-cyan-pulse text-cyan-pulse animate-pulse"
                                      : "border-white/10 text-muted-foreground"
                                  }`}>
                                    {idx + 1}
                                  </div>
                                  {idx !== (projects.find(p => p.id === selectedProjectId)?.roadmap.length ?? 1) - 1 && (
                                    <div className="h-10 w-0.5 bg-white/10" />
                                  )}
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-sm">{step.title}</h4>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                                      step.status === "Completed"
                                        ? "bg-violet-core/10 text-violet-core"
                                        : step.status === "In Progress"
                                        ? "bg-cyan-pulse/10 text-cyan-pulse"
                                        : "bg-white/5 text-muted-foreground"
                                    }`}>
                                      {step.status}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">Target Delivery: {step.date}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </>
                ) : (
                  /* Specific Client Roadmap view */
                  <div className="space-y-6">
                    {projects.length > 0 && projects.map((clientProject) => (
                      <div key={clientProject.id} className="space-y-6">
                        {/* Client specific metrics row */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Card className="glass border-white/10 p-5 bg-gradient-to-br from-cyan-pulse/5 to-slate-900/50">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-cyan-pulse/10 border border-cyan-pulse/20 flex items-center justify-center text-cyan-pulse flex-shrink-0">
                                <DollarSign className="h-5 w-5" />
                              </div>
                              <div>
                                <span className="text-xxs uppercase tracking-wider text-muted-foreground font-bold">Approved Budget</span>
                                <h3 className="text-2xl font-bold text-slate-100 mt-0.5">
                                  {clientProject.budget}
                                </h3>
                              </div>
                            </div>
                          </Card>
                          <Card className="glass border-white/10 p-5 bg-gradient-to-br from-violet-core/5 to-slate-900/50">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-violet-core/10 border border-violet-core/20 flex items-center justify-center text-violet-glow flex-shrink-0">
                                <FileCheck className="h-5 w-5" />
                              </div>
                              <div>
                                <span className="text-xxs uppercase tracking-wider text-muted-foreground font-bold">Estimated Delivery Duration</span>
                                <h3 className="text-2xl font-bold text-slate-100 mt-0.5">
                                  {clientProject.timeline}
                                </h3>
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* Specific Client Roadmap */}
                        <Card className="glass border-white/10">
                          <CardHeader>
                            <CardTitle>Milestone Progress Tracker: {clientProject.projectName}</CardTitle>
                            <CardDescription>Real-time delivery progress updates for your active items.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {clientProject.roadmap.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                                    step.status === "Completed"
                                      ? "bg-violet-core border-violet-core text-white"
                                      : step.status === "In Progress"
                                      ? "border-cyan-pulse text-cyan-pulse animate-pulse"
                                      : "border-white/10 text-muted-foreground"
                                  }`}>
                                    {idx + 1}
                                  </div>
                                  {idx !== clientProject.roadmap.length - 1 && (
                                    <div className="h-10 w-0.5 bg-white/10" />
                                  )}
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-sm">{step.title}</h4>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                                      step.status === "Completed"
                                        ? "bg-violet-core/10 text-violet-core"
                                        : step.status === "In Progress"
                                        ? "bg-cyan-pulse/10 text-cyan-pulse"
                                        : "bg-white/5 text-muted-foreground"
                                    }`}>
                                      {step.status}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">Target Delivery: {step.date}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                    {projects.length === 0 && !isLoadingProjects && (
                      <div className="text-center p-10 glass border-white/10 rounded-2xl">
                        <p className="text-muted-foreground">No active projects found.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "calculator" && (
              <Card className="glass border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>Project Cost Estimator (INR)</CardTitle>
                      <CardDescription>
                        Configure your desired services to estimate timeline and development costs in Indian Rupees (₹).
                      </CardDescription>
                    </div>
                    {role === "admin" && signedInName.toLowerCase().includes("poojith") && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowEditPricesModal(true)}
                        className="h-8 border-violet-core/30 text-violet-glow hover:bg-violet-core/10 whitespace-nowrap"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Prices
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    {/* TIER SELECTION */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-slate-200">1. Project Development Tier</label>
                      <div className="grid grid-cols-3 gap-2">
                        {tierPrices.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setTier(c.id as any)}
                            type="button"
                            className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                              tier === c.id
                                ? "border-violet-core bg-violet-core/10 text-violet-glow"
                                : "border-white/10 hover:border-white/20 bg-white/5 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="text-xs font-bold block">{c.label}</span>
                            <span className="text-[10px] mt-0.5 block">{c.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SERVICES SELECTION */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold block text-slate-200">2. Select Targeted Services & Modules</label>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {servicePrices.map((item) => {
                          const isSelected = !!services[item.id];
                          return (
                            <label
                              key={item.id}
                              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                isSelected 
                                  ? "border-violet-core bg-violet-core/5" 
                                  : "border-white/5 bg-white/5 hover:bg-white/10"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => setServices(prev => ({ ...prev, [item.id]: e.target.checked }))}
                                className="mt-1 accent-violet-core cursor-pointer"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-100">{item.label}</span>
                                  <span className="text-[10px] font-bold text-violet-glow">{item.price}</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground block leading-tight mt-0.5">{item.desc}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* SUPPORT PLAN SELECTION */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-slate-200">3. Support Retainer Plan (Monthly Add-on)</label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {supportPrices.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSupport(s.id as any)}
                            type="button"
                            className={`rounded-xl border p-2 text-center transition cursor-pointer ${
                              support === s.id
                                ? "border-violet-core bg-violet-core/10 text-violet-glow"
                                : "border-white/10 hover:border-white/20 bg-white/5 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="text-xxs font-bold block">{s.label}</span>
                            <span className="text-[9px] mt-0.5 block">{s.price}/mo</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CALCULATOR OUTCOME */}
                  <div className="glass rounded-3xl p-6 border-white/10 bg-violet-core/5 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-violet-core/5 blur-2xl pointer-events-none" />
                    
                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-glow border-b border-white/5 pb-2">Estimated Investment</h4>
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs text-muted-foreground block">Development Timeline</span>
                          <span className="text-lg font-bold text-slate-100">{time}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block">One-time Development Cost</span>
                          <span className="text-3xl font-bold gradient-text">₹{totalSetup.toLocaleString("en-IN")}</span>
                        </div>
                        {supportMonthly > 0 && (
                          <div>
                            <span className="text-xs text-muted-foreground block">Monthly Retainer Cost</span>
                            <span className="text-lg font-bold text-slate-100">₹{supportMonthly.toLocaleString("en-IN")}/month</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button asChild size="lg" className="w-full mt-8 font-semibold">
                      <Link href="#contact">Schedule Consultation</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "documents" && (
              <div className="space-y-6">
                {role === "public" ? (
                  renderLockedOverlay()
                ) : (
                  <Card className="glass border-white/10">
                    <CardHeader>
                      <CardTitle>Agreements & Onboarding Assets</CardTitle>
                      <CardDescription>
                        {role === "admin" 
                          ? "Download templates and client-specific onboarding files." 
                          : "Download onboarding questionnaires and active project agreements."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {role === "admin" ? (
                        /* Grouped by project folders for Company Founders */
                        <div className="space-y-4">
                          {projects.map((project) => {
                            const key = project.id;
                            const isOpen = !!openFolders[key];
                            const fileCount = project.documents.length;
                            
                            return (
                              <div key={key} className="glass rounded-2xl border-white/5 bg-slate-950/20 overflow-hidden transition-all duration-300">
                                {/* Folder Header button */}
                                <button
                                  onClick={() => setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }))}
                                  type="button"
                                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors border-b border-white/5 text-left cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-violet-core/10 border border-violet-core/20 flex items-center justify-center text-violet-glow">
                                      {isOpen ? (
                                        <FolderOpen className="h-5 w-5" />
                                      ) : (
                                        <Folder className="h-5 w-5" />
                                      )}
                                    </div>
                                    <div>
                                      <span className="font-bold text-sm text-slate-100 block">
                                        {project.projectName}
                                      </span>
                                      <span className="text-[10px] text-muted-foreground">
                                        Client: {project.clientName}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xxs font-medium bg-white/5 border border-white/10 px-2 py-0.5 rounded text-muted-foreground">
                                      {fileCount} {fileCount === 1 ? "file" : "files"}
                                    </span>
                                    <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                                  </div>
                                </button>

                                {/* Folder files list inside */}
                                <AnimatePresence initial={false}>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="p-4 space-y-3 bg-slate-950/40 border-t border-white/5 pl-8 relative">
                                        {/* Vertical guide line */}
                                        <div className="absolute left-6 top-4 bottom-4 w-px bg-white/10" />
                                        
                                        {project.documents.map((doc, idx) => (
                                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors relative">
                                            {/* Connecting node dot */}
                                            <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-violet-core border-2 border-slate-950" />
                                            
                                            <div>
                                              <h4 className="font-bold text-sm flex items-center gap-1.5 text-slate-200">
                                                <FileText className="h-4 w-4 text-violet-glow" />
                                                {doc.name}
                                              </h4>
                                              <p className="text-xs text-muted-foreground mt-1 max-w-lg">{doc.desc}</p>
                                            </div>
                                            <div className="flex items-center gap-4 justify-between sm:justify-end">
                                              <span className="text-xs text-muted-foreground">{doc.type} ({doc.size})</span>
                                              <Button size="sm" variant="outline" className="h-8">
                                                <Download className="h-3.5 w-3.5" />
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Flat specific list for Clients */
                        <div className="space-y-6">
                          {projects.map((clientProject) => (
                            <div key={clientProject.id} className="space-y-3">
                              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                                <span className="text-xs font-bold text-cyan-pulse uppercase tracking-wider">
                                  {clientProject.projectName}
                                </span>
                              </div>
                              
                              {clientProject.documents.map((doc, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                  <div>
                                    <h4 className="font-bold text-sm">{doc.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-lg">{doc.desc}</p>
                                  </div>
                                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                                    <span className="text-xs text-muted-foreground">{doc.type} ({doc.size})</span>
                                    <Button size="sm" variant="outline" className="h-8">
                                      <Download className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "devtools" && role === "admin" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="glass border-emerald-500/20 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-emerald-400 text-lg">System Status</CardTitle>
                      <CardDescription>Server and database health monitoring.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                        <span className="text-sm text-slate-300">Database Connection</span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">Connected</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                        <span className="text-sm text-slate-300">API Latency</span>
                        <span className="text-xs font-bold text-emerald-400">42ms</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                        <span className="text-sm text-slate-300">Server Time</span>
                        <span className="text-xs font-bold text-slate-400">{new Date().toISOString().split('T')[1].slice(0, 8)}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass border-emerald-500/20 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-emerald-400 text-lg">Quick Actions</CardTitle>
                      <CardDescription>Administrative data management tools.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors h-11" onClick={() => alert("Cache cleared successfully!")}>
                        <TrendingUp className="mr-2 h-4 w-4 text-emerald-400" />
                        Clear Application Cache
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors h-11">
                        <a href="http://localhost:5555" target="_blank" rel="noreferrer" className="flex items-center w-full">
                          <Database className="mr-2 h-4 w-4 text-emerald-400" />
                          Open Prisma Studio Portal
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-colors h-11 text-muted-foreground" onClick={() => alert("Cannot re-seed in production mode.")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Re-Seed Database (Danger)
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* DATABASE EXPLORER */}
                <Card className="glass border-emerald-500/20">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Live Database Explorer
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={activeDbTable === "users" ? "default" : "outline"}
                          className={activeDbTable === "users" ? "bg-emerald-600 text-white" : "border-emerald-500/30 text-emerald-400"}
                          onClick={() => setActiveDbTable("users")}
                        >
                          Users
                        </Button>
                        <Button 
                          size="sm" 
                          variant={activeDbTable === "projects" ? "default" : "outline"}
                          className={activeDbTable === "projects" ? "bg-emerald-600 text-white" : "border-emerald-500/30 text-emerald-400"}
                          onClick={() => setActiveDbTable("projects")}
                        >
                          Projects
                        </Button>
                        <Button 
                          size="sm" 
                          variant={activeDbTable === "contactMessages" ? "default" : "outline"}
                          className={activeDbTable === "contactMessages" ? "bg-emerald-600 text-white" : "border-emerald-500/30 text-emerald-400"}
                          onClick={() => setActiveDbTable("contactMessages")}
                        >
                          Contacts
                        </Button>
                        <Button 
                          size="sm" 
                          variant={activeDbTable === "loginLogs" ? "default" : "outline"}
                          className={activeDbTable === "loginLogs" ? "bg-emerald-600 text-white" : "border-emerald-500/30 text-emerald-400"}
                          onClick={() => setActiveDbTable("loginLogs")}
                        >
                          Login Logs
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>Direct, read-only view of database records.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/50 border border-white/5 rounded-xl overflow-x-auto">
                      {!dbData ? (
                        <div className="p-8 text-center text-slate-400 text-sm">Loading database records...</div>
                      ) : (
                        <table className="w-full text-xs text-left text-slate-300">
                          <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase font-bold tracking-wider">
                            {activeDbTable === "users" && (
                              <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Date & Time</th>
                              </tr>
                            )}
                            {activeDbTable === "projects" && (
                              <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Project</th>
                                <th className="px-4 py-3">Progress</th>
                              </tr>
                            )}
                            {activeDbTable === "contactMessages" && (
                              <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Message</th>
                              </tr>
                            )}
                            {activeDbTable === "loginLogs" && (
                              <tr>
                                <th className="px-4 py-3">Date & Time</th>
                                <th className="px-4 py-3">User</th>
                              </tr>
                            )}
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {activeDbTable === "users" && dbData.users.map(u => (
                              <tr key={u.id} className="hover:bg-white/5">
                                <td className="px-4 py-3 font-mono">{u.id}</td>
                                <td className="px-4 py-3">{u.name} {u.clientAlias && `(${u.clientAlias})`}</td>
                                <td className="px-4 py-3">{u.role}</td>
                                <td className="px-4 py-3">{new Date(u.createdAt).toLocaleString()}</td>
                              </tr>
                            ))}
                            {activeDbTable === "projects" && dbData.projects.map(p => (
                              <tr key={p.id} className="hover:bg-white/5">
                                <td className="px-4 py-3 font-mono">{p.id}</td>
                                <td className="px-4 py-3">{p.clientName}</td>
                                <td className="px-4 py-3">{p.projectName}</td>
                                <td className="px-4 py-3">{p.progress}%</td>
                              </tr>
                            ))}
                            {activeDbTable === "contactMessages" && dbData.contactMessages.map(c => (
                              <tr key={c.id} className="hover:bg-white/5">
                                <td className="px-4 py-3">{c.name}</td>
                                <td className="px-4 py-3 text-emerald-400">{c.email}</td>
                                <td className="px-4 py-3">{c.company || "-"}</td>
                                <td className="px-4 py-3 truncate max-w-[200px]" title={c.message}>{c.message}</td>
                              </tr>
                            ))}
                            {activeDbTable === "loginLogs" && dbData.loginLogs.map(l => (
                              <tr key={l.id} className="hover:bg-white/5">
                                <td className="px-4 py-3 font-mono">{new Date(l.loginAt).toLocaleString()}</td>
                                <td className="px-4 py-3 text-emerald-400 font-bold">{l.userName || "Unknown"}</td>
                              </tr>
                            ))}
                            {dbData[activeDbTable].length === 0 && (
                              <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">No records found.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass border-emerald-500/20">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      Recent System Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/50 border border-white/5 rounded-xl p-4 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
                      <div className="text-slate-400">[INFO] Database connection initialized...</div>
                      <div className="text-slate-400">[INFO] Prisma Client v5.22.0 loaded.</div>
                      <div className="text-emerald-400">[SUCCESS] Admin poojith authenticated from 127.0.0.1.</div>
                      <div className="text-slate-400">[INFO] Fetching active projects for user poojith...</div>
                      <div className="text-emerald-400">[SUCCESS] Projects loaded successfully.</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* PROJECTS TAB (Admin Only) */}
            {activeTab === "projects" && role === "admin" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-violet-glow" />
                      Active Projects Pipeline
                    </h3>
                  </div>
                  <Button 
                    className="bg-violet-core hover:bg-violet-600 text-white font-bold tracking-wide transition-colors"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Upload New Project
                  </Button>
                </div>

                <div className="grid gap-4">
                  {projects.length === 0 ? (
                    <div className="p-8 text-center border border-white/5 rounded-xl bg-slate-900/50 text-slate-400">
                      No active projects found. Upload a new project to get started.
                    </div>
                  ) : (
                    projects.map(p => (
                      <Card key={p.id} className="glass border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-colors">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <span className="text-slate-100">{p.projectName}</span>
                              <span className="text-xs text-muted-foreground block mt-1">Client: {p.clientName} | Budget: {p.budget} | Timeline: {p.timeline}</span>
                            </div>
                            <Button 
                              variant="outline" 
                              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                              onClick={() => {
                                setProjectToUpdate(p);
                                setUpdateProgress(p.progress || 0);
                                setUpdateRoadmap(p.roadmap ? [...p.roadmap] : []);
                                setShowStatusModal(true);
                              }}
                            >
                              Upload Project Status
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                              <div className="h-full bg-violet-core rounded-full" style={{ width: `${p.progress || 0}%` }} />
                            </div>
                            <span className="text-xs font-bold text-violet-glow w-8">{p.progress || 0}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ACCESS MANAGEMENT TAB (Admin Only) */}
            {activeTab === "access" && role === "admin" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Access Management</h2>
                    <p className="text-slate-400 mt-1">Manage user passcodes and access roles.</p>
                  </div>
                  <Button onClick={() => setShowCreateUserModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <Plus className="mr-2 h-4 w-4" /> Create Access
                  </Button>
                </div>

                <Card className="bg-[#0f172a] border-slate-800 shadow-2xl">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs uppercase bg-[#1e293b] text-slate-400">
                          <tr>
                            <th className="px-4 py-3">User Name</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Passcode</th>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {!dbData ? (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>
                          ) : dbData.users.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                No users found.
                              </td>
                            </tr>
                          ) : (
                            dbData.users.map((user: any) => (
                              <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-medium text-white">{user.name}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300">
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-4 py-3 font-mono text-emerald-400">
                                  {user.passcode}
                                </td>
                                <td className="px-4 py-3 text-slate-500">{new Date(user.createdAt).toLocaleString()}</td>
                                <td className="px-4 py-3 text-right">
                                  {user.role !== "admin" && (
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 px-2">
                                      Delete
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AUTH LOGIN DIALOG MODAL OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass max-w-sm w-full rounded-3xl p-6 border-white/10 bg-slate-900/90 shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError("");
                }}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-12 w-12 rounded-2xl bg-violet-core/10 flex items-center justify-center border border-violet-core/20 mb-3 text-violet-glow">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Sign In to Workspace</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
                  Provide your client or founder passcode to unlock private metrics.
                </p>
              </div>

              {loginError && (
                <div className="mb-4 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2.5 text-center text-xs text-rose-400">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Secure Passcode</label>
                  <Input 
                    type="password" 
                    placeholder="Enter your secure passcode..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="h-10"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full h-10 font-semibold text-xs">
                  Unlock Workspace
                </Button>
              </form>



            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* UPLOAD PROJECT MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl glass"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-core/10 text-violet-glow border border-violet-core/20">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Upload New Project</h2>
                <p className="mt-1 text-sm text-slate-400">Initialize a new project workflow for a client.</p>
              </div>

              <form onSubmit={handleUploadProject} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Client</label>
                  <select
                    required
                    value={selectedClientForUpload}
                    onChange={(e) => setSelectedClientForUpload(e.target.value)}
                    className="w-full h-10 rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white focus:border-violet-core focus:outline-none focus:ring-1 focus:ring-violet-core transition-colors"
                  >
                    <option value="" disabled>Select a client...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.clientAlias || c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Project Name</label>
                  <Input
                    required
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g. AI Customer Agent"
                    className="h-10 border-white/10 bg-black/20 focus-visible:ring-violet-core text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Budget (₹)</label>
                    <Input
                      type="text"
                      value={newProjectBudget}
                      onChange={(e) => setNewProjectBudget(e.target.value)}
                      placeholder="e.g. ₹5,00,000"
                      className="h-10 border-white/10 bg-black/20 focus-visible:ring-violet-core text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Timeline</label>
                    <Input
                      type="text"
                      value={newProjectTimeline}
                      onChange={(e) => setNewProjectTimeline(e.target.value)}
                      placeholder="e.g. 6-8 weeks"
                      className="h-10 border-white/10 bg-black/20 focus-visible:ring-violet-core text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isUploading || !selectedClientForUpload || !newProjectName}
                    className="w-full bg-violet-core hover:bg-violet-600 text-white font-bold tracking-wide"
                  >
                    {isUploading ? "Initializing Project..." : "Upload Project"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPDATE STATUS MODAL */}
      <AnimatePresence>
        {showStatusModal && projectToUpdate && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStatusModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl glass"
            >
              <button
                onClick={() => setShowStatusModal(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-100 mb-1">Update Project Status</h2>
                <p className="text-xs text-slate-400">{projectToUpdate.projectName} - {projectToUpdate.clientName}</p>
              </div>

              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex justify-between">
                    <span>Overall Progress</span>
                    <span className="text-violet-glow">{updateProgress}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={updateProgress}
                    onChange={(e) => setUpdateProgress(parseInt(e.target.value))}
                    className="w-full accent-violet-core"
                  />
                </div>

                <div className="space-y-2 mt-4 max-h-48 overflow-y-auto pr-2">
                  <label className="text-xs font-semibold text-slate-300">Milestone Tracker</label>
                  {updateRoadmap.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-black/20 p-2.5 rounded-lg border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">{step.title}</span>
                      </div>
                      <select 
                        value={step.status} 
                        onChange={(e) => {
                          const newRoadmap = [...updateRoadmap];
                          newRoadmap[idx].status = e.target.value as any;
                          setUpdateRoadmap(newRoadmap);
                        }}
                        className="text-[10px] bg-slate-900 border border-white/10 rounded px-2 py-1 text-slate-300 outline-none"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isUpdatingStatus}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide border-none"
                  >
                    {isUpdatingStatus ? "Saving..." : "Save Status"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE ACCESS MODAL */}
      <AnimatePresence>
        {showCreateUserModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateUserModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl glass"
            >
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Key className="h-5 w-5 text-emerald-400" /> Create Access
                </h3>
                <p className="text-sm text-slate-400 mt-1">Generate a new login passcode for a user.</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <Input 
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="h-10 border-white/10 bg-black/20 focus-visible:ring-emerald-500 text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Role</label>
                  <select
                    required
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full h-10 rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Passcode</label>
                  <div className="flex gap-2">
                    <Input 
                      required
                      value={newUserPasscode}
                      onChange={(e) => setNewUserPasscode(e.target.value)}
                      placeholder="Secret passcode"
                      className="h-10 border-white/10 bg-black/20 focus-visible:ring-emerald-500 text-white font-mono"
                    />
                    <Button type="button" onClick={generatePasscode} variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-10">
                      Auto-Gen
                    </Button>
                  </div>
                </div>
                <div className="pt-2">
                  <Button type="submit" disabled={isCreatingUser} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide border-none">
                    {isCreatingUser ? "Creating..." : "Create User Access"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showEditPricesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowEditPricesModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-violet-glow" />
                  Edit Estimator Pricing
                </h3>
                <p className="text-sm text-slate-400 mt-1">Update the prices of tiers, services, and support plans.</p>
              </div>

              <div className="space-y-6">
                {/* Tiers */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-300 border-b border-white/10 pb-1">Base Tiers</h4>
                  {tierPrices.map((tp, idx) => (
                    <div key={tp.id} className="grid grid-cols-12 gap-3 items-end p-2 rounded-lg border border-white/5 bg-black/20">
                      <div className="col-span-12 sm:col-span-5 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Label</label>
                        <Input value={tp.label} onChange={(e) => { const newP = [...tierPrices]; newP[idx].label = e.target.value; setTierPrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                      <div className="col-span-6 sm:col-span-4 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Display Price</label>
                        <Input value={tp.price} onChange={(e) => { const newP = [...tierPrices]; newP[idx].price = e.target.value; setTierPrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                      <div className="col-span-6 sm:col-span-3 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Numeric Value</label>
                        <Input type="number" value={tp.value} onChange={(e) => { const newP = [...tierPrices]; newP[idx].value = parseInt(e.target.value) || 0; setTierPrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Services */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-300 border-b border-white/10 pb-1">Services & Modules</h4>
                  {servicePrices.map((sp, idx) => (
                    <div key={sp.id} className="grid grid-cols-12 gap-3 items-end p-2 rounded-lg border border-white/5 bg-black/20">
                      <div className="col-span-12 sm:col-span-5 space-y-1">
                        <Input value={sp.label} onChange={(e) => { const newP = [...servicePrices]; newP[idx].label = e.target.value; setServicePrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                      <div className="col-span-6 sm:col-span-4 space-y-1">
                        <Input value={sp.price} onChange={(e) => { const newP = [...servicePrices]; newP[idx].price = e.target.value; setServicePrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                      <div className="col-span-6 sm:col-span-3 space-y-1">
                        <Input type="number" value={sp.value} onChange={(e) => { const newP = [...servicePrices]; newP[idx].value = parseInt(e.target.value) || 0; setServicePrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Support */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-300 border-b border-white/10 pb-1">Support Retainer</h4>
                  {supportPrices.map((sp, idx) => (
                    <div key={sp.id} className="grid grid-cols-12 gap-3 items-end p-2 rounded-lg border border-white/5 bg-black/20">
                      <div className="col-span-12 sm:col-span-5 space-y-1">
                        <Input value={sp.label} onChange={(e) => { const newP = [...supportPrices]; newP[idx].label = e.target.value; setSupportPrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                      <div className="col-span-6 sm:col-span-4 space-y-1">
                        <Input value={sp.price} onChange={(e) => { const newP = [...supportPrices]; newP[idx].price = e.target.value; setSupportPrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                      <div className="col-span-6 sm:col-span-3 space-y-1">
                        <Input type="number" value={sp.value} onChange={(e) => { const newP = [...supportPrices]; newP[idx].value = parseInt(e.target.value) || 0; setSupportPrices(newP); }} className="h-8 text-xs border-white/10 bg-black/40 text-white" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowEditPricesModal(false)}
                    className="flex-1 border-white/10 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button"
                    disabled={isSavingPrices}
                    onClick={async () => {
                      setIsSavingPrices(true);
                      try {
                        const res = await fetch("/api/config", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ tiers: tierPrices, services: servicePrices, support: supportPrices })
                        });
                        const data = await res.json();
                        if (res.ok && data.success) {
                          setShowEditPricesModal(false);
                        } else {
                          alert(data.error || "Failed to save prices");
                        }
                      } catch (err) {
                        alert("Error saving prices");
                      } finally {
                        setIsSavingPrices(false);
                      }
                    }}
                    className="flex-1 bg-violet-core hover:bg-violet-glow text-white font-bold border-none"
                  >
                    {isSavingPrices ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
