"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  Grid2X2,
  Home,
  LayoutGrid,
  List,
  Menu,
  Search,
  X,
} from "lucide-react";
import type { Application } from "@/lib/applications";
import { applicationCategories, applications } from "@/lib/applications";

type ViewMode = "grid" | "list";
type NavigationItem = "Home" | "Aplikasi" | "Dokumentasi" | "Bantuan";

const navigationItems: { label: NavigationItem; icon: typeof Home }[] = [
  { label: "Home", icon: Home },
  { label: "Aplikasi", icon: LayoutGrid },
  { label: "Dokumentasi", icon: BookOpen },
  { label: "Bantuan", icon: CircleHelp },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-name">{compact ? "HPIO Web Portal" : "HPIO"}</span>
    </div>
  );
}

function Sidebar({
  activeItem,
  onNavigate,
  open,
  onClose,
}: {
  activeItem: NavigationItem;
  onNavigate: (item: NavigationItem) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && <button className="sidebar-backdrop" onClick={onClose} aria-label="Tutup menu" />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Brand />
          <button className="mobile-close" onClick={onClose} aria-label="Tutup menu">
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-label">MENU UTAMA</div>
        <nav className="side-nav" aria-label="Navigasi utama">
          {navigationItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activeItem === label ? "nav-item-active" : ""}`}
              onClick={() => {
                onNavigate(label);
                onClose();
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Aplikasi" && <span className="nav-count">{applications.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="sidebar-help"
            type="button"
            onClick={() => {
              onNavigate("Bantuan");
              onClose();
            }}
          >
            <div className="help-icon"><CircleHelp size={17} /></div>
            <div>
              <strong>Butuh bantuan?</strong>
              <span>Hubungi IT Support</span>
            </div>
            <ExternalLink size={14} className="help-external" />
          </button>
          <div className="sidebar-version">IT Operations Portal <span>v1.0</span></div>
        </div>
      </aside>
    </>
  );
}

function Header({
  onMenu,
  activeDropdown,
  setActiveDropdown,
}: {
  onMenu: () => void;
  activeDropdown: "profile" | "notifications" | null;
  setActiveDropdown: (value: "profile" | "notifications" | null) => void;
}) {
  const [notice, setNotice] = useState("");

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu} aria-label="Buka menu">
          <Menu size={21} />
        </button>
        <div className="breadcrumb"><span>Portal</span><span className="breadcrumb-divider">/</span><strong>Home</strong></div>
      </div>
      <div className="topbar-actions">
        <div className="action-wrap">
          <button
            className={`icon-button notification-button ${activeDropdown === "notifications" ? "icon-button-active" : ""}`}
            aria-label="Notifikasi"
            aria-expanded={activeDropdown === "notifications"}
            onClick={() => setActiveDropdown(activeDropdown === "notifications" ? null : "notifications")}
          >
            <Bell size={19} strokeWidth={1.8} />
            <span className="notification-dot" />
          </button>
          {activeDropdown === "notifications" && (
            <div className="popover notification-popover">
              <div className="popover-heading"><strong>Notifikasi</strong><span>Terbaru</span></div>
              <div className="notification-empty">
                <span className="notification-empty-icon"><Bell size={19} /></span>
                <strong>Semua sudah diperbarui</strong>
                <span>Belum ada notifikasi baru.</span>
              </div>
            </div>
          )}
        </div>
        <span className="topbar-separator" />
        <div className="action-wrap">
          <button
            className={`profile-button ${activeDropdown === "profile" ? "profile-button-active" : ""}`}
            aria-expanded={activeDropdown === "profile"}
            onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")}
          >
            <span className="avatar">MT</span>
            <span className="profile-copy"><strong>Michael Tan</strong><span>IT Operations</span></span>
            <ChevronDown size={16} className="profile-chevron" />
          </button>
          {activeDropdown === "profile" && (
            <div className="popover profile-popover">
              <div className="profile-popover-user">
                <span className="avatar avatar-large">MT</span>
                <div><strong>Michael Tan</strong><span>IT Operations</span></div>
              </div>
              <button onClick={() => setNotice("Pengaturan profil akan segera tersedia.")}>Pengaturan profil</button>
              <button onClick={() => setNotice("Silakan hubungi IT Support untuk bantuan akun.")}>Bantuan akun</button>
              {notice && <span className="profile-notice" role="status">{notice}</span>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function HeroSection({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> PORTAL TERPADU HPIO</div>
        <h1>HPIO <span>Web Portal</span></h1>
        <p>Akses cepat ke seluruh aplikasi dan layanan IT HPIO</p>
        <label className="search-box">
          <Search size={19} strokeWidth={2} />
          <input
            aria-label="Cari aplikasi"
            placeholder="Cari aplikasi..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {query && (
            <button type="button" className="clear-search" onClick={() => onQueryChange("")} aria-label="Hapus pencarian">
              <X size={16} />
            </button>
          )}
        </label>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-city city-one"><i /><i /><i /><i /></div>
        <div className="hero-city city-two"><i /><i /><i /></div>
        <div className="hero-track track-back" />
        <div className="hero-track track-front" />
        <div className="hero-train">
          <div className="train-window train-window-one" />
          <div className="train-window train-window-two" />
          <div className="train-window train-window-three" />
          <div className="train-window train-window-four" />
          <div className="train-red-line" />
          <div className="train-nose-window" />
          <div className="train-wheel wheel-one" />
          <div className="train-wheel wheel-two" />
          <div className="train-wheel wheel-three" />
        </div>
        <div className="hero-spark spark-one" />
        <div className="hero-spark spark-two" />
        <div className="hero-spark spark-three" />
      </div>
      <div className="hero-bottom-line" />
    </section>
  );
}

function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: (typeof applicationCategories)[number];
  onSelect: (category: (typeof applicationCategories)[number]) => void;
}) {
  return (
    <div className="category-list" role="group" aria-label="Filter kategori aplikasi">
      {applicationCategories.map((category) => (
        <button
          key={category}
          className={`category-pill ${selected === category ? "category-pill-active" : ""}`}
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function ApplicationCard({ application, list = false }: { application: Application; list?: boolean }) {
  const Icon = application.icon;
  const url = application.url;
  const available = url !== null;
  const cardContent = (
    <>
      <span className="app-icon" style={{ "--app-accent": application.accent } as React.CSSProperties}>
        <Icon size={21} strokeWidth={1.8} />
      </span>
      <span className="app-copy">
        <span className="app-title">{application.name}</span>
        <span className="app-description">{application.description}</span>
      </span>
      <span className={`app-status ${available ? "app-status-ready" : ""}`}>
        <span className="status-dot" />{available ? "Tersedia" : "Coming Soon"}
      </span>
      <span className="app-arrow" aria-hidden="true">
        {available ? <ExternalLink size={17} /> : <span className="arrow-soon">↗</span>}
      </span>
      <span className="card-accent" style={{ "--app-accent": application.accent } as React.CSSProperties} />
    </>
  );

  if (!available) {
    return (
      <div
        className={`application-card ${list ? "application-card-list" : ""} application-card-disabled`}
        aria-label={`${application.name}, Coming Soon`}
        aria-disabled="true"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <a
      className={`application-card ${list ? "application-card-list" : ""}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Buka ${application.name} di tab baru`}
    >
      {cardContent}
    </a>
  );
}

function ApplicationSection({
  query,
  category,
  onCategoryChange,
  view,
  onViewChange,
}: {
  query: string;
  category: (typeof applicationCategories)[number];
  onCategoryChange: (category: (typeof applicationCategories)[number]) => void;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}) {
  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id");
    return applications.filter((application) => {
      const matchesCategory = category === "Semua" || application.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${application.name} ${application.description} ${application.category}`
          .toLocaleLowerCase("id")
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section className="applications-section" id="applications">
      <div className="section-heading">
        <div>
          <div className="section-overline">TEMUKAN YANG ANDA BUTUHKAN</div>
          <h2>Daftar Aplikasi <span className="result-count">{filteredApplications.length}</span></h2>
        </div>
        <div className="view-toggle" role="group" aria-label="Tampilan aplikasi">
          <button
            className={view === "grid" ? "view-button view-button-active" : "view-button"}
            onClick={() => onViewChange("grid")}
            aria-label="Tampilan grid"
            aria-pressed={view === "grid"}
          ><Grid2X2 size={17} /></button>
          <button
            className={view === "list" ? "view-button view-button-active" : "view-button"}
            onClick={() => onViewChange("list")}
            aria-label="Tampilan list"
            aria-pressed={view === "list"}
          ><List size={19} /></button>
        </div>
      </div>
      <div className="filter-row">
        <CategoryFilter selected={category} onSelect={onCategoryChange} />
        <span className="apps-note"><span className="note-dot" /> {applications.length} aplikasi terdaftar</span>
      </div>
      {filteredApplications.length > 0 ? (
        <div className={`application-grid ${view === "list" ? "application-list" : ""}`}>
          {filteredApplications.map((application) => (
            <ApplicationCard key={application.name} application={application} list={view === "list"} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><Search size={23} /></span>
          <strong>Aplikasi tidak ditemukan</strong>
          <span>Coba kata kunci lain atau ubah filter kategori Anda.</span>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Image className="footer-logo" src="/img/logo-hpio.jpeg" alt="HPIO" width={96} height={35} />
        <span className="footer-brand-label">Web Portal</span>
      </div>
      <div className="footer-center">IT Operations Portal <span /> HPIO</div>
      <div className="service-status"><span className="service-dot" /> Layanan Online</div>
    </footer>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof applicationCategories)[number]>("Semua");
  const [view, setView] = useState<ViewMode>("grid");
  const [activeItem, setActiveItem] = useState<NavigationItem>("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"profile" | "notifications" | null>(null);

  return (
    <main className="portal-shell" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <Sidebar
        activeItem={activeItem}
        onNavigate={(item) => {
          setActiveItem(item);
          if (item === "Aplikasi") document.getElementById("applications")?.scrollIntoView({ behavior: "smooth" });
          if (item === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
          if (item === "Dokumentasi") {
            setCategory("Manajemen");
            document.getElementById("applications")?.scrollIntoView({ behavior: "smooth" });
          }
          if (item === "Bantuan") {
            setCategory("IT & Support");
            document.getElementById("applications")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        className="main-panel"
        onClick={(event) => {
          if (!(event.target instanceof Element) || !event.target.closest(".action-wrap")) {
            setActiveDropdown(null);
          }
        }}
      >
        <Header
          onMenu={() => setSidebarOpen(true)}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <div className="page-content">
          <HeroSection query={query} onQueryChange={setQuery} />
          <ApplicationSection
            query={query}
            category={category}
            onCategoryChange={setCategory}
            view={view}
            onViewChange={setView}
          />
          <Footer />
        </div>
      </div>
    </main>
  );
}
