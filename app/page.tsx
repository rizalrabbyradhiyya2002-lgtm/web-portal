"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Grid2X2,
  Info,
  Layers,
  List,
  Search,
  X,
} from "lucide-react";
import { ApplicationCard } from "@/components/ApplicationCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { DocumentationModal } from "@/components/DocumentationModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { MrtgModal } from "@/components/MrtgModal";
import { RosterCnjoModal } from "@/components/RosterCnjoModal";
import { NavItem, Sidebar } from "@/components/Sidebar";
import { SupportModal } from "@/components/SupportModal";
import type { CategoryFilterType } from "@/lib/applications";
import { applications } from "@/lib/applications";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const appKeyMap: Record<string, keyof typeof translations.id.apps> = {
  inspection: "inspection",
  "roster-rangers": "rosterRangers",
  "roster-cnjo": "rosterCnjo",
  "asset-management": "assetManagement",
  mrtg: "mrtg",
  dokumentasi: "dokumentasi",
};

export default function HomePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterType>("Semua");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeNavItem, setActiveNavItem] = useState<NavItem>("Beranda");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals state
  const [mrtgModalOpen, setMrtgModalOpen] = useState(false);
  const [rosterCnjoModalOpen, setRosterCnjoModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [documentationModalOpen, setDocumentationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync saved viewMode on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hpio_view_mode");
      if (saved === "grid" || saved === "list") {
        requestAnimationFrame(() => {
          setViewMode((prev) => (prev !== saved ? (saved as "grid" | "list") : prev));
        });
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    try {
      localStorage.setItem("hpio_view_mode", mode);
    } catch {
      // Ignore
    }
  };

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Dynamic category counts derived from applications
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilterType, number> = {
      Semua: applications.length,
      Operasional: 0,
      "IT & Support": 0,
      Monitoring: 0,
      Manajemen: 0,
    };
    for (const app of applications) {
      if (counts[app.category] !== undefined) {
        counts[app.category] += 1;
      }
    }
    return counts;
  }, []);

  // Filtered applications based on category and search query (supporting both ID & EN queries)
  const filteredApplications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return applications.filter((app) => {
      const matchesCategory =
        selectedCategory === "Semua" || app.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      const appKey = appKeyMap[app.id];
      const transEn = appKey ? translations.en.apps[appKey] : null;
      const transId = appKey ? translations.id.apps[appKey] : null;

      const nameMatch =
        app.name.toLowerCase().includes(q) ||
        (transEn && transEn.name.toLowerCase().includes(q)) ||
        (transId && transId.name.toLowerCase().includes(q));

      const descMatch =
        app.description.toLowerCase().includes(q) ||
        (transEn && transEn.description.toLowerCase().includes(q)) ||
        (transId && transId.description.toLowerCase().includes(q));

      const catMatch = app.category.toLowerCase().includes(q);

      const childrenMatch = app.children?.some(
        (child) =>
          child.name.toLowerCase().includes(q) ||
          child.description.toLowerCase().includes(q)
      );

      return nameMatch || descMatch || catMatch || Boolean(childrenMatch);
    });
  }, [searchQuery, selectedCategory]);

  const mrtgApp = useMemo(
    () => applications.find((app) => app.id === "mrtg"),
    []
  );

  const handleComingSoon = (appName: string) => {
    if (
      appName.toLowerCase().includes("dokumentasi") ||
      appName.toLowerCase().includes("documentation")
    ) {
      setDocumentationModalOpen(true);
    } else {
      setToastMessage(t("toastComingSoon").replace("{name}", appName));
    }
  };

  const handleNavigation = (item: NavItem) => {
    setActiveNavItem(item);
    if (item === "Beranda") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item === "Aplikasi") {
      document
        .getElementById("daftar-aplikasi")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (item === "Dokumentasi") {
      setDocumentationModalOpen(true);
    } else if (item === "Bantuan") {
      setSupportModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102448] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={handleNavigation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        totalAppsCount={applications.length}
        onOpenSupport={() => setSupportModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 lg:pl-[240px] transition-all duration-300">
        {/* Top Header */}
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenSupport={() => setSupportModalOpen(true)}
        />

        {/* Content Body */}
        <main className="flex-1 px-5 sm:px-7 md:px-9 py-6 flex flex-col gap-6 w-full">
          {/* 1. Hero Banner */}
          <HeroBanner bannerImage="/img/datacenter-banner.jpg" />

          {/* 2. Compact Information Strip */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white border border-[#E2E8F0] px-5 py-3 shadow-2xs">
            {/* Total Main Applications dynamic counter */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0">
                <Layers size={14} />
              </div>
              <span className="text-[#64748B]">{t("totalSystemLabel")}</span>
              <span className="font-bold text-[#102448]">
                {applications.length} {t("totalSystemSuffix")}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
              <span>{t("portalNotice")}</span>
            </div>
          </section>

          {/* 3. Search Bar & Category Filters Toolbar */}
          <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 rounded-2xl bg-white border border-[#E2E8F0] p-4 shadow-2xs">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg w-full">
              <div className="relative flex items-center rounded-xl bg-slate-50 border border-[#E2E8F0] px-3.5 py-2 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all">
                <Search size={16} className="text-slate-400 shrink-0 mr-2.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#102448] placeholder:text-[#64748B] focus:outline-none"
                  aria-label={t("searchPlaceholder")}
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors mr-1"
                    aria-label={t("clearSearch")}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters & View Mode Toggle */}
            <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 w-full xl:w-auto">
              {/* Category Pills */}
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />

              {/* View Switcher Toggle (Grid & List) */}
              <div
                className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-[#E2E8F0] shrink-0"
                role="group"
                aria-label="Mode tampilan"
              >
                <button
                  type="button"
                  onClick={() => handleViewModeChange("grid")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === "grid"
                      ? "bg-[#0B1F3A] text-white shadow-xs"
                      : "text-[#64748B] hover:text-[#102448]"
                  }`}
                  aria-pressed={viewMode === "grid"}
                  aria-label={t("viewGrid")}
                >
                  <Grid2X2 size={14} />
                  <span className="hidden sm:inline">{t("viewGrid")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleViewModeChange("list")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === "list"
                      ? "bg-[#0B1F3A] text-white shadow-xs"
                      : "text-[#64748B] hover:text-[#102448]"
                  }`}
                  aria-pressed={viewMode === "list"}
                  aria-label={t("viewList")}
                >
                  <List size={14} />
                  <span className="hidden sm:inline">{t("viewList")}</span>
                </button>
              </div>
            </div>
          </section>

          {/* 4. Application Directory Section */}
          <section id="daftar-aplikasi" className="flex flex-col gap-4 scroll-mt-20">
            {/* Section Heading & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#102448] tracking-tight">
                  {t("appDirectoryTitle")}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  {t("appDirectorySubtitle")}
                </p>
              </div>

              <span className="text-xs font-bold text-[#64748B]">
                {filteredApplications.length}{" "}
                {t("appsDisplayed").replace("{total}", String(applications.length))}
              </span>
            </div>

            {/* Active search query indicator */}
            {searchQuery && (
              <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2 text-xs text-[#102448] border border-blue-100">
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-[#2563EB]" />
                  <span>
                    {t("searchResults")} &ldquo;<strong>{searchQuery}</strong>&rdquo; (
                    {filteredApplications.length} {t("appsFound")})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>{t("clearFilter")}</span>
                  <X size={12} />
                </button>
              </div>
            )}

            {/* 3-Column Application Cards Grid on Desktop */}
            {filteredApplications.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "flex flex-col gap-3"
                }
              >
                {filteredApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    viewMode={viewMode}
                    onOpenMrtg={() => setMrtgModalOpen(true)}
                    onOpenRosterCnjo={() => setRosterCnjoModalOpen(true)}
                    onComingSoon={handleComingSoon}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-2xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3">
                  <Search size={24} />
                </div>
                <h3 className="text-base font-bold text-[#102448]">
                  {t("noAppsFound")}
                </h3>
                <p className="mt-1 text-xs text-[#64748B] max-w-sm">
                  {t("noAppsDesc")} &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Semua");
                  }}
                  className="mt-4 rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#153765] transition-colors"
                >
                  {t("resetFilters")}
                </button>
              </div>
            )}
          </section>

          {/* 5. Corporate Footer */}
          <Footer />
        </main>
      </div>

      {/* MRTG Submenu Dialog Modal */}
      {mrtgApp?.children && (
        <MrtgModal
          isOpen={mrtgModalOpen}
          onClose={() => setMrtgModalOpen(false)}
          submenus={mrtgApp.children}
        />
      )}

      {/* IT Support Contact Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      {/* Documentation Info Modal */}
      <DocumentationModal
        isOpen={documentationModalOpen}
        onClose={() => setDocumentationModalOpen(false)}
      />

      {/* Roster CNJO Viewer Modal (reads from /jadwalcnjo) */}
      <RosterCnjoModal
        isOpen={rosterCnjoModalOpen}
        onClose={() => setRosterCnjoModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#07172D] px-4 py-3 text-xs font-semibold text-white shadow-2xl border border-white/10 animate-fade-in max-w-sm"
        >
          <Info size={16} className="text-sky-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
            aria-label={t("close")}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
