import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Boxes,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  Globe,
  Network,
  UsersRound,
} from "lucide-react";

export type ApplicationCategory =
  | "Operasional"
  | "IT & Support"
  | "Monitoring"
  | "Manajemen";

export type ApplicationStatus = "available" | "coming_soon";

export interface SubmenuItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  url: string;
  status: ApplicationStatus;
  accent: string;
}

export interface Application {
  id: string;
  name: string;
  description: string;
  category: ApplicationCategory;
  icon: LucideIcon;
  accent: string;
  status: ApplicationStatus;
  url: string | null;
  children?: SubmenuItem[];
}

/**
 * Centralized application configuration.
 * Note: Jira has been completely removed as requested.
 */
export const applications: Application[] = [
  {
    id: "inspection",
    name: "Inspection",
    description: "Task & Monitoring Inspection CNJO.",
    category: "Operasional",
    icon: ClipboardCheck,
    accent: "#D71935",
    status: "available",
    url: "https://kcic.kamargelap.online/login",
  },
  {
    id: "roster-rangers",
    name: "Roster Rangers",
    description: "Informasi roster dan jadwal operasional Rangers.",
    category: "Operasional",
    icon: UsersRound,
    accent: "#7C3AED",
    status: "available",
    url: "https://roster.rangersuniverse.my.id/#/login",
  },
  {
    id: "roster-cnjo",
    name: "Roster CNJO",
    description: "Jadwal shift dan kegiatan kerja operasional tim CNJO.",
    category: "Operasional",
    icon: CalendarDays,
    accent: "#0284C7",
    status: "available",
    url: null,
  },
  {
    id: "asset-management",
    name: "Asset Management",
    description: "Pengelolaan dan monitoring aset IT.",
    category: "Manajemen",
    icon: Boxes,
    accent: "#10B981",
    status: "coming_soon",
    url: null,
  },
  {
    id: "mrtg",
    name: "MRTG",
    description: "Monitoring traffic jaringan dan layanan konektivitas.",
    category: "Monitoring",
    icon: Activity,
    accent: "#0EA5E9",
    status: "available",
    url: null,
    children: [
      {
        id: "mrtg-telkom",
        name: "MRTG Telkom",
        description: "Monitoring traffic dan layanan jaringan Telkom.",
        icon: Network,
        url: "https://telkomcare.telkom.co.id/public/login?modules=mrtgnetcare2",
        status: "available",
        accent: "#0284C7",
      },
      {
        id: "mrtg-icon",
        name: "MRTG ICON",
        description: "Monitoring traffic jaringan ICON.",
        icon: ChartNoAxesCombined,
        url: "https://mrtg.iconpln.co.id/login",
        status: "available",
        accent: "#2563EB",
      },
      {
        id: "icon-customer",
        name: "ICON Customer Portal",
        description: "Akses portal pelanggan dan layanan ICON.",
        icon: Globe,
        url: "https://customer.iconpln.co.id/login",
        status: "available",
        accent: "#0D9488",
      },
    ],
  },
  {
    id: "dokumentasi",
    name: "Dokumentasi",
    description: "Panduan, SOP, dan dokumen pendukung.",
    category: "IT & Support",
    icon: BookOpen,
    accent: "#64748B",
    status: "coming_soon",
    url: null,
  },
];

export const applicationCategories = [
  "Semua",
  "Operasional",
  "IT & Support",
  "Monitoring",
  "Manajemen",
] as const;

export type CategoryFilterType = (typeof applicationCategories)[number];
