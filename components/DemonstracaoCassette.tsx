"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
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
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import kameHover from "@/public/icons/kame-hover.json";
import glasses from "@/public/icons/linguagem.json";
import glassesDark from "@/public/icons/linguagemDark.json";

import music from "@/public/icons/music.json"
import musicDark from "@/public/icons/music-dark.json"
import {
    ChevronLeft, ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
} from "lucide-react";

import { PowerGlitch } from "powerglitch";

export default function Home() {
    const { sequence, setSequence, devMode, setDevMode, abreDev, devCode, setDevCode } = useLanguage();
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [tape, setTape] = useState(false)
    const [doom, setDoom] = useState(false)

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
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [dica, setDica] = useState(false)
    const refSecret = useRef<HTMLDivElement>(null);

    const { ref: refContato, isVisible: contatoVisible } = useInView(0.2);

    useEffect(() => {
        if (devMode) {
            const glitch = PowerGlitch.glitch(".glitch", { playMode: "always" });
            return () => glitch.stopGlitch(); // cleanup
        }
    }, [devMode, devCode]);

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

    return (
        <main className="relative min-h-screen bg-background overflow-hidden transition-colors duration-300">
            <motion.div
                ref={refSecret}
                initial={{ opacity: 0, x: 30 }}
                animate={contatoVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    if (devMode) abreDev("secret");
                }}
                className={`absolute ${dica ? 'w-70' : 'w-10'} right-0 bottom-25 transition-all duration-300 ease-in-out z-10 glitch`}
            >
                <div className="bg-[#FAEDCF] dark:bg-[#3F2F07] rounded-l-lg p-2 flex flex-row cursor-pointer" onClick={() => setDica(!dica)}>
                    <ChevronLeft className={`${dica && 'rotate-180'} transition-all duration-300 ease-in-out`} />
                    {dica && (
                        <div className="flex flex-row text-sm items-center gap-3 ml-2">
                            <p className="font-semibold">Segredo: </p>
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

            {tape && (
                <div
                    className="fixed inset-0 z-[999999] flex items-center justify-center backdrop-blur-sm bg-black/60"
                >
                    <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <Environment preset="studio" />
                        <CassetteModel onInsert={handleInsert} />
                    </Canvas>
                </div>
            )}

            {doom && (
                <div
                    className="fixed inset-0 z-[999999] flex items-center justify-center backdrop-blur-sm bg-black/60"
                >
                    <h1>Rodando Doom</h1>
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
        </main>
    );
}
