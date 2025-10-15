'use client'

import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageSwitch } from "@/components/LanguageSwitch";
import 'react-toastify/dist/ReactToastify.css'
import { useIsMobile } from "@/hooks/use-mobile";
import { Blocks } from "lucide-react"
import CodeCard from '@/components/CardCode';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isTop, setIsTop] = useState(true);
  const isMobile = useIsMobile();
  const [code, setCode] = useState<{ tema: string; language: string }>({
    tema: "",
    language: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/source")
      .then((res) => res.json())
      .then((data) => setCode(data));
  }, []);

  return (
    <div className="flex h-full bg-gray-100 dark:bg-sidebar text-gray-800 dark:text-gray-100 w-full">
      <div className="flex-1 flex flex-col">
        <div className='fixed left-3 top-1/2 -translate-y-1/2 flex flex-col flex rounded-full bg-white/90 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 backdrop-blur dark:bg-white/10 dark:text-base-200 dark:ring-white/10 h-3/10 px-2 py-3 justify-around items-center'>
          <HoverCard>
            <HoverCardTrigger>
              <ThemeToggle />
            </HoverCardTrigger>
            <HoverCardContent className="bg-white dark:bg-black w-[40vw]">
              <CodeCard code={code.tema} />
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger>
              <LanguageSwitch />
            </HoverCardTrigger>
            <HoverCardContent className="bg-white dark:bg-black w-[40vw]">
              <CodeCard code={code.language} />
            </HoverCardContent>
          </HoverCard>
          
        </div>
        <header
          className={`sticky top-0 z-20 w-full flex justify-center pt-4 transition-transform duration-300 ${isTop ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex rounded-full bg-white/90 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 backdrop-blur dark:bg-white/10 dark:text-base-200 dark:ring-white/10 w-2/5 px-5 py-3 justify-around">
            <Blocks className='blur-none'/>
            <Blocks />
            <Blocks />
            <Blocks />            
          </div>          
        </header>
        <main className='h-full'>
          {children}
        </main>
      </div>
    </div>
  )
}
