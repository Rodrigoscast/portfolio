"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { MapPin, ChevronLeft, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import AnimatedBorder from "@/components/AnimatedBorder";
import Tecnologias from "@/components/tecnologias";
import Projetos from "@/components/Projetos";
import FaleComigo from "@/components/FaleComigo";
import InfoArea from "@/components/MusicPlayer";

import github from "@/public/icons/github.json";
import githubDark from "@/public/icons/github-dark.json";
import linkedin from "@/public/icons/linkedin.json";
import linkedinDark from "@/public/icons/linkedin-dark.json";
import docs from "@/public/icons/docs.json";
import docsDark from "@/public/icons/docs-dark.json";

import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { theme, systemTheme } = useTheme();
  const { lang, sequence } = useLanguage();
  const { ref, isVisible } = useInView(0.2);
  const [dica, setDica] = useState(false)

  const lottieRefGit = useRef<LottieRefCurrentProps>(null);
  const lottieRefLin = useRef<LottieRefCurrentProps>(null);
  const lottieRefDoc = useRef<LottieRefCurrentProps>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const refSecret = useRef<HTMLDivElement>(null);

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (refSecret.current && !refSecret.current.contains(event.target as Node)) {
        setDica(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDica]);

  let title = lang === "pt" ? "Olá, eu sou o Rodrigo!" : "Hey, I'm Rodrigo!"

  return (
    <main className="relative min-h-screen bg-background overflow-hidden transition-colors duration-300">
      {/* Glow que segue o mouse */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 300}px, ${position.y - 300}px)`,
          background:
            "radial-gradient(circle at center, var(--gradient-glow-from), var(--gradient-glow-to) 70%, transparent 100%)",
        }}
      />
      <AnimatedBorder />
      <ScrollArea ref={scrollRef} className="m-9 h-[calc(100vh-4.5rem)] scrollbar-hidden">
        <section
          id="home"
          className="text-foreground flex items-center justify-center h-[calc(100vh-4.5rem)] relative"
        >

          {/* Conteúdo principal com animação */}
          <motion.div
            className="relative z-10 w-8/10 px-6 py-20 text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >

            <TypeAnimation
              sequence={[
                500,
                "Olá, sou o Rodrigo!",           // Português
                1000,
                "Hey, I'm Rodrigo!",             // Inglês
                1000,
                "¡Hola, soy Rodrigo!",           // Espanhol
                1000,
                "Salut, je suis Rodrigo!",       // Francês
                1000,
                "Ciao, sono Rodrigo!",           // Italiano
                1000,
                "Hallo, ich bin Rodrigo!",       // Alemão
                1000,
                "こんにちは、ロドリゴです！",      // Japonês
                1000,
                `${lang === "pt" ? "Olá, sou o Rodrigo!" : "Hey, I'm Rodrigo!"}`
              ]}
              wrapper="span"
              speed={50}
              className="text-5xl sm:text-6xl font-extrabold text-primary"
            />

            <motion.div
              className="flex flex-row items-center gap-1 mt-4 mb-6"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <MapPin />
              <p className="text-sm text-muted-foreground">
                {lang === "pt" ? "Brasil" : "Brazil"}
              </p>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {lang === "pt"
                ? "Sou um desenvolvedor de software apaixonado por tecnologia e por transformar ideias em soluções reais. Atualmente curso Engenharia de Software, o que me permite unir teoria e prática para criar aplicações completas, seguras e com foco em performance."
                : "A programmer passionate about technology, specialized in turning coffee into functional code. Always looking for creative challenges, elegant solutions, and bugs that mysteriously vanish when someone looks at my screen."}
            </motion.p>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {lang === "pt"
                ? "Meu foco é desenvolver sistemas robustos e escaláveis — do planejamento ao deploy — sempre com atenção à qualidade, segurança e experiência do usuário. Busco constantemente desafios que me permitam evoluir como profissional e contribuir para equipes que valorizem inovação, eficiência e propósito no que fazem."
                : "Explore my portfolio and, if you want to see what’s behind it, right-click on any component. That way, you can view the code used to build it — after all, transparency and learning walk hand in hand here."}
            </motion.p>

            {/* Ícones com delay suave */}
            <div className="flex gap-4">
              <motion.div
                className="flex items-center gap-4 mt-10 text-muted-foreground"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <a
                  href="https://github.com/Rodrigoscast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 cursor-pointer"
                  onMouseEnter={() => lottieRefGit.current?.play()}
                  onMouseLeave={() => {
                    lottieRefGit.current?.stop();
                    lottieRefGit.current?.goToAndStop(0, true);
                  }}
                >
                  <Lottie
                    lottieRef={lottieRefGit}
                    animationData={isDark ? githubDark : github}
                    loop={false}
                    autoplay={false}
                  />
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 mt-10 text-muted-foreground"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <a
                  href="https://www.linkedin.com/in/rodrigo-castro-b09847243/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 cursor-pointer"
                  onMouseEnter={() => lottieRefLin.current?.play()}
                  onMouseLeave={() => {
                    lottieRefLin.current?.stop();
                    lottieRefLin.current?.goToAndStop(0, true);
                  }}
                >
                  <Lottie
                    lottieRef={lottieRefLin}
                    animationData={isDark ? linkedinDark : linkedin}
                    loop={false}
                    autoplay={false}
                  />
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 mt-10 text-muted-foreground"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              >
                <a
                  href="cardapio.pdf"
                  download="rodrigo_castro.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 cursor-pointer"
                  onMouseEnter={() => lottieRefDoc.current?.play()}
                  onMouseLeave={() => {
                    lottieRefDoc.current?.stop();
                    lottieRefDoc.current?.goToAndStop(0, true);
                  }}
                >
                  <Lottie
                    lottieRef={lottieRefDoc}
                    animationData={isDark ? docsDark : docs}
                    loop={false}
                    autoplay={false}
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section
          className="text-foreground flex items-center justify-center min-h-screen"
          id="code"
        >
          <div className="w-full h-full" >
            <Tecnologias visivel={isVisible} ref={ref} />
          </div>
        </section>

        <section
          className="text-foreground flex items-center justify-center min-h-screen"
          id="projects"
        >
          <div className="w-full h-full" >
            <Projetos visivel={isVisible} ref={ref} />
          </div>
        </section>

        <section
          className="text-foreground flex items-start justify-center min-h-screen relative"
          id="contact"
        >
          <div className="w-full h-full" >
            <FaleComigo visivel={isVisible} ref={ref} />
          </div>
          <div
            ref={refSecret} 
            className={`absolute ${dica ? 'w-70' : 'w-10'} right-0 bottom-12 transition-all duration-300 ease-in-out`}
          >
            <div className="bg-[#FAEDCF] dark:bg-[#3F2F07] rounded-l-lg p-2 flex flex-row cursor-pointer" onClick={() => setDica(!dica)}>
              <ChevronLeft className={`${dica && 'rotate-180'} transition-all duration-300 ease-in-out`} />
              {dica && (
                <div className="flex flex-row text-sm items-center gap-3 ml-2">
                  <p className="font-semibold">Secret: </p>
                  <div className="flex flex-row items-center gap-1">
                    <ArrowUp size={12} className={`${sequence.length >= 1 && ('text-green-400')}`} />
                    <ArrowUp size={12} className={`${sequence.length >= 2 && ('text-green-400')}`} />
                    <ArrowDown size={12} className={`${sequence.length >= 3 && ('text-green-400')}`} />
                    <ArrowDown size={12} className={`${sequence.length >= 4 && ('text-green-400')}`} />
                    <ArrowLeft size={12} className={`${sequence.length >= 5 && ('text-green-400')}`} />
                    <ArrowRight size={12} className={`${sequence.length >= 6 && ('text-green-400')}`} />
                    <ArrowLeft size={12} className={`${sequence.length >= 7 && ('text-green-400')}`} />
                    <ArrowRight size={12} className={`${sequence.length >= 8 && ('text-green-400')}`} />
                    <p className={`${sequence.length >= 9 ? 'text-green-400 border-green-400' : 'border-black'} text-[11px] border-1 rounded-full w-3.5 h-3.5 flex items-center justify-center`}>B</p>
                    <p className={`${sequence.length >= 10 ? 'text-green-400 border-green-400': 'border-black'} text-[11px] border-1 border-black rounded-full w-3.5 h-3.5 flex items-center justify-center`}>A</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          className="text-foreground flex items-center justify-center h-[90vh]"
          id="music"
        >
          <div className="w-full h-full" >
            <InfoArea />
          </div>
        </section>
      </ScrollArea>
    </main>
  );
}
