"use client";

import { useEffect, useState } from "react";
import { Calendar, Headset, Menu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatBilingualDate } from "@/lib/translations";

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenSupport: () => void;
}

export function Header({ onOpenSidebar, onOpenSupport }: HeaderProps) {
  const { lang, setLanguage, t } = useLanguage();
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setCurrentDate(formatBilingualDate(new Date(), lang));
    });
    const interval = setInterval(() => {
      setCurrentDate(formatBilingualDate(new Date(), lang));
    }, 60000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [lang]);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-5 sm:px-7 md:px-9 shadow-2xs">
      {/* Left side: Mobile Menu + Corporate Red Accent + Product Name */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden transition-colors"
          aria-label="Buka navigasi menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2.5">
          <span
            className="h-4 w-1.5 rounded-full bg-[#D71935]"
            aria-hidden="true"
          />
          <span className="text-sm sm:text-base font-bold tracking-tight text-[#102448]">
            {t("productTitle")}
          </span>
        </div>
      </div>

      {/* Right side: Real-time Date + Language Toggle (ID/EN) + IT Support Button */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs">
        {/* Real-time Date Display */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-50 border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#102448] shadow-2xs font-medium">
          <Calendar size={14} className="text-[#2563EB] shrink-0" />
          <span
            className="font-semibold text-slate-800 tracking-tight"
            suppressHydrationWarning
          >
            {currentDate || formatBilingualDate(new Date(), lang)}
          </span>
        </div>

        {/* Language Switcher Pill (ID | EN) */}
        <div
          className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-[#E2E8F0] text-xs font-bold shrink-0"
          role="group"
          aria-label="Language selection"
        >
          <button
            type="button"
            onClick={() => setLanguage("id")}
            className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition-all ${
              lang === "id"
                ? "bg-[#0B1F3A] text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            aria-pressed={lang === "id"}
            title="Bahasa Indonesia"
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition-all ${
              lang === "en"
                ? "bg-[#0B1F3A] text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            aria-pressed={lang === "en"}
            title="English"
          >
            EN
          </button>
        </div>

        {/* IT Support Shortcut Button */}
        <button
          type="button"
          onClick={onOpenSupport}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] hover:bg-[#153765] text-white px-3 sm:px-3.5 py-2 font-semibold text-xs transition-colors shadow-xs shrink-0"
          title={t("itSupportTooltip")}
        >
          <Headset size={14} className="text-[#D71935]" />
          <span className="hidden xs:inline sm:inline">{t("itSupport")}</span>
        </button>
      </div>
    </header>
  );
}
