"use client";

import { useEffect, useRef } from "react";
import { Activity, ExternalLink, X } from "lucide-react";
import type { SubmenuItem } from "@/lib/applications";
import { useLanguage } from "@/context/LanguageContext";

interface MrtgModalProps {
  isOpen: boolean;
  onClose: () => void;
  submenus: SubmenuItem[];
}

export function MrtgModal({ isOpen, onClose, submenus }: MrtgModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSubmenuDesc = (id: string, fallback: string) => {
    switch (id) {
      case "mrtg-telkom":
        return t("mrtgTelkomDesc");
      case "mrtg-icon":
        return t("mrtgIconDesc");
      case "icon-customer":
        return t("mrtgCustomerDesc");
      default:
        return fallback;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mrtg-modal-title"
      aria-describedby="mrtg-modal-description"
    >
      {/* Backdrop */}
      <div
        className="animate-modal-backdrop fixed inset-0 bg-[#0B1B35]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="animate-modal-content relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5 sm:p-6 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shadow-xs shrink-0">
              <Activity size={22} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-600">
                  {t("mrtgBadge")}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                  {t("mrtgDestinations")}
                </span>
              </div>
              <h2
                id="mrtg-modal-title"
                className="text-lg sm:text-xl font-bold text-[#0F1E36] mt-0.5"
              >
                {t("mrtgTitle")}
              </h2>
              <p
                id="mrtg-modal-description"
                className="text-xs text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none"
              >
                {t("mrtgDesc")}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
            aria-label={t("close")}
          >
            <X size={18} />
          </button>
        </div>

        {/* 3 Submenu Destination Cards (Scrollable on small screens) */}
        <div className="p-4 sm:p-6 flex flex-col gap-3 overflow-y-auto">
          {submenus.map((item) => {
            const Icon = item.icon;
            const desc = getSubmenuDesc(item.id, item.description);
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group relative flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 transition-all duration-200 hover:border-sky-400 hover:bg-sky-50/40 hover:shadow-md"
                aria-label={`Buka ${item.name} di tab baru`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${item.accent}15`,
                      color: item.accent,
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#0F1E36] group-hover:text-sky-700 transition-colors truncate">
                        {item.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.2 text-[10px] font-semibold text-emerald-600 border border-emerald-200 shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {t("statusAvailable")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2 shrink-0">
                  <span className="hidden sm:inline-block text-xs font-semibold text-sky-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("mrtgOpen")}
                  </span>
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 group-hover:bg-sky-600 group-hover:text-white transition-all">
                    <ExternalLink size={15} strokeWidth={2.2} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 sm:px-6 py-3 text-xs text-slate-500 shrink-0">
          <span className="truncate pr-2">{t("mrtgFooterNote")}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-slate-600 hover:text-[#0F1E36] shrink-0"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
