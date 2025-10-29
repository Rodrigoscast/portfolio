'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from "next-themes";
import { ThemeToggle } from '@/components/ThemeToggle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { LanguageSwitch } from "@/components/LanguageSwitch";
import 'react-toastify/dist/ReactToastify.css'
import { useIsMobile } from "@/hooks/use-mobile";
import { Music, House, Code2, FolderGit2, MessageSquareMoreIcon, X } from "lucide-react"
import CodeCard from '@/components/CardCode';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CassetteModel from "@/components/CassetteModel";
import { Button } from '@/components/ui/button';
import { useLanguage } from "@/contexts/LanguageContext";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import PacMan from '@/components/PacMan';

import kameHover from "@/public/icons/kame-hover.json";
import glasses from "@/public/icons/linguagem.json";
import glassesDark from "@/public/icons/linguagemDark.json";

import music from "@/public/icons/music.json"
import musicDark from "@/public/icons/music-dark.json"

import { PowerGlitch } from "powerglitch";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [SSR, setSSR] = useState(false)
  const [tape, setTape] = useState(false)
  const [doom, setDoom] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("home");
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const lottieRefhover = useRef<LottieRefCurrentProps>(null);
  const lottieRefmusic = useRef<LottieRefCurrentProps>(null);
  const lottieRefglass = useRef<LottieRefCurrentProps>(null);

  const [firstDev, setFirstDev] = useState(true)
  const [devDialog, setDevDialog] = useState(false)

  const { lang, sequence, setSequence, info, setInfo, kame, setKame, devMode, setDevMode,
    abreDev, devCode, setDevCode, devCodeModal, setDevCodeModal
  } = useLanguage();

  const [attComp, setAttComp] = useState(0)

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (devMode) {
      const glitch = PowerGlitch.glitch(".glitch", { playMode: "always" });
      return () => glitch.stopGlitch(); // cleanup
    }
  }, [devMode, devCode, attComp]);

  useEffect(() => {
    if (devMode && firstDev) {
      setDevDialog(true)
      setFirstDev(false)
    }
  }, [devMode])

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
    setTape(true)
  };

  const handleInsert = () => {
    setTape(false)
    setDoom(true)
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '[data-radix-scroll-area-viewport]'
    );

    if (!scrollContainer) return;

    const sections = ["home", "code", "projects", "contact"];

    const handleScroll = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        // Checa se a seção está no centro da área visível
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          setActiveSection(id);
        }
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="flex h-full bg-gray-100 dark:bg-sidebar text-gray-800 dark:text-gray-100 w-full">
      <ToastContainer position="top-right" autoClose={3000} className='!z-999999' />
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className='fixed left-3 top-1/2 -translate-y-1/2 z-15 flex flex-col flex rounded-full bg-white dark:bg-sidebar text-sm font-medium text-base-800 shadow-[5px_0_20px_rgba(0,0,0,0.15)] shadow-base-800/5 dark:shadow-gray-600 h-12/20 px-2 py-3 justify-around items-center'
        >

          <ThemeToggle />

          <LanguageSwitch />

          <div
            className={`glitch border-1 shadow-lg bg-input rounded-full w-[2.5em] cursor-pointer ignore-close-kame ${kame ? 'bg-selecionado' : 'bg-input'}`}
            title={lang == 'pt' ? 'IA Kame' : 'Kame AI'}
            onContextMenu={(e) => {
              e.preventDefault();
              if (devMode) abreDev("kame");
            }}
            onClick={() => setKame((prev) => !prev)}
            onMouseEnter={() => lottieRefhover.current?.play()}
            onMouseLeave={() => {
              lottieRefhover.current?.stop();
              lottieRefhover.current?.goToAndStop(0, true);
            }}
          >
            <Lottie
              lottieRef={lottieRefhover}
              animationData={kameHover}
              loop={true}
              autoplay={false}
              style={{ width: 33, height: 60 }}
              className='scale-140'
            />
          </div>

          <div
            className={`glitch border-1 shadow-lg bg-input rounded-full w-[2.5em] cursor-pointer transition-all ease-in-out duration-300 ${devMode ? 'bg-selecionado' : 'bg-input'}`}
            title={lang == 'pt' ? 'Modo Dev' : 'Dev Mode'}
            onContextMenu={(e) => {
              e.preventDefault();
              if (devMode) abreDev("devmode");
            }}
            onClick={() => setDevMode((prev) => !prev)}
            onMouseEnter={() => lottieRefglass.current?.play()}
            onMouseLeave={() => {
              lottieRefglass.current?.stop();
              lottieRefglass.current?.goToAndStop(0, true);
            }}
          >
            <Lottie
              lottieRef={lottieRefglass}
              animationData={isDark ? glassesDark : glasses}
              loop={true}
              autoplay={false}
              style={{ width: 33, height: 60 }}
              className='scale-100'
            />
          </div>

          <div
            className={`glitch border-1 shadow-lg ${info ? 'bg-selecionado' : 'bg-input'} rounded-full w-[2.5em] cursor-pointer ignore-close transition-all ease-in-out duration-300`}
            title={lang == 'pt' ? 'Música e Infos' : 'Music and Information'}
            onContextMenu={(e) => {
              e.preventDefault();
              if (devMode) abreDev("musica");
            }}
            onClick={() => setInfo((prev) => !prev)}
            onMouseEnter={() => lottieRefmusic.current?.play()}
            onMouseLeave={() => {
              lottieRefmusic.current?.stop();
              lottieRefmusic.current?.goToAndStop(0, true);
            }}
          >
            <Lottie
              lottieRef={lottieRefmusic}
              animationData={isDark ? musicDark : music}
              loop={true}
              autoplay={false}
              style={{ width: 33, height: 60 }}
              className='scale-100'
            />
          </div>

        </motion.div>
        <header
          className={`fixed top-0 z-15 w-full flex justify-center pt-4 transition-transform duration-300 translate-y-0`}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="flex rounded-full text-sm font-medium bg-white dark:bg-sidebar shadow-[0_5px_20px_rgba(0,0,0,0.1)] shadow-base-800/5 dark:shadow-gray-600 w-3/10 px-3 py-2 justify-around"
          >

            <div
              onClick={() => scrollToSection("home")}
              className={`transition-all duration-200 ease-in-out py-1 rounded-full cursor-pointer flex items-center justify-center ${activeSection === "home"
                ? "scale-125 text-blue-500 dark:text-blue-300"
                : "hover:scale-110 hover:rotate-15"
                }`}
            >
              <House />
            </div>

            <div
              onClick={() => scrollToSection("code")}
              className={`transition-all duration-200 ease-in-out py-1 rounded-full cursor-pointer flex items-center justify-center ${activeSection === "code"
                ? "scale-125 text-blue-500 dark:text-blue-300"
                : "hover:scale-110 hover:rotate-15"
                }`}
            >
              <Code2 />
            </div>

            <div
              onClick={() => scrollToSection("projects")}
              className={`transition-all duration-200 ease-in-out py-1 rounded-full cursor-pointer flex items-center justify-center ${activeSection === "projects"
                ? "scale-125 text-blue-500 dark:text-blue-300"
                : "hover:scale-110 hover:rotate-15"
                }`}
            >
              <FolderGit2 />
            </div>

            <div
              onClick={() => scrollToSection("contact")}
              className={`transition-all duration-200 ease-in-out py-1 rounded-full cursor-pointer flex items-center justify-center ${activeSection === "contact"
                ? "scale-125 text-blue-500 dark:text-blue-300"
                : "hover:scale-110 hover:rotate-15"
                }`}
            >
              <MessageSquareMoreIcon />
            </div>
          </motion.div>
        </header>
        <main className='h-full'>
          {children}
        </main>
      </div>

      {tape && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center 
             bg-gradient-to-br from-[rgba(15,12,41,0.7)] via-[rgba(48,43,99,0.7)] to-[rgba(36,36,62,0.7)]
             animate-gradient backdrop-blur-md"
        >
          <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            {/* <Environment files="/hdr/studio_small_03_1k.hdr" background /> */}
            <CassetteModel onInsert={handleInsert} />
          </Canvas>
        </div>
      )}

      {doom && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center backdrop-blur-sm bg-black/60"
        >
          <PacMan />
          <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => setDoom(false)}
            className='cursor-pointer absolute top-10 right-10'
          >
            <X className='!w-8 !h-8' />
          </Button>
        </div>
      )}

      <Dialog open={devDialog} onOpenChange={setDevDialog}>
        <DialogContent
          onMouseEnter={() => setAttComp(attComp + 1)}
          className="bg-gradient-to-b from-background to-muted border-border/60 shadow-2xl backdrop-blur-md"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <img src="/gifs/rocket.png" alt="Foguete" className="w-10 h-10" />
              {lang === "en" ? "Dev Mode Activated" : "Modo Dev Ativado"}
            </DialogTitle>

            <DialogDescription className="text-muted-foreground leading-relaxed">
              {lang === "en" ? (
                <>
                  Welcome to <span className="font-semibold text-foreground">Dev Mode</span> —
                  a special mode of the portfolio where you can <b>explore the code</b> behind each part of this site.
                  <br /><br />
                  Whenever a component has this <span className="text-primary font-semibold">glitch effect</span>,
                  it means that its code can be revealed.
                  Right-click on it to see how it was made.
                </>
              ) : (
                <>
                  Bem-vindo ao <span className="font-semibold text-foreground">Modo Dev</span> —
                  um modo especial do portfólio onde você pode <b>explorar o código</b> por trás de cada parte deste site.
                  <br /><br />
                  Sempre que um componente estiver com esse <span className="text-primary font-semibold">efeito glitch</span>,
                  significa que ele tem um código revelável.
                  Clique com o <b>botão direito</b> sobre ele para ver como foi feito.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 text-center">
            <div className="transition-all ease-in-out duration-300">
              <Button
                onContextMenu={(e) => {
                  e.preventDefault();
                  abreDev("exemplo");
                }}
                className="glitch relative px-6 py-3 text-lg font-medium bg-card hover:bg-card/80 text-card-foreground shadow-md transition-all cursor-pointer"
              >
                {lang === "en" ? "Right-click!" : "Clique com o botão direito!"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {lang === "en"
                ? "(Works only on glitch components)"
                : "(Funciona apenas em componentes com glitch)"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {devCodeModal && (
        <Dialog open={devCodeModal} onOpenChange={setDevCodeModal}>
          <DialogContent className="!max-w-[60vw] bg-card">
            <DialogHeader>
              <DialogTitle>{lang == 'pt' ? 'Código' : 'Code'} {capitalize(devCode)}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className='w-[57vw]'>
              <CodeCard name={devCode} />
            </div>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}
