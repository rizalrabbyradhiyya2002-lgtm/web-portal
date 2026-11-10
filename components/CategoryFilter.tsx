"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Briefcase,
  Layers,
  LayoutGrid,
  Wrench,
} from "lucide-react";
import type { CategoryFilterType } from "@/lib/applications";
import { applicationCategories } from "@/lib/applications";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (category: CategoryFilterType) => void;
  categoryCounts: Record<CategoryFilterType, number>;
}

const categoryIconMap: Record<CategoryFilterType, LucideIcon> = {
  Semua: LayoutGrid,
  Operasional: Layers,
  "IT & Support": Wrench,
  Monitoring: Activity,
  Manajemen: Briefcase,
};

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFilterProps) {
  const { lang, t } = useLanguage();

  const getCategoryLabel = (category: CategoryFilterType): string => {
    switch (category) {
      case "Semua":
        return t("categoryAll");
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

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5"
      role="group"
      aria-label={
        lang === "en" ? "Application category filter" : "Filter kategori aplikasi"
      }
    >
      {applicationCategories.map((category) => {
        const Icon = categoryIconMap[category];
        const isSelected = selectedCategory === category;
        const count = categoryCounts[category] || 0;
        const label = getCategoryLabel(category);

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold border transition-all duration-200 ${
              isSelected
                ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs"
                : "bg-white text-[#64748B] hover:text-[#102448] hover:bg-slate-50 border-[#E2E8F0]"
            }`}
            aria-pressed={isSelected}
          >
            <Icon
              size={14}
              strokeWidth={2.2}
              className={isSelected ? "text-[#D71935]" : "text-slate-400"}
            />
            <span className="whitespace-nowrap">{label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
