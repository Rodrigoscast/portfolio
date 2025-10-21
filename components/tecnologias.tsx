"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import skillsData from "@/public/skills.json";
import bibliotecaData from "@/public/biblioteca.json";

import frontend from "@/public/icons/frontend.json";
import backend from "@/public/icons/backend.json";
import backendDark from "@/public/icons/backendDark.json";
import data from "@/public/icons/data.json";
import dataDark from "@/public/icons/dataDark.json";
import devops from "@/public/icons/devops.json";
import devopsDark from "@/public/icons/devopsDark.json";
import linguagem from "@/public/icons/linguagem.json";
import linguagemDark from "@/public/icons/linguagemDark.json";
import ferramentas from "@/public/icons/ferramentas.json";
import ferramentasDark from "@/public/icons/ferramentasDark.json";
import mobile from "@/public/icons/mobile.json";
import mobileDark from "@/public/icons/mobileDark.json";
import ia from "@/public/icons/ia.json";
import iaDark from "@/public/icons/iaDark.json";
import seguranca from "@/public/icons/seguranca.json";
import segurancaDark from "@/public/icons/segurancaDark.json";


interface Categoria {
    nome: string;
    ref: React.RefObject<LottieRefCurrentProps | null>;
    light: any;
    dark: any;
}

export default function Tecnologias({ visivel, ref }: { visivel: boolean, ref: any }) {
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    const [selecionado, setSelecionado] = useState<string | null>(null);
    const [skills, setSkills] = useState<any[]>([]);
    const [biblioteca, setBiblioteca] = useState<any>();
    const [firstLoad, setFirstLoad] = useState(true)

    const lottieRefront = useRef<LottieRefCurrentProps>(null);
    const lottieRefback = useRef<LottieRefCurrentProps>(null);
    const lottieRefdata = useRef<LottieRefCurrentProps>(null);
    const lottieRefdevs = useRef<LottieRefCurrentProps>(null);
    const lottieReflang = useRef<LottieRefCurrentProps>(null);
    const lottieReftool = useRef<LottieRefCurrentProps>(null);
    const lottieRefmobi = useRef<LottieRefCurrentProps>(null);
    const lottieRefmach = useRef<LottieRefCurrentProps>(null);
    const lottieRefsecu = useRef<LottieRefCurrentProps>(null);

    const categorias: Categoria[] = [
        { nome: "Frontend", ref: lottieRefront, light: frontend, dark: frontend },
        { nome: "Backend", ref: lottieRefback, light: backend, dark: backendDark },
        { nome: "Data", ref: lottieRefdata, light: data, dark: dataDark },
        { nome: "DevOps", ref: lottieRefdevs, light: devops, dark: devopsDark },
        { nome: "Linguagens", ref: lottieReflang, light: linguagem, dark: linguagemDark },
        { nome: "Ferramentas", ref: lottieReftool, light: ferramentas, dark: ferramentasDark },
        { nome: "Mobile", ref: lottieRefmobi, light: mobile, dark: mobileDark },
        { nome: "IA", ref: lottieRefmach, light: ia, dark: iaDark },
        { nome: "Segurança", ref: lottieRefsecu, light: seguranca, dark: segurancaDark },
    ];

    const Render = () => (
        <img src="./biblioteca-icons/render.png" alt="Render" className="w-15 h-15"  />
    )
    
    useEffect(() => {
        setSkills(skillsData);
        setBiblioteca(bibliotecaData);
    }, []);

    const CustomIcons: Record<string, React.FC> = {
        Render
    };

    let delay = 0.6

    return (
        <motion.div ref={ref} className="flex flex-col w-full items-center justify-start min-h-screen p-10 pt-10 overflow-hidden">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: firstLoad ? delay : 0, duration: 0.6, ease: "easeOut" }}
                layout
                className="font-bold text-3xl my-10 text-center transition-colors duration-500"
            >
                {selecionado
                    ? (
                        <div className="flex flex-row items-center gap-3">
                            <Lottie
                                lottieRef={categorias.find((item) => item.nome == selecionado)?.ref}
                                animationData={isDark ? categorias.find((item) => item.nome == selecionado)?.dark : categorias.find((item) => item.nome == selecionado)?.light}
                                loop={true}
                                autoplay={false}
                                style={{ width: 60, height: 60 }}
                            />
                            Tecnologias e habilidades com {selecionado}
                        </div>
                    ) : "Tecnologias e habilidades que aplico no meu dia a dia de desenvolvimento"}
            </motion.h1>

            <motion.div
                layout
                className="relative w-full flex items-center justify-center overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {!selecionado ? (
                        <motion.div
                            key="grid"
                            layout
                            className="flex flex-wrap justify-center items-center gap-10 w-full max-w-5xl py-10"
                        >
                            {categorias.map((cat, i) => {
                                delay = firstLoad ? delay + 0.1 : i * 0.1;
                                return (
                                    <motion.div
                                        key={cat.nome}
                                        layoutId={cat.nome}
                                        onClick={() => { setSelecionado(cat.nome); setFirstLoad(false) }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={
                                            visivel
                                                ? { opacity: 1, scale: 1 }
                                                : { opacity: 0, scale: 0 }
                                        }
                                        transition={{
                                            delay,
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 10
                                        }}
                                        onMouseEnter={() => cat.ref.current?.play()}
                                        onMouseLeave={() => {
                                            cat.ref.current?.stop();
                                            cat.ref.current?.goToAndStop(0, true);
                                        }}
                                        className="w-32 h-32 flex items-center justify-center rounded-full cursor-pointer
                                            bg-muted dark:bg-input font-medium text-sm shadow-md hover:scale-110 hover:bg-card dark:hover:bg-muted
                                            transition-all duration-300 ease-out"
                                    >
                                        <div className="flex flex-col items-center">
                                            <Lottie
                                                lottieRef={cat.ref}
                                                animationData={isDark ? cat.dark : cat.light}
                                                loop={true}
                                                autoplay={false}
                                                style={{ width: 65, height: 65 }}
                                            />
                                            <span className="text-base font-medium">{cat.nome}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detalhe"
                            layout
                            className="flex flex-col items-center justify-center gap-6"
                        >
                            <motion.div
                                layoutId={selecionado}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.1 }}
                                className="flex flex-wrap justify-center items-center gap-10 w-full py-10"
                                transition={{
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 10
                                }}
                            >
                                {skillsData.find((x) => x.categoria === selecionado)?.skills ? (
                                    // caso tenha skills diretas
                                    skillsData
                                        .find((x) => x.categoria === selecionado)
                                        ?.skills?.map((item, i) => {
                                            const valor = biblioteca[item];
                                            if (!valor) return null;

                                            const isComponente = valor.startsWith("***");
                                            const nomeIcone = valor.replaceAll("*", "");

                                            // tenta achar nos dois lugares
                                            const Icone =
                                                CustomIcons[nomeIcone] || null;

                                            return (
                                                <div
                                                    key={i}
                                                    className="w-30 h-30 text-sm rounded-full bg-input dark:bg-input shadow-lg flex flex-col items-center justify-center gap-2"
                                                >
                                                    {isComponente && Icone ? (
                                                        <Icone />
                                                    ) : (
                                                        <img
                                                        className="w-15 h-15"
                                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${valor}`}
                                                        alt={item}
                                                        />
                                                    )}
                                                    <span>{item}</span>
                                                </div>
                                            );
                                        })
                                ) : (
                                    // caso tenha subgrupos
                                    skillsData
                                        .find((x) => x.categoria === selecionado)
                                        ?.subgrupos?.map((sub, i) => {

                                            const valor = biblioteca[sub.nome];
                                            if (!valor) return null;

                                            const isComponente = valor.startsWith("***");
                                            const nomeIcone = valor.replaceAll("*", "");

                                            // tenta achar nos dois lugares
                                            const Icone =
                                                CustomIcons[nomeIcone] || null;

                                            return (
                                                <div key={i} className="mb-4">
                                                    <h3 className="font-semibold mb-2">{sub.nome}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {sub.skills.map((skill: string, j: number) => {
                                                            const valorSkill = biblioteca[skill];
                                                            if (!valorSkill) return null;

                                                            const isComponenteSkill = valorSkill.startsWith("***");
                                                            const nomeIconeSkill = valorSkill.replaceAll("*", "");

                                                            // tenta achar nos dois lugares
                                                            const IconeSkill =
                                                                CustomIcons[nomeIconeSkill] || null;
                                                            return(
                                                                <div
                                                                    key={j}
                                                                    className="w-30 h-30 text-sm rounded-full bg-input dark:bg-input shadow-lg flex flex-col items-center justify-center gap-2"
                                                                >
                                                                    {isComponenteSkill && IconeSkill ? (
                                                                        <IconeSkill />
                                                                    ) : (
                                                                        <img
                                                                            className="w-15 h-15"
                                                                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${valorSkill}`}
                                                                            alt={skill}
                                                                        />
                                                                    )}
                                                                    <span>{skill}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        })
                                )}

                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.1 }}
                                transition={{
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 10
                                }}
                                onClick={() => setSelecionado(null)}
                                className="flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 
                                    text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 
                                    hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-300 shadow cursor-pointer"
                            >
                                <ArrowLeft className="w-5 h-5" /> Voltar
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
