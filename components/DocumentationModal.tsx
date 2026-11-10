"use client";

import { useEffect, useRef } from "react";
import { BookOpen, FileText, Info, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentationModal({
  isOpen,
  onClose,
}: DocumentationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { lang, t } = useLanguage();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-modal-title"
    >
      <div
        className="animate-modal-backdrop fixed inset-0 bg-[#0B1B35]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="animate-modal-content relative z-10 w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200">
        <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50 p-5 sm:p-6 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-xs shrink-0">
              <BookOpen size={22} strokeWidth={2.2} />
            </div>
            <div>
              <span className="rounded-full bg-slate-200 px-2 py-0.2 text-[10px] font-bold text-slate-700">
                {t("statusComingSoon")}
              </span>
              <h2
                id="doc-modal-title"
                className="text-base sm:text-lg font-bold text-[#0F1E36] mt-0.5"
              >
                {t("docModalTitle")}
              </h2>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
            aria-label={t("close")}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-4 text-xs sm:text-sm text-slate-600 overflow-y-auto">
          <p>{t("docIntegrationNote")}</p>

          <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <FileText size={15} className="text-[#D71935] shrink-0" />
              <span>
                {lang === "en"
                  ? "CNJO Incident Management SOP"
                  : "SOP Incident Management CNJO"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <FileText size={15} className="text-[#D71935] shrink-0" />
              <span>
                {lang === "en"
                  ? "Telkom & ICON MRTG Monitoring Guidelines"
                  : "Panduan Monitoring MRTG Telkom & ICON"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <FileText size={15} className="text-[#D71935] shrink-0" />
              <span>
                {lang === "en"
                  ? "Rangers Operational Shift Guidelines"
                  : "Pedoman Shift & Operasional Rangers"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-500">
            <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
            <span>
              {lang === "en"
                ? "For temporary physical files or copies, please coordinate directly with HPIO IT Operations."
                : "Untuk salinan dokumen fisik atau file sementara, silakan berkoordinasi langsung dengan tim HPIO IT Operations."}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50 px-5 sm:px-6 py-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#0B1B35] px-4 py-2 text-xs font-bold text-white hover:bg-[#122F5E] transition-colors"
          >
            {lang === "en" ? "Understood" : "Mengerti"}
          </button>
        </div>
      </div>
    </div>
  );
}
