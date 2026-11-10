import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "HPIO Web Portal — KCIC IT Operations",
  description:
    "Portal terpadu dan sentralisasi akses cepat ke seluruh aplikasi dan layanan IT HPIO KCIC.",
  icons: {
    icon: "/img/logo-hpio-tight.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#081427",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-[#F2F5FB] text-[#0F1E36] font-sans antialiased min-h-screen selection:bg-[#2563EB] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
