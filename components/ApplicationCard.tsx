"use client";

import type { LucideIcon } from "lucide-react";
import { ExternalLink, Lock } from "lucide-react";
import type { Application } from "@/lib/applications";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface ApplicationCardProps {
  application: Application;
  viewMode: "grid" | "list";
  onOpenMrtg: () => void;
  onOpenRosterCnjo?: () => void;
  onComingSoon: (appName: string) => void;
}

const appKeyMap: Record<string, keyof typeof translations.id.apps> = {
  inspection: "inspection",
  "roster-rangers": "rosterRangers",
  "roster-cnjo": "rosterCnjo",
  "asset-management": "assetManagement",
  mrtg: "mrtg",
  dokumentasi: "dokumentasi",
};

export function ApplicationCard({
  application,
  viewMode,
  onOpenMrtg,
  onOpenRosterCnjo,
  onComingSoon,
}: ApplicationCardProps) {
  const { lang, t } = useLanguage();
  const Icon: LucideIcon = application.icon;
  const isAvailable = application.status === "available";
  const hasChildren = Boolean(
    application.children && application.children.length > 0
  );
  const isRosterCnjo = application.id === "roster-cnjo";

  // Translated metadata
  const appKey = appKeyMap[application.id];
  const appTrans = appKey ? translations[lang].apps[appKey] : null;
  const appName = appTrans?.name || application.name;
  const appDesc = appTrans?.description || application.description;

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "Operasional":
        return t("categoryOperational");
      case "IT & Support":
        return t("categoryItSupport");
      case "Monitoring":
        return t("categoryMonitoring");
      case "Manajemen":
        return t("categoryManagement");
      default:
        return category;
    }
  };

  // Icon container
  const iconContainer = (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
      style={{
        backgroundColor: `${application.accent}14`,
        color: application.accent,
      }}
    >
      <Icon size={20} strokeWidth={2.2} />
    </div>
  );

  // Availability status indicator
  const statusBadge = (
    <div className="flex items-center gap-1.5 text-xs font-semibold">
      <span
        className={`h-2 w-2 rounded-full ${
          isAvailable ? "bg-[#16A34A]" : "bg-[#94A3B8]"
        }`}
        aria-hidden="true"
      />
      <span className={isAvailable ? "text-[#16A34A]" : "text-[#94A3B8]"}>
        {isAvailable ? t("statusAvailable") : t("statusComingSoon")}
      </span>
      {hasChildren && (
        <span className="ml-1 rounded-md bg-blue-50 px-1.5 py-0.2 text-[10px] font-bold text-[#2563EB] border border-blue-100">
          {t("servicesCount")}
        </span>
      )}
    </div>
  );

  // LIST VIEW LAYOUT
  if (viewMode === "list") {
    if (hasChildren) {
      return (
        <button
          type="button"
          onClick={onOpenMrtg}
          className="group relative flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 text-left shadow-card hover:border-blue-300 hover:shadow-card-hover transition-all duration-200"
        >
          <div className="flex items-center gap-3.5">
            {iconContainer}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#102448] group-hover:text-[#2563EB] transition-colors">
                  {appName}
                </h3>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[#64748B]">
                  {getCategoryLabel(application.category)}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">{appDesc}</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            {statusBadge}
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all shadow-2xs">
              <span>{t("actionSelectService")}</span>
              <ExternalLink size={13} />
            </div>
          </div>
        </button>
      );
    }

    if (isRosterCnjo) {
      return (
        <button
          type="button"
          onClick={onOpenRosterCnjo}
          className="group relative flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 text-left shadow-card hover:border-sky-300 hover:shadow-card-hover transition-all duration-200"
        >
          <div className="flex items-center gap-3.5">
            {iconContainer}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#102448] group-hover:text-[#0284C7] transition-colors">
                  {appName}
                </h3>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[#64748B]">
                  {getCategoryLabel(application.category)}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">{appDesc}</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            {statusBadge}
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-1.5 text-xs font-bold text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-all shadow-2xs">
              <span>{t("actionViewSchedule")}</span>
              <ExternalLink size={13} />
            </div>
          </div>
        </button>
      );
    }

    if (isAvailable && application.url) {
      return (
        <a
          href={application.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-card hover:border-slate-300 hover:shadow-card-hover transition-all duration-200"
        >
          <div className="flex items-center gap-3.5">
            {iconContainer}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#102448] group-hover:text-[#D71935] transition-colors">
                  {appName}
                </h3>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[#64748B]">
                  {getCategoryLabel(application.category)}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">{appDesc}</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            {statusBadge}
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-[#102448] group-hover:bg-[#0B1F3A] group-hover:text-white transition-all shadow-2xs">
              <span>{t("actionOpenSystem")}</span>
              <ExternalLink size={13} />
            </div>
          </div>
        </a>
      );
    }

    // List view coming soon
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onComingSoon(appName)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onComingSoon(appName);
        }}
        className="group relative flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0]/80 bg-white/70 p-4 sm:p-5 shadow-2xs opacity-85 hover:opacity-100 transition-all cursor-pointer"
        aria-label={`${appName}, ${t("statusComingSoon")}`}
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <Icon size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-700">{appName}</h3>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[#64748B]">
                {getCategoryLabel(application.category)}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">{appDesc}</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          {statusBadge}
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-[#94A3B8]">
            <Lock size={12} />
            <span>{t("statusComingSoon")}</span>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW (Compact horizontal / vertical composition, height ~170-190px)
  if (hasChildren) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenMrtg}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenMrtg();
          }
        }}
        className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card hover:border-blue-300 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        aria-label={`Buka submenu ${appName}`}
      >
        {/* Top: Icon + Category Tag + Submenu Icon */}
        <div className="flex items-start justify-between">
          {iconContainer}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#64748B] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              {getCategoryLabel(application.category)}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all shadow-2xs">
              <ExternalLink size={13} strokeWidth={2.2} />
            </div>
          </div>
        </div>

        {/* Middle: Title & Description */}
        <div className="mt-3.5 mb-4">
          <h3 className="text-[17px] font-bold text-[#102448] group-hover:text-[#2563EB] transition-colors leading-tight">
            {appName}
          </h3>
          <p className="mt-1 text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {appDesc}
          </p>
        </div>

        {/* Bottom: Status & Action indicator */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          {statusBadge}
          <span className="text-xs font-bold text-[#2563EB] group-hover:underline">
            {t("actionSelectService")}
          </span>
        </div>
      </div>
    );
  }

  if (isRosterCnjo) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenRosterCnjo}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenRosterCnjo?.();
          }
        }}
        className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card hover:border-sky-300 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        aria-label={`Buka jadwal ${appName}`}
      >
        <div className="flex items-start justify-between">
          {iconContainer}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#64748B] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              {getCategoryLabel(application.category)}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-all shadow-2xs">
              <ExternalLink size={13} strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <div className="mt-3.5 mb-4">
          <h3 className="text-[17px] font-bold text-[#102448] group-hover:text-[#0284C7] transition-colors leading-tight">
            {appName}
          </h3>
          <p className="mt-1 text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {appDesc}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          {statusBadge}
          <span className="text-xs font-bold text-[#0284C7] group-hover:underline">
            {t("actionViewSchedule")}
          </span>
        </div>
      </div>
    );
  }

  if (isAvailable && application.url) {
    return (
      <a
        href={application.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card hover:border-slate-300 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
        aria-label={`Buka ${appName} di tab baru`}
      >
        <div className="flex items-start justify-between">
          {iconContainer}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#64748B] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              {getCategoryLabel(application.category)}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-[#102448] group-hover:text-white transition-all shadow-2xs">
              <ExternalLink size={13} strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <div className="mt-3.5 mb-4">
          <h3 className="text-[17px] font-bold text-[#102448] group-hover:text-[#D71935] transition-colors leading-tight">
            {appName}
          </h3>
          <p className="mt-1 text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {appDesc}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          {statusBadge}
          <span className="text-xs font-semibold text-[#64748B] group-hover:text-[#102448] transition-colors">
            {t("actionDirectAccess")}
          </span>
        </div>
      </a>
    );
  }

  // Grid view coming soon
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onComingSoon(appName)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onComingSoon(appName);
        }
      }}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0]/80 bg-white/75 p-5 shadow-2xs opacity-85 hover:opacity-100 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      aria-label={`${appName}, ${t("statusComingSoon")}`}
      aria-disabled="true"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#64748B] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            {getCategoryLabel(application.category)}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400 shadow-2xs">
            <Lock size={12} strokeWidth={2.2} />
          </div>
        </div>
      </div>

      <div className="mt-3.5 mb-4">
        <h3 className="text-[17px] font-bold text-slate-700 leading-tight">
          {appName}
        </h3>
        <p className="mt-1 text-xs text-[#64748B] leading-relaxed line-clamp-2">
          {appDesc}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {statusBadge}
        <span className="text-xs font-medium text-[#94A3B8]">
          {t("statusPreparation")}
        </span>
      </div>
    </div>
  );
}
