import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Boxes,
  ClipboardCheck,
  Headset,
  PanelsTopLeft,
  Ticket,
  UsersRound,
} from "lucide-react";

export type ApplicationCategory =
  | "Operasional"
  | "IT & Support"
  | "Monitoring"
  | "Manajemen";

export type Application = {
  name: string;
  description: string;
  category: ApplicationCategory;
  icon: LucideIcon;
  accent: string;
  url: string | null;
};

export const applications: Application[] = [
  {
    name: "Inspection",
    description: "Task & Monitoring Inspection CNJO.",
    category: "Operasional",
    icon: ClipboardCheck,
    accent: "#c82032",
    url: "https://kcic.kamargelap.online/",
  },
  {
    name: "Jira",
    description: "Manajemen task, isu, dan pengembangan sistem.",
    category: "IT & Support",
    icon: PanelsTopLeft,
    accent: "#3164df",
    url: "https://id.atlassian.com/logout?application=admin--jira-atlas-75650&continue=https%3A%2F%2Fkcic-itsm.atlassian.net",
  },
  {
    name: "Roster Rangers",
    description: "Informasi roster dan jadwal operasional.",
    category: "Operasional",
    icon: UsersRound,
    accent: "#7551d8",
    url: "https://roster.rangersuniverse.my.id/",
  },
  {
    name: "Asset Management",
    description: "Pengelolaan aset IT.",
    category: "Manajemen",
    icon: Boxes,
    accent: "#1d9a68",
    url: null,
  },

  {
    name: "MRTG Telkom",
    description: "Monitoring traffic jaringan Telkom.",
    category: "Monitoring",
    icon: Activity,
    accent: "#18a6a4",
    url: "https://telkomcare.telkom.co.id/public/login?&modules=mrtgnetcare2",
  },
  {
    name: "Dokumentasi",
    description: "Panduan, SOP, dan dokumen pendukung.",
    category: "Manajemen",
    icon: BookOpen,
    accent: "#64748b",
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
