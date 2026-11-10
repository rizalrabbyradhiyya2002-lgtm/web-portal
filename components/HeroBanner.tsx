"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface HeroBannerProps {
  bannerImage?: string;
}

export function HeroBanner({
  bannerImage = "/img/datacenter-banner.jpg",
}: HeroBannerProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07172D] via-[#0B1F3A] to-[#153765] min-h-[220px] sm:min-h-[240px] md:min-h-[260px] flex items-center shadow-banner border border-white/10">
      {/* IT Data Center Background Image Layer */}
      {!imageError && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage}
            alt="HPIO IT Data Center & Operations Hub"
            fill
            sizes="(max-width: 1024px) 100vw, 85vw"
            className="object-cover object-right"
            priority
            onError={() => setImageError(true)}
          />
          {/* Deep Navy Gradient Overlay to ensure text readability */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#07172D] via-[#07172D]/90 sm:via-[#0B1F3A]/80 to-transparent/30"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Subtle Technical Line Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-20 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute -left-10 -bottom-10 w-[500px] h-[250px]"
          viewBox="0 0 500 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 160 C 150 140, 280 220, 500 100"
            stroke="#D71935"
            strokeWidth="2.5"
          />
          <path
            d="M 20 200 C 180 170, 320 240, 520 120"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Left Side: Typography */}
        <div className="flex flex-col gap-2 sm:gap-2.5 max-w-xl">
          {/* Small Label */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 bg-[#D71935] rounded-full" />
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase">
              {t("heroTag")}
            </span>
          </div>

          {/* Main Title: Operations Web Portal */}
          <h1 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight text-white leading-tight">
            {t("heroTitlePrefix")}{" "}
            <span className="text-[#D71935]">{t("heroTitleSuffix")}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-lg mt-0.5">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
