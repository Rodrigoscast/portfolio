'use client'

import { useState, useEffect, useRef } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageSwitch } from "@/components/LanguageSwitch";
import 'react-toastify/dist/ReactToastify.css'
import { useIsMobile } from "@/hooks/use-mobile";
import { Music, House, Code2, FolderGit2, MessageSquareMoreIcon } from "lucide-react"
import CodeCard from '@/components/CardCode';
import { motion } from "framer-motion";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [code, setCode] = useState<{ tema: string; language: string }>({
    tema: "",
    language: ""
  });

  const secretCode = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a",
  ];
  const [sequence, setSequence] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/source")
      .then((res) => res.json())
      .then((data) => setCode(data));
  }, []);

  const scrollToSection = (id: string) => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    const target = document.getElementById(id);

    if (!scrollContainer || !target) return;

    const start = scrollContainer.scrollTop;
    const end = target.offsetTop;
    const duration = 900; // milissegundos
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      scrollContainer.scrollTo({
        top: start + (end - start) * ease,
      });

      if (elapsed < duration) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      // Limpa timeout anterior
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const newSequence = [...sequence, key];

      // Verifica se até agora está certo
      const isCorrectSoFar = secretCode.slice(0, newSequence.length).every(
        (codeKey, i) => codeKey === newSequence[i]
      );

      if (!isCorrectSoFar) {
        // tecla errada → reseta
        setSequence([]);
        return;
      }

      // Se completou a sequência → sucesso!
      if (newSequence.length === secretCode.length) {        
        executarAcaoSecreta();
        setSequence([]);
        return;
      }

      // Atualiza sequência
      setSequence(newSequence);

      // Timeout de 1 segundo para resetar
      timeoutRef.current = setTimeout(() => {
        setSequence([]);
      }, 1000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sequence]);

  const executarAcaoSecreta = () => {
    alert("🕹️ Modo secreto ativado!");
  };

  useEffect(() => {
    console.log(sequence)
  }, [sequence])

  return (
    <div className="flex h-full bg-gray-100 dark:bg-sidebar text-gray-800 dark:text-gray-100 w-full">
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className='fixed left-3 top-1/2 -translate-y-1/2 z-20 border-r-3 border-gray-400 flex flex-col flex rounded-full bg-white/90 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 backdrop-blur dark:bg-white/10 dark:text-base-200 dark:ring-white/10 h-3/10 px-2 py-3 justify-around items-center'
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <ThemeToggle />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <CodeCard code={code.tema} />
            </ContextMenuContent>
          </ContextMenu>

          <ContextMenu>
            <ContextMenuTrigger>
              <LanguageSwitch />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <CodeCard code={code.language} />
            </ContextMenuContent>
          </ContextMenu>

        </motion.div>
        <header
          className={`fixed top-0 z-20 w-full flex justify-center pt-4 transition-transform duration-300 translate-y-0`}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="flex rounded-full bg-white/90 text-sm font-medium border-b-3 border-gray-400 text-base-800 shadow-lg shadow-base-800/5 backdrop-blur dark:bg-white/10 dark:text-base-200 dark:ring-white/10 w-2/5 px-5 py-3 justify-around"
          >
            <House onClick={() => scrollToSection("home")} className='cursor-pointer hover:scale-110 hover:rotate-15 transition-all duration-200 ease-in-out' />
            <Code2 onClick={() => scrollToSection("code")} className='cursor-pointer hover:scale-110 hover:rotate-15 transition-all duration-200 ease-in-out' />
            <FolderGit2 onClick={() => scrollToSection("projects")} className='cursor-pointer hover:scale-110 hover:rotate-15 transition-all duration-200 ease-in-out' />
            <MessageSquareMoreIcon onClick={() => scrollToSection("contact")} className='cursor-pointer hover:scale-110 hover:rotate-15 transition-all duration-200 ease-in-out' />
            <Music onClick={() => scrollToSection("music")} className='cursor-pointer hover:scale-110 hover:rotate-15 transition-all duration-200 ease-in-out' />
          </motion.div>
        </header>
        <main className='h-full'>
          {children}
        </main>
      </div>
    </div>
  )
}
