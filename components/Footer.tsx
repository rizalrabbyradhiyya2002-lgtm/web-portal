"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-auto pt-8 pb-4">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left: Original HPIO & KCIC Logos */}
          <div className="flex items-center gap-4">
            <Image
              src="/img/logo-hpio-tight.png"
              alt="Logo HPIO"
              width={105}
              height={28}
              className="h-6 w-auto object-contain"
            />
            <div className="h-5 w-px bg-[#E2E8F0]" aria-hidden="true" />
            <Image
              src="/img/logo-kcic-tight.png"
              alt="Logo KCIC"
              width={85}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Center: Branding & Role */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#64748B]">
            <span className="font-bold text-[#102448]">{t("productTitle")}</span>
            <span className="text-slate-300">•</span>
            <span>KCIC IT Operations</span>
            <span className="text-slate-300">•</span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
              v1.0
            </span>
          </div>

          {/* Right: Neutral Static Status */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#102448]">
            <span
              className="h-2 w-2 rounded-full bg-[#16A34A] shadow-[0_0_6px_#16A34A]"
              aria-hidden="true"
            />
            <span>
              {lang === "en"
                ? "Verified Portal Gateway"
                : "Layanan Portal Terverifikasi"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
