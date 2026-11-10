"use client";

import Image from "next/image";
import {
  BookOpen,
  CircleHelp,
  Headset,
  House,
  LayoutGrid,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type NavItem = "Beranda" | "Aplikasi" | "Dokumentasi" | "Bantuan";

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  open: boolean;
  onClose: () => void;
  totalAppsCount: number;
  onOpenSupport: () => void;
}

export function Sidebar({
  activeItem,
  onNavigate,
  open,
  onClose,
  totalAppsCount,
  onOpenSupport,
}: SidebarProps) {
  const { t } = useLanguage();

  const navItems: { id: NavItem; label: string; icon: typeof House }[] = [
    { id: "Beranda", label: t("navHome"), icon: House },
    { id: "Aplikasi", label: t("navApplications"), icon: LayoutGrid },
    { id: "Dokumentasi", label: t("navDocumentation"), icon: BookOpen },
    { id: "Bantuan", label: t("navHelp"), icon: CircleHelp },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#07172D]/75 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Desktop width ~240px) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-[240px] flex-col justify-between bg-gradient-to-b from-[#07172D] via-[#0B1F3A] to-[#07172D] text-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigasi Utama"
      >
        {/* Top Header Branding */}
        <div className="flex flex-col p-5">
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            {/* Original HPIO Logo in clean container */}
            <div className="bg-white rounded-xl px-3 py-1.5 shadow-xs flex items-center justify-center">
              <Image
                src="/img/logo-hpio-tight.png"
                alt="Logo HPIO - IT Data Center Operation Network"
                width={130}
                height={34}
                className="w-auto h-7 object-contain"
                priority
              />
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Tutup menu sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Section Overline */}
          <div className="mt-6 mb-2 px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            {t("menuOverview")}
          </div>

          {/* Navigation Items (Corporate Red active indicator) */}
          <nav className="flex flex-col gap-1.5" aria-label="Menu navigasi">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeItem === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onNavigate(id);
                    onClose();
                  }}
                  className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#153765] text-white shadow-xs border-l-[3px] border-[#D71935]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={
                        isActive
                          ? "text-[#D71935]"
                          : "text-slate-400 group-hover:text-white transition-colors"
                      }
                      strokeWidth={isActive ? 2.3 : 1.9}
                    />
                    <span>{label}</span>
                  </div>

                  {id === "Aplikasi" && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {totalAppsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: IT Support Card & Version */}
        <div className="p-4 mt-auto flex flex-col gap-3">
          {/* Support Shortcut Card */}
          <button
            type="button"
            onClick={onOpenSupport}
            className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-left border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs text-white group"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D71935]/20 text-[#D71935] group-hover:bg-[#D71935] group-hover:text-white transition-colors">
                <Headset size={16} />
              </div>
              <div>
                <p className="font-bold leading-tight">{t("supportTitle")}</p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {t("supportSubtitle")}
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all text-sm">
              ›
            </span>
          </button>

          {/* Version Indicator */}
          <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
            <span>{t("portalVersion")}</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
