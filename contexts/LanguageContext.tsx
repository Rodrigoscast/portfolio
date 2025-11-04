"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "pt" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLanguage: () => void;
  sequence: string[];
  setSequence: React.Dispatch<React.SetStateAction<string[]>>;
  info: boolean;
  setInfo: React.Dispatch<React.SetStateAction<boolean>>;
  kame: boolean;
  setKame: React.Dispatch<React.SetStateAction<boolean>>;
  devMode: boolean;
  setDevMode: React.Dispatch<React.SetStateAction<boolean>>;
  abreDev: (nome: string) => void;
  devCode: string;
  setDevCode: React.Dispatch<React.SetStateAction<string>>;
  devCodeModal: boolean;
  setDevCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const [sequence, setSequence] = useState<string[]>([]);
  const [info, setInfo] = useState(false)
  const [kame, setKame] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [devCode, setDevCode] = useState('');
  const [devCodeModal, setDevCodeModal] = useState(false)

  const abreDev = (nome: string) => {
    setDevCode(nome)
    setDevCodeModal(true)
  }

  const setView = async(campo: string) => {
    // pega o id salvo no localStorage
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      console.warn("Nenhuma sessão encontrada!");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/views`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": '1'
        },
        body: JSON.stringify({
          cod_visit: sessionId,
          campo: campo,
        }),
      });
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  useEffect(() => {
    if(devMode){
      setView('devmode')
    }
    if(info){
      setView('musica')
    }
  }, [devMode, info])

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "en" || saved === "pt") setLang(saved);
  }, []);

  const toggleLanguage = async() => {
    const newLang = lang === "pt" ? "en" : "pt";
    setLang(newLang);
    localStorage.setItem("language", newLang);

    // pega o id salvo no localStorage
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
        console.warn("Nenhuma sessão encontrada!");
        return;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/views`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": '1'
        },
        body: JSON.stringify({
            cod_visit: sessionId,
            campo: "linguagem",
        }),
        });
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      lang, toggleLanguage, sequence, setSequence, 
      info, setInfo, kame, setKame, devMode, setDevMode,
      abreDev, devCode, setDevCode, devCodeModal, setDevCodeModal
    }}>
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
