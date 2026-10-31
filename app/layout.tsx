import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HPIO Web Portal",
  description: "Akses cepat ke seluruh aplikasi dan layanan IT HPIO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
