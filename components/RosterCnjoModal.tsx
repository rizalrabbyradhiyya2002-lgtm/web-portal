"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  RefreshCw,
  CalendarDays,
  ExternalLink,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface JadwalCnjoFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
}

interface RosterCnjoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RosterCnjoModal({ isOpen, onClose }: RosterCnjoModalProps) {
  const { lang, t } = useLanguage();
  const [files, setFiles] = useState<JadwalCnjoFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<JadwalCnjoFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timestamp, setTimestamp] = useState(0);

  const fetchJadwal = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/jadwalcnjo?t=${Date.now()}`);
      if (!res.ok) {
        throw new Error(
          lang === "en"
            ? "Failed to fetch CNJO schedule data"
            : "Gagal mengambil data jadwal CNJO"
        );
      }
      const data = await res.json();
      if (data.files && data.files.length > 0) {
        setFiles(data.files);
        setSelectedFile(data.files[0]);
      } else {
        // Fallback default file
        const fallback: JadwalCnjoFile = {
          name: "jadwalcnjo.jpeg",
          url: "/jadwalcnjo/jadwalcnjo.jpeg",
          size: 0,
          updatedAt: new Date().toISOString(),
        };
        setFiles([fallback]);
        setSelectedFile(fallback);
      }
    } catch {
      // Fallback to static public file if API fails
      const fallback: JadwalCnjoFile = {
        name: "jadwalcnjo.jpeg",
        url: "/jadwalcnjo/jadwalcnjo.jpeg",
        size: 0,
        updatedAt: new Date().toISOString(),
      };
      setFiles([fallback]);
      setSelectedFile(fallback);
    } finally {
      setLoading(false);
      setTimestamp(Date.now());
    }
  }, [lang]);

  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    const raf = requestAnimationFrame(() => {
      if (active) {
        setZoomLevel(1);
        setRotation(0);
        fetchJadwal();
      }
    });

    document.body.style.overflow = "hidden";

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [isOpen, fetchJadwal]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const imageUrl = selectedFile
    ? `${selectedFile.url}${selectedFile.url.includes("?") ? "&" : "?"}v=${timestamp}`
    : `/jadwalcnjo/jadwalcnjo.jpeg?v=${timestamp}`;

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#07172D]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roster-cnjo-title"
    >
      <div
        className={`relative w-full ${
          isFullscreen
            ? "h-full max-w-none rounded-none"
            : "max-w-5xl max-h-[92vh] rounded-2xl sm:rounded-3xl"
        } bg-white shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden transition-all duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-4.5 bg-gradient-to-r from-[#0B1F3A] to-[#153765] text-white border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shrink-0">
              <CalendarDays className="w-5 h-5 text-[#D71935]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D71935]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  {t("rosterCnjoTag")}
                </span>
              </div>
              <h2
                id="roster-cnjo-title"
                className="text-base sm:text-lg font-bold text-white tracking-tight"
              >
                {t("rosterCnjoTitle")}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Refresh Button */}
            <button
              onClick={fetchJadwal}
              disabled={loading}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title={t("rosterCnjoReload")}
              aria-label={t("rosterCnjoReload")}
            >
              <RefreshCw
                className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
              title={
                isFullscreen
                  ? t("rosterCnjoExitFullscreen")
                  : t("rosterCnjoFullscreen")
              }
              aria-label={t("rosterCnjoFullscreen")}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title={`${t("close")} (Esc)`}
              aria-label={t("close")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="px-5 py-2.5 sm:px-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">
              {selectedFile?.name || "jadwalcnjo.jpeg"}
            </span>
            {selectedFile?.size ? (
              <span className="text-slate-400">
                ({formatFileSize(selectedFile.size)})
              </span>
            ) : null}
            {selectedFile?.updatedAt ? (
              <span className="hidden sm:inline-block text-slate-400">
                • {t("rosterCnjoUpdated")} {formatDate(selectedFile.updatedAt)}
              </span>
            ) : null}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-xs">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                title={`${t("rosterCnjoZoomOut")} (-)`}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 py-1 text-xs font-semibold text-slate-700 hover:text-navy-900 transition-colors"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                title={`${t("rosterCnjoZoomIn")} (+)`}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Rotate */}
            <button
              onClick={handleRotate}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-xs transition-colors"
              title={t("rosterCnjoRotate")}
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Open Raw in New Tab */}
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-xs transition-colors"
              title={t("rosterCnjoOpenTab")}
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Download */}
            <a
              href={imageUrl}
              download={selectedFile?.name || "jadwalcnjo.jpeg"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D71935] hover:bg-[#b0142b] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              title={t("rosterCnjoDownload")}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("rosterCnjoDownload")}</span>
            </a>
          </div>
        </div>

        {/* Multiple Files Tabs (if more than 1 image in directory) */}
        {files.length > 1 && (
          <div className="px-5 py-2 bg-white border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              {t("rosterCnjoFileList")}
            </span>
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => {
                  setSelectedFile(file);
                  handleResetZoom();
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedFile?.name === file.name
                    ? "bg-[#0B1F3A] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>
        )}

        {/* Image Preview Canvas */}
        <div className="relative flex-1 bg-slate-900 overflow-auto flex items-center justify-center p-4 sm:p-6 select-none min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-[#D71935]" />
              <p className="text-sm font-medium">{t("rosterCnjoLoading")}</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 text-center max-w-md p-6 bg-slate-800 rounded-2xl border border-red-500/30">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-sm text-slate-200">{error}</p>
              <button
                onClick={fetchJadwal}
                className="mt-2 px-4 py-1.5 text-xs font-semibold bg-[#D71935] text-white rounded-lg hover:bg-[#b0142b] transition-colors"
              >
                {t("rosterCnjoRetry")}
              </button>
            </div>
          ) : (
            <div
              className="relative transition-transform duration-200 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              {/* Image Display */}
              <div className="relative max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl bg-black">
                <Image
                  src={imageUrl}
                  alt={selectedFile?.name || "Roster CNJO"}
                  width={1400}
                  height={900}
                  className="w-auto h-auto max-h-[72vh] object-contain rounded-lg"
                  priority
                  unoptimized
                  onError={() => {
                    setError(t("rosterCnjoError"));
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="px-5 py-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <p>
            {t("rosterCnjoSource")}{" "}
            <code className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[11px]">
              web-portal\jadwalcnjo
            </code>
          </p>
          <div className="flex items-center gap-3">
            <span>{t("rosterCnjoHint")}</span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md transition-colors"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
