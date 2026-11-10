"use client";

import { useEffect, useRef } from "react";
import {
  Clock,
  Headset,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
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
      aria-labelledby="support-modal-title"
    >
      <div
        className="animate-modal-backdrop fixed inset-0 bg-[#0B1B35]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="animate-modal-content relative z-10 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-red-50/50 via-white to-slate-50 p-5 sm:p-6 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-red-100 text-[#D71935] shadow-xs shrink-0">
              <Headset size={22} strokeWidth={2.2} />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D71935]">
                {lang === "en" ? "Help Center" : "Pusat Bantuan"}
              </span>
              <h2
                id="support-modal-title"
                className="text-lg sm:text-xl font-bold text-[#0F1E36]"
              >
                HPIO IT Support
              </h2>
              <p className="text-xs text-slate-500">
                {t("supportModalSubtitle")}
              </p>
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

        {/* Content (Scrollable) */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 text-sm overflow-y-auto">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail size={18} className="text-[#D71935] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {t("supportEmail")}
                </p>
                <p className="font-bold text-[#0F1E36] text-xs sm:text-sm">
                  hpio.support@kcic.co.id
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center gap-3 text-slate-700">
              <PhoneCall size={18} className="text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {lang === "en"
                    ? "IT Rangers Hotline (OCC)"
                    : "Hotline IT Rangers (OCC)"}
                </p>
                <p className="font-bold text-[#0F1E36] text-xs sm:text-sm">
                  Ext. 1400 / Direct: +62 21 8060 8888
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center gap-3 text-slate-700">
              <Clock size={18} className="text-blue-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {t("supportDuty")}
                </p>
                <p className="font-bold text-[#0F1E36] text-xs sm:text-sm">
                  {t("supportDutyHours")}
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center gap-3 text-slate-700">
              <MapPin size={18} className="text-purple-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {t("supportLocation")}
                </p>
                <p className="font-bold text-[#0F1E36] text-xs sm:text-sm">
                  {t("supportLocationDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-800 border border-emerald-200">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>
              {lang === "en"
                ? "For Telkom or ICON connectivity escalations, please contact the on-duty Network PIC."
                : "Untuk eskalasi kendala konektivitas Telkom atau ICON, hubungi PIC Jaringan yang sedang berdinas."}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50 px-5 sm:px-6 py-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#0B1B35] px-4 py-2 text-xs font-bold text-white hover:bg-[#122F5E] transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
