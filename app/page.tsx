"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useClima } from "@/hooks/useClima";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import {
  MapPin, ChevronLeft, ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  Play, Pause, SkipBack, SkipForward, List, Volume2, VolumeX,
  ListMusic, Guitar, Coffee, Music, Disc3
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import AnimatedBorder from "@/components/AnimatedBorder";
import Tecnologias from "@/components/tecnologias";
import Projetos from "@/components/Projetos";
import FaleComigo from "@/components/FaleComigo";
import ChatKame from "@/components/ChatKame";

import github from "@/public/icons/github.json";
import githubDark from "@/public/icons/github-dark.json";
import linkedin from "@/public/icons/linkedin.json";
import linkedinDark from "@/public/icons/linkedin-dark.json";
import docs from "@/public/icons/docs.json";
import docsDark from "@/public/icons/docs-dark.json";
import { Card, CardContent } from "@/components/ui/card";
import { TypeAnimation } from 'react-type-animation';
import kameReveal from "@/public/icons/kame-reveal.json";
import { PowerGlitch } from "powerglitch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { theme, systemTheme } = useTheme();
  const { lang, sequence, setSequence, info, setInfo, kame, setKame, devMode, setDevMode, 
          abreDev, devCode, setDevCode, devCodeModal, setDevCodeModal 
  } = useLanguage();  
  const { clima, erro, loading, dataHora } = useClima();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { ref: refTech, isVisible: techVisible } = useInView(0.2);
  const { ref: refProj, isVisible: projVisible } = useInView(0.2);
  const { ref: refContato, isVisible: contatoVisible } = useInView(0.2);

  const [dica, setDica] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [text, setText] = useState(false)
  const [showzinho, setShowzinho] = useState(false)

  const lottieRefGit = useRef<LottieRefCurrentProps>(null);
  const lottieRefLin = useRef<LottieRefCurrentProps>(null);
  const lottieRefDoc = useRef<LottieRefCurrentProps>(null);

  const lottieRefreveal = useRef<LottieRefCurrentProps>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const refSecret = useRef<HTMLDivElement>(null);
  const refInfos = useRef<HTMLDivElement>(null);
  const refKame = useRef<HTMLDivElement>(null);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    if (devMode) {
      const glitch = PowerGlitch.glitch(".glitch", { playMode: "always" });
      return () => glitch.stopGlitch(); // cleanup
    }
  }, [devMode, devCode]);

  const playlists = {
    [lang === "pt" ? "todos" : "all"]: [
      { title: "Good Night", artist: "BoDleasons", src: "/musics/lofi/Good_Night.mp3" },
      { title: "Japan Lofi", artist: "FASSounds", src: "/musics/lofi/Japan_Lofi.mp3" },
      { title: "Rainy City", artist: "lofidreams", src: "/musics/lofi/Rainy_City.mp3" },
      { title: "Smooth Chill", artist: "FASSounds", src: "/musics/lofi/Smooth_Chill.mp3" },
    ],
    'lofi': [
      { title: "Good Night", artist: "BoDleasons", src: "/musics/lofi/Good_Night.mp3" },
      { title: "Japan Lofi", artist: "FASSounds", src: "/musics/lofi/Japan_Lofi.mp3" },
      { title: "Rainy City", artist: "lofidreams", src: "/musics/lofi/Rainy_City.mp3" },
      { title: "Smooth Chill", artist: "FASSounds", src: "/musics/lofi/Smooth_Chill.mp3" },
    ],
    'rock': [
      { title: "Commercial Upbeat", artist: "Top-Flow", src: "/musics/rock1.mp3" },
      { title: "Happy Rock", artist: "Top-Flow", src: "/musics/rock2.mp3" },
      { title: "Stomping Rock", artist: "AlexGrohl", src: "/musics/rock2.mp3" },
      { title: "Whistle Joyride", artist: "Top-Flow", src: "/musics/rock2.mp3" },
    ]
  };

  const playlistIcons = {
    'todos': <Disc3 className="text-amber-400" size={18} />,
    'all': <Disc3 className="text-amber-400" size={18} />,
    'rock': <Guitar className="text-amber-400" size={18} />,
    'lofi': <Coffee className="text-amber-400" size={18} />,
  } as const;

  const [playlistAtual, setPlaylistAtual] = useState<keyof typeof playlists>("todos");
  const [tracks, setTracks] = useState(playlists["todos"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  function handlePlaylistChange(nova: keyof typeof playlists) {
    setPlaylistAtual(nova);
    setTracks(playlists[nova]);
    setCurrentIndex(0);

    // troca a música atual imediatamente
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlists[nova][0].src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const playTrack = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    if(!audioRef.current) return;
    
    if (!audioRef.current.src){
      audioRef.current.src = tracks[currentIndex].src;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentIndex + 1) % tracks.length;
    playTrack(next);
    if(isPlaying && !info) {
      setShowzinho(true)
      setTimeout(() => {
        setShowzinho(false)
      }, 5000);
    }
  };

  const prevTrack = () => {
    const prev = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prev);
  };

  const getWeatherIcon = () => {
    if (!clima?.descricao) return <img src="/gifs/sol.png" alt="Ensolarado" className="w-18 h-18" />;

    const desc = clima.descricao.toLowerCase();
    if (desc.includes("garoa") || desc == 'Chuva leve' || desc == 'Chuva moderada') return <img src="/gifs/chuva.png" alt="Garoa e Chuva leve" className="w-18 h-18" />;
    if (desc.includes("pancadas") || desc.includes("chuva")) return <img src="/gifs/chuva-forte.png" alt="Chuva Forte" className="w-18 h-18" />;
    if (desc == "Trovoadas com granizo grande") return <img src="/gifs/granizo.png" alt="Granizo" className="w-18 h-18" />;
    if (desc.includes("trovoadas")) return <img src="/gifs/tempestade.png" alt="Trovoada" className="w-18 h-18" />;
    if (desc.includes("neve")) return <img src="/gifs/neve.png" alt="Neve" className="w-18 h-18" />;
    if (desc.includes("nublado")) return <img src="/gifs/nublado.png" alt="Nublado" className="w-18 h-18" />;
    if (desc == "Neblina" || desc == "Névoa") return <img src="/gifs/nevoa.png" alt="Neblina" className="w-18 h-18" />;
    return <img src="/gifs/sol.png" alt="Ensolarado" className="w-18 h-18" />;
  };

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement

      if (
        target.closest(".ignore-close") ||
        target.closest("[data-radix-popper-content-wrapper]")
      ) {
        return;
      }

      if (refInfos.current && !refInfos.current.contains(event.target as Node)) {
        setInfo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setInfo]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement

      if (
        target.closest(".ignore-close-kame")
      ) {
        return;
      }

      if (refKame.current && !refKame.current.contains(event.target as Node)) {
        setKame(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setKame]);

  useEffect(() => {
    if(!lottieRefreveal) return;

    if(kame){
      setTimeout(() => {
        lottieRefreveal?.current?.play()
      }, 1000);
    } else {
      lottieRefreveal.current?.stop();
      lottieRefreveal.current?.goToAndStop(0, true);
    }
  }, [kame])

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
              key={lang}
              sequence={[
                500,
                `${lang === "pt" ? "Olá, sou o Rodrigo!" : "Hey, I'm Rodrigo!"}`,           // Português
                1000,
                `${lang === "pt" ? "Hey, I'm Rodrigo!" : "Olá, sou o Rodrigo!"}`,             // Inglês
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
                : "I’m a software developer passionate about technology and turning ideas into real solutions. I’m currently pursuing a degree in Software Engineering, which allows me to combine theory and practice to build complete, secure, and high-performance applications."}
            </motion.p>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {lang === "pt"
                ? "Meu foco é desenvolver sistemas robustos e escaláveis — do planejamento ao deploy — sempre com atenção à qualidade, segurança e experiência do usuário. Busco constantemente desafios que me permitam evoluir como profissional e contribuir para equipes que valorizem inovação, eficiência e propósito no que fazem."
                : "EMy focus is on developing robust and scalable systems — from planning to deployment — with a strong emphasis on quality, security, and user experience. I’m constantly seeking challenges that help me grow as a professional and contribute to teams that value innovation, efficiency, and purpose in everything they do."}
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
            <Tecnologias visivel={techVisible} ref={refTech} />
          </div>
        </section>

        <section
          className="text-foreground flex items-center justify-center min-h-screen"
          id="projects"
        >
          <div className="w-full h-full" >
            <Projetos visivel={projVisible} ref={refProj} />
          </div>
        </section>

        <section
          className="text-foreground flex items-start justify-center min-h-screen relative"
          id="contact"
        >
          <div className="w-full h-full" >
            <FaleComigo visivel={contatoVisible} ref={refContato} />
          </div>

          <motion.div
            ref={refSecret}
            initial={{ opacity: 0, x: 30 }}
            animate={contatoVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
            onContextMenu={(e) => {
              e.preventDefault();
              if(devMode) abreDev("secret");
            }}
            className={`absolute ${dica ? 'w-70' : 'w-10'} right-0 bottom-25 transition-all duration-300 ease-in-out z-10 glitch`}
          >
            <div className="bg-[#FAEDCF] dark:bg-[#3F2F07] rounded-l-lg p-2 flex flex-row cursor-pointer" onClick={() => setDica(!dica)}>
              <ChevronLeft className={`${dica && 'rotate-180'} transition-all duration-300 ease-in-out`} />
              {dica && (
                <div className="flex flex-row text-sm items-center gap-3 ml-2">
                  <p className="font-semibold">{lang === 'pt' ? 'Segredo' : 'Secret'}: </p>
                  <div className="flex flex-row items-center gap-1">
                    <ArrowUp size={12} className={`${sequence.length >= 1 && ('text-green-400')}`} />
                    <ArrowUp size={12} className={`${sequence.length >= 2 && ('text-green-400')}`} />
                    <ArrowDown size={12} className={`${sequence.length >= 3 && ('text-green-400')}`} />
                    <ArrowDown size={12} className={`${sequence.length >= 4 && ('text-green-400')}`} />
                    <ArrowLeft size={12} className={`${sequence.length >= 5 && ('text-green-400')}`} />
                    <ArrowRight size={12} className={`${sequence.length >= 6 && ('text-green-400')}`} />
                    <ArrowLeft size={12} className={`${sequence.length >= 7 && ('text-green-400')}`} />
                    <ArrowRight size={12} className={`${sequence.length >= 8 && ('text-green-400')}`} />
                    <p className={`${sequence.length >= 9 ? 'text-green-400 border-green-400' : 'border-black dark:border-white'} text-[11px] border-1 rounded-full w-3.5 h-3.5 flex items-center justify-center`}>B</p>
                    <p className={`${sequence.length >= 10 ? 'text-green-400 border-green-400' : 'border-black dark:border-white'} text-[11px] border-1 border-black rounded-full w-3.5 h-3.5 flex items-center justify-center`}>A</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        <motion.div
          ref={refInfos}
          initial={{ opacity: 0, y: 400 }}
          animate={info ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-foreground px-6 absolute bottom-0 right-14 z-13"
        >
          {loading ? (
            <div>Carregando...</div>
          ) : erro ? (
            <div>{erro}</div>
          ) : (
            <>
              <Card className="bg-card/60 border-border w-75 max-w-md shadow-xl rounded-t-2xl rounded-b-none backdrop-blur-md p-6 text-center">
                <CardContent className="flex flex-col items-center gap-4">
                  {/* 🌦 Ícone + clima */}
                  <div className="flex flex-col w-full gap-3">
                    <div className="flex flex-row gap-2 w-full items-center">
                      <div className="w-full flex flex-col text-left">
                        <h2 className="text-5xl font-semibold text-left">{clima.temperatura}°</h2>
                        <p className="text-base font-bold mt-2">{lang == 'pt' ? clima.descricao : clima.descricaoEng}</p>
                      </div>
                      {getWeatherIcon()}
                    </div>

                    <div className="flex flex-row w-full items-center justify-center gap-1">
                      <p className="text-muted-foreground">
                        {clima.cidade} - {clima.estado}, {clima.pais}
                      </p>
                      <MapPin className="text-muted-foreground" size={16} />
                    </div>
                  </div>

                  {/* ⏰ Data/Hora estilizada */}
                  <div className="flex w-full flex-col">
                    {lang == 'pt' ? (
                      <p className="text-6xl tracking-widest text-amber-400 font-extralight font-exo">{dataHora.hora}</p>
                    ) : (
                      <div className="flex flex-row items-end justify-center w-full">
                        <p className="w-7" />
                        <p className="text-5xl tracking-widest text-amber-400 font-extralight font-exo">{dataHora.hora.replace('PM', '').replace('AM', '')}</p>
                        <p className="w-7 tracking-widest text-amber-400 font-extralight font-exo">{dataHora.hora.includes('PM') ? 'PM' : 'AM'}</p>
                      </div>
                    )}
                    <p className="text-lg font-light text-muted-foreground">{dataHora.data.replace('.', '')}</p>
                  </div>

                  <div className="border-t-1 w-full" />

                  {/* 🎶 Player */}
                  <div className="my-2 flex flex-col items-center gap-3">
                    <p className="text-sm text-muted-foreground">
                      {tracks[currentIndex].title} - {tracks[currentIndex].artist}
                    </p>
                    <div className="flex w-full items-center flex-row gap-3">
                      <Select
                        onValueChange={(value) => handlePlaylistChange(value as keyof typeof playlists)}
                        value={String(playlistAtual)}
                      >
                        <SelectTrigger
                          className="p-1 w-12 hover:scale-110 transition-all duration-300 cursor-pointer"
                          title="Playlist"
                        >
                          {playlistIcons[playlistAtual as keyof typeof playlistIcons] || <ListMusic className="text-amber-400" size={18} />}
                        </SelectTrigger>

                        <SelectContent>
                          {Object.keys(playlists).map((key) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className={`capitalize ${
                                playlistAtual === key ? "text-amber-400 font-semibold" : ""
                              }`}
                            >
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <button
                        onClick={prevTrack}
                        className="p-2 hover:scale-110 transition-all duration-300 ease-out cursor-pointer"
                        title={lang == 'pt' ? "Anterior" : "Previous"}
                      >
                        <SkipBack />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-amber-400 rounded-full hover:scale-110 transition-all duration-300 ease-out shadow-md cursor-pointer flex items-center justify-center"
                        title={isPlaying ? lang == 'pt'? "Pausar" : "Pause" : lang == 'pt' ? "Tocar" : "Play"}
                      >
                        {isPlaying ? <Pause className="text-background" /> : <Play className="text-background" />}
                      </button>

                      <button
                        onClick={nextTrack}
                        className="p-2 hover:scale-110 transition-all duration-300 ease-out cursor-pointer"
                        title={lang == 'pt' ? "Próxima" : "Next"}
                      >
                        <SkipForward />
                      </button>

                      {/* Controle de volume */}
                      <div 
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={() => setShowVolume(false)}
                        className="flex w-12 items-center justify-center flex-col relative"
                      >
                        <button
                          onClick={() => setIsMuted((prev) => !prev)}                          
                          className={`w-7 h-7 flex items-center justify-center transition-all duration-300 cursor-pointer rounded-b-lg border-x-1 border-b-1 ${showVolume ? 'bg-card' : 'border-transparent'}`}
                          title={lang == 'pt' ? (isMuted ? "Ativar som" : "Silenciar") : (isMuted ? "Unmute" : "Mute")}
                        >
                          {isMuted ? (
                            <VolumeX className="text-muted-foreground" size={18} />
                          ) : (
                            <Volume2 className="text-muted-foreground" size={18} />
                          )}
                        </button>

                        <div
                          className={`absolute rotate-[-90deg] -top-22 px-2 rounded-r-lg h-7 w-38 cursor-pointer transition-all duration-300 border-y-1 border-r-1 flex items-center justify-center bg-card ${
                            !showVolume && "opacity-0 pointer-events-none"
                          }`}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                              const vol = parseFloat(e.target.value);
                              setVolume(vol);
                              if (vol > 0) setIsMuted(false);
                              if (audioRef.current) audioRef.current.volume = vol;
                            }}
                            style={{
                              "--fill-width": `${(isMuted ? 0 : volume) * 100}%`,
                            } as React.CSSProperties}
                            className="cursor-pointer transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <audio ref={audioRef} onEnded={nextTrack} preload="auto" />
            </>
          )}
        </motion.div>

        <ChatKame />
        
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={ (isPlaying && !info) ? ( showzinho ? { opacity: 1, width: 300 } : { opacity: 1, width: 65 }) : { opacity: 0, width: 0 }}
          whileHover={{width: 300}}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          onMouseEnter={() => setText(true)}
          onMouseLeave={() => setText(false)}
          className="absolute bottom-5 right-0 bg-blue-300 dark:bg-muted h-15 z-13 shadow-[-10px_5px_35px_rgba(0,0,0,0.15)] rounded-l-full flex items-center justify-start p-3"
        >
          <div className="flex flex-row gap-4 relative w-full">
            <img src="/gifs/disco.png" alt="Disco" className="w-10 h-10 animate-slow-spin" />
              <motion.div
                initial={{ opacity: 0, x: 40}}
                animate={(text || showzinho) ? { opacity: 1, x: 0} : { opacity: 0, x: 40}}
                transition={{ delay: (text || showzinho) ? 0.8 : 0, duration: (text || showzinho) ? 0.6 : 0.4, ease: "easeOut" }}
                className="absolute left-15"
              >
                <p className="text-xs">{lang == 'pt' ? 'Tocando Agora:' : 'Playing Now:'}</p>
                <p>{tracks[currentIndex]?.title} - {tracks[currentIndex]?.artist}</p>
              </motion.div>           
          </div>
        </motion.div>
      </ScrollArea>
    </main>
  );
}
