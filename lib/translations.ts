export type Language = "id" | "en";

export interface ApplicationTranslation {
  name: string;
  description: string;
}

export const translations = {
  id: {
    // Header
    productTitle: "HPIO Operations Hub",
    itSupport: "IT Support",
    itSupportTooltip: "Bantuan Operasional IT Support",

    // Sidebar
    menuOverview: "Menu Utama",
    navHome: "Beranda",
    navApplications: "Aplikasi",
    navDocumentation: "Dokumentasi",
    navHelp: "Bantuan",
    supportTitle: "IT Support",
    supportSubtitle: "Bantuan Operasional",
    portalVersion: "IT Operations Portal",

    // Hero Banner
    heroTag: "HPIO OPERATIONS",
    heroTitlePrefix: "Operations",
    heroTitleSuffix: "Web Portal",
    heroSubtitle: "Pusat akses aplikasi, layanan, dan informasi IT Operations HPIO.",

    // Information Strip
    totalSystemLabel: "Total Sistem:",
    totalSystemSuffix: "Aplikasi Terkonfigurasi",
    portalNotice: "Pusat Peluncur Akses Terpusat IT HPIO",

    // Search & Filters
    searchPlaceholder: "Cari aplikasi atau layanan...",
    clearSearch: "Hapus kata kunci",
    categoryAll: "Semua",
    categoryOperational: "Operasional",
    categoryItSupport: "IT & Support",
    categoryMonitoring: "Monitoring",
    categoryManagement: "Manajemen",
    viewGrid: "Grid",
    viewList: "List",

    // Application Directory
    appDirectoryTitle: "Daftar Aplikasi",
    appDirectorySubtitle: "Pilih aplikasi di bawah untuk membuka langsung sistem terkait.",
    appsDisplayed: "dari {total} Aplikasi Ditampilkan",
    searchResults: "Hasil pencarian:",
    appsFound: "aplikasi ditemukan",
    clearFilter: "Hapus Filter",
    noAppsFound: "Aplikasi tidak ditemukan",
    noAppsDesc: "Tidak ada aplikasi atau layanan yang cocok dengan kata kunci",
    resetFilters: "Reset Filter & Pencarian",

    // Application Cards
    statusAvailable: "Tersedia",
    statusComingSoon: "Coming Soon",
    statusPreparation: "Tahap Persiapan",
    servicesCount: "3 Layanan",
    actionDirectAccess: "Akses Langsung ›",
    actionOpenSystem: "Buka Sistem",
    actionSelectService: "Pilih Layanan ›",
    actionViewSchedule: "Lihat Jadwal ›",

    // Application Items
    apps: {
      inspection: {
        name: "Inspection",
        description: "Task & Monitoring Inspection CNJO.",
      },
      rosterRangers: {
        name: "Roster Rangers",
        description: "Informasi roster dan jadwal operasional Rangers.",
      },
      rosterCnjo: {
        name: "Roster CNJO",
        description: "Jadwal shift dan kegiatan kerja operasional tim CNJO.",
      },
      assetManagement: {
        name: "Asset Management",
        description: "Pengelolaan dan monitoring aset IT.",
      },
      mrtg: {
        name: "MRTG",
        description: "Monitoring traffic jaringan dan layanan konektivitas.",
      },
      dokumentasi: {
        name: "Dokumentasi",
        description: "Panduan, SOP, dan dokumen pendukung.",
      },
    },

    // MRTG Modal
    mrtgBadge: "Layanan Monitoring",
    mrtgDestinations: "3 Tujuan Tersedia",
    mrtgTitle: "Pilih Sistem MRTG & Jaringan",
    mrtgDesc: "Pilih aplikasi monitoring konektivitas di bawah untuk membuka sistem pada tab baru.",
    mrtgTelkomDesc: "Monitoring traffic dan layanan jaringan Telkom.",
    mrtgIconDesc: "Monitoring traffic jaringan ICON.",
    mrtgCustomerDesc: "Akses portal pelanggan dan layanan ICON.",
    mrtgFooterNote: "Tautan eksternal dibuka aman pada tab baru.",
    mrtgOpen: "Buka",
    close: "Tutup",

    // Roster CNJO Modal
    rosterCnjoTitle: "Roster CNJO — Jadwal Shift & Kerja",
    rosterCnjoTag: "Operasional CNJO",
    rosterCnjoReload: "Muat ulang",
    rosterCnjoFullscreen: "Layar penuh",
    rosterCnjoExitFullscreen: "Keluar layar penuh",
    rosterCnjoZoomIn: "Perbesar",
    rosterCnjoZoomOut: "Perkecil",
    rosterCnjoRotate: "Putar 90°",
    rosterCnjoOpenTab: "Buka gambar di tab baru",
    rosterCnjoDownload: "Unduh",
    rosterCnjoFileList: "Daftar Foto:",
    rosterCnjoLoading: "Memuat jadwal CNJO...",
    rosterCnjoError: "Gambar tidak dapat dimuat. Pastikan file tersedia di direktori jadwalcnjo.",
    rosterCnjoRetry: "Coba Lagi",
    rosterCnjoSource: "Sumber: Direktori lokal",
    rosterCnjoHint: "Gunakan tombol perbesar atau putar untuk melihat detail.",
    rosterCnjoUpdated: "Diperbarui:",

    // Support Modal
    supportModalTitle: "Bantuan & Kontak IT Support",
    supportModalSubtitle: "Hubungi tim operasional untuk kendala akses dan sistem.",
    supportPhone: "Telepon / Ekstensi",
    supportEmail: "Email Operasional",
    supportDuty: "Jam Kerja Operasional",
    supportDutyHours: "24/7 Monitoring Shift Operasional HPIO",
    supportLocation: "Lokasi Ruang Kerja",
    supportLocationDesc: "Gedung OCC / Depo KCIC Tegalluar & Stasiun Halim",

    // Documentation Modal
    docModalTitle: "Pusat Dokumentasi & SOP IT HPIO",
    docModalSubtitle: "Panduan teknis, standarisasi kerja, dan dokumen operasional.",
    docSectionGuides: "Panduan Pengguna (User Manual)",
    docSectionSop: "Standar Operasional Prosedur (SOP)",
    docSectionTopology: "Topologi & Infrastruktur Jaringan",
    docIntegrationNote: "Katalog dokumentasi digital sedang disinkronkan ke dalam repositori knowledge base IT HPIO.",

    // Toast
    toastComingSoon: 'Aplikasi "{name}" sedang dalam proses integrasi dan akan segera tersedia.',

    // Footer
    footerDesc: "Portal peluncur resmi IT Operations HPIO di bawah KCIC untuk akses cepat aplikasi dan monitoring terpadu.",
    footerCopyright: "Semua hak dilindungi undang-undang.",
    footerPrivacy: "Kebijakan Privasi",
    footerTerms: "Ketentuan Penggunaan",
    footerStatus: "Status Operasional",
  },

  en: {
    // Header
    productTitle: "HPIO Operations Hub",
    itSupport: "IT Support",
    itSupportTooltip: "HPIO IT Support & Assistance",

    // Sidebar
    menuOverview: "Main Menu",
    navHome: "Home",
    navApplications: "Applications",
    navDocumentation: "Documentation",
    navHelp: "Support",
    supportTitle: "IT Support",
    supportSubtitle: "Operations Helpdesk",
    portalVersion: "IT Operations Portal",

    // Hero Banner
    heroTag: "HPIO OPERATIONS",
    heroTitlePrefix: "Operations",
    heroTitleSuffix: "Web Portal",
    heroSubtitle: "Centralized gateway for HPIO IT Operations applications, services, and information.",

    // Information Strip
    totalSystemLabel: "Total Systems:",
    totalSystemSuffix: "Configured Applications",
    portalNotice: "HPIO Centralized Operational Access Gateway",

    // Search & Filters
    searchPlaceholder: "Search applications or services...",
    clearSearch: "Clear search query",
    categoryAll: "All",
    categoryOperational: "Operations",
    categoryItSupport: "IT & Support",
    categoryMonitoring: "Monitoring",
    categoryManagement: "Management",
    viewGrid: "Grid",
    viewList: "List",

    // Application Directory
    appDirectoryTitle: "Application Directory",
    appDirectorySubtitle: "Select an application below to open the corresponding system directly.",
    appsDisplayed: "of {total} Applications Displayed",
    searchResults: "Search results:",
    appsFound: "applications found",
    clearFilter: "Clear Filter",
    noAppsFound: "No applications found",
    noAppsDesc: "No applications or services matched your search query",
    resetFilters: "Reset Filters & Search",

    // Application Cards
    statusAvailable: "Available",
    statusComingSoon: "Coming Soon",
    statusPreparation: "In Preparation",
    servicesCount: "3 Services",
    actionDirectAccess: "Direct Access ›",
    actionOpenSystem: "Open System",
    actionSelectService: "Select Service ›",
    actionViewSchedule: "View Schedule ›",

    // Application Items
    apps: {
      inspection: {
        name: "Inspection",
        description: "CNJO Task & Monitoring Inspection system.",
      },
      rosterRangers: {
        name: "Roster Rangers",
        description: "Ranger shift roster and operational scheduling information.",
      },
      rosterCnjo: {
        name: "Roster CNJO",
        description: "CNJO team operational shift schedule and duty roster.",
      },
      assetManagement: {
        name: "Asset Management",
        description: "IT asset management and inventory monitoring.",
      },
      mrtg: {
        name: "MRTG",
        description: "Network traffic monitoring and connectivity services.",
      },
      dokumentasi: {
        name: "Documentation",
        description: "Operational guides, SOPs, and technical documents.",
      },
    },

    // MRTG Modal
    mrtgBadge: "Monitoring Service",
    mrtgDestinations: "3 Destinations Available",
    mrtgTitle: "Select MRTG & Network System",
    mrtgDesc: "Select a connectivity monitoring application below to open in a new browser tab.",
    mrtgTelkomDesc: "Telkom network traffic and service monitoring.",
    mrtgIconDesc: "ICON network traffic and bandwidth monitoring.",
    mrtgCustomerDesc: "ICON customer portal and enterprise services access.",
    mrtgFooterNote: "External links are opened securely in a new browser tab.",
    mrtgOpen: "Open",
    close: "Close",

    // Roster CNJO Modal
    rosterCnjoTitle: "Roster CNJO — Shift & Duty Schedule",
    rosterCnjoTag: "CNJO Operations",
    rosterCnjoReload: "Refresh",
    rosterCnjoFullscreen: "Fullscreen",
    rosterCnjoExitFullscreen: "Exit Fullscreen",
    rosterCnjoZoomIn: "Zoom In",
    rosterCnjoZoomOut: "Zoom Out",
    rosterCnjoRotate: "Rotate 90°",
    rosterCnjoOpenTab: "Open image in new tab",
    rosterCnjoDownload: "Download",
    rosterCnjoFileList: "Photos List:",
    rosterCnjoLoading: "Loading CNJO schedule...",
    rosterCnjoError: "Image could not be loaded. Please ensure the file is available in the jadwalcnjo directory.",
    rosterCnjoRetry: "Retry",
    rosterCnjoSource: "Source: Local directory",
    rosterCnjoHint: "Use zoom or rotate buttons to inspect schedule details.",
    rosterCnjoUpdated: "Updated:",

    // Support Modal
    supportModalTitle: "IT Support Contact & Assistance",
    supportModalSubtitle: "Contact the operations team for system and access inquiries.",
    supportPhone: "Phone / Extension",
    supportEmail: "Operations Email",
    supportDuty: "Operating Hours",
    supportDutyHours: "24/7 HPIO Operations Monitoring Shift",
    supportLocation: "Work Location",
    supportLocationDesc: "OCC Building / KCIC Tegalluar Depot & Halim Station",

    // Documentation Modal
    docModalTitle: "HPIO IT Documentation & SOP Hub",
    docModalSubtitle: "Technical guidelines, work standards, and operational documents.",
    docSectionGuides: "User Manuals & Handbooks",
    docSectionSop: "Standard Operating Procedures (SOP)",
    docSectionTopology: "Network Infrastructure & Topology",
    docIntegrationNote: "Digital documentation catalog is currently being synced into the HPIO IT knowledge base.",

    // Toast
    toastComingSoon: 'Application "{name}" is currently under integration and will be available soon.',

    // Footer
    footerDesc: "Official HPIO IT Operations launcher portal under KCIC for streamlined application access and unified monitoring.",
    footerCopyright: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerStatus: "Operational Status",
  },
};

export const DAYS = {
  id: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

export const MONTHS = {
  id: [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

export function formatBilingualDate(d: Date, lang: Language): string {
  const day = DAYS[lang][d.getDay()];
  const date = d.getDate();
  const month = MONTHS[lang][d.getMonth()];
  const year = d.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
}

