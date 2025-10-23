"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "pt" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLanguage: () => void;
  sequence: string[];
  setSequence: React.Dispatch<React.SetStateAction<string[]>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "en" || saved === "pt") setLang(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "pt" ? "en" : "pt";
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, sequence, setSequence }}>
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
