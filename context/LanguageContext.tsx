"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.id) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("id");

  // Load language from localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hpio_language");
      if (saved === "id" || saved === "en") {
        requestAnimationFrame(() => {
          setLang(saved);
        });
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem("hpio_language", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === "id" ? "en" : "id");
  }, [lang, setLanguage]);

  const t = useCallback(
    (key: keyof typeof translations.id): string => {
      const currentDict = translations[lang] || translations.id;
      const val = currentDict[key];
      if (typeof val === "string") {
        return val;
      }
      return "";
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

