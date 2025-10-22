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

    useEffect(() => {
        setSkills(skillsData);
        setBiblioteca(bibliotecaData);
    }, []);

    const Render = () => (
        <img src="./biblioteca-icons/render.png" alt="Render" className="w-15 h-15" />
    )
    const FastAPI = () => (
        <img src="./biblioteca-icons/fastapi.png" alt="Fast API" className="w-10 h-10" />
    )
    const SimpleGUI = () => (
        <img src="./biblioteca-icons/pysimplegui.png" alt="Py Simple GUI" className="w-10 h-10" />
    )
    const Outros = () => (
        <img src="./biblioteca-icons/outros.png" alt="Outros" className="w-10 h-10" />
    )
    const APIsREST = () => (
        <img src="./biblioteca-icons/apirest.png" alt="API REST" className="w-10 h-10" />
    )
    const Tecnicas = () => (
        <img src="./biblioteca-icons/tecnicas.png" alt="Tecnicas" className="w-10 h-10" />
    )
    const Aplicacoes = () => (
        <img src="./biblioteca-icons/aplicacoes.png" alt="Aplicações" className="w-10 h-10" />
    )
    const Protecao = () => (
        <img src="./biblioteca-icons/protecao.png" alt="Proteção" className="w-10 h-10" />
    )
    const Pentest = () => (
        <img src="./biblioteca-icons/pentest.png" alt="Pentest" className="w-10 h-10" />
    )
    const Sistemas = () => (
        <img src="./biblioteca-icons/sistemas.png" alt="Sistemas Operacionais" className="w-10 h-10" />
    )

    const CustomIcons: Record<string, React.FC> = {
        Render, FastAPI, SimpleGUI, Outros, APIsREST, Tecnicas, Aplicacoes, Protecao, Pentest, Sistemas
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
                            className="flex flex-col items-center justify-center gap-6 w-full"
                        >
                            <motion.div
                                layoutId={selecionado}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.1 }}
                                className={`flex justify-center items-center gap-10 w-full py-10 ${skillsData.find((x) => x.categoria === selecionado)?.skills ? 'flex-wrap' : selecionado == 'Backend' || selecionado == 'IA' || selecionado == 'Segurança' ? 'flex-wrap px-6' : 'flex-row'}`}
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
                                            const Icone = CustomIcons[nomeIcone] || null;

                                            // gera cores únicas pros blocos (pode personalizar)
                                            const bgColors = [
                                                "from-indigo-500/10 to-indigo-800/10",
                                                "from-emerald-500/10 to-emerald-800/10",
                                                "from-rose-500/10 to-rose-800/10",
                                                "from-amber-500/10 to-amber-800/10",
                                                "from-sky-500/10 to-sky-800/10",
                                            ];
                                            const bgClass = bgColors[i % bgColors.length];

                                            return (
                                                <motion.div
                                                    key={i}
                                                    layout
                                                    className={`
                                                        ${selecionado == "IA" || selecionado == "Segurança" ? 'min-h-50 max-w-4/10' : selecionado == "Mobile" ? 'min-w-3/10' : ''}
                                                        flex-col
                                                        flex gap-4
                                                        items-start
                                                        rounded-2xl p-6 m-2
                                                        bg-gradient-to-br ${bgClass} 
                                                        border border-border shadow-lg
                                                        transition-all duration-300 hover:shadow-xl
                                                    `}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {isComponente && Icone ? (
                                                            <Icone />
                                                        ) : (
                                                            <img
                                                                className="w-8 h-8"
                                                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${valor}`}
                                                                alt={sub.nome}
                                                            />
                                                        )}
                                                        <h3 className="font-semibold text-lg flex flex-col">{sub.nome}</h3>
                                                    </div>

                                                    <div className={`flex flex-wrap gap-4 justify-center w-full`}>
                                                        {sub.skills.map((skill: string, j: number) => {

                                                            if(selecionado == "IA" || selecionado == "Segurança"){

                                                                return (
                                                                    <div
                                                                        key={j}
                                                                        className="px-4 py-2 text-xs rounded-xl bg-background/60 dark:bg-muted
                                                                            shadow-md flex flex-col items-center justify-center gap-2
                                                                            hover:shadow-xl hover:scale-105 transition-transform"
                                                                    >
                                                                        <span className="text-center">{skill}</span>
                                                                    </div>
                                                                );

                                                            } else {
                                                                const valorSkill = biblioteca[skill];
                                                                if (!valorSkill) return null;                                                         

                                                                const isComponenteSkill = valorSkill.startsWith("***");
                                                                const nomeIconeSkill = valorSkill.replaceAll("*", "");
                                                                const IconeSkill = CustomIcons[nomeIconeSkill] || null;

                                                                return (
                                                                    <div
                                                                        key={j}
                                                                        className="w-28 h-28 text-xs rounded-xl bg-background/60 dark:bg-muted
                                                                            shadow-md flex flex-col items-center justify-center gap-2
                                                                            hover:shadow-xl hover:scale-105 transition-transform"
                                                                    >
                                                                        {isComponenteSkill && IconeSkill ? (
                                                                            <IconeSkill />
                                                                        ) : (
                                                                            <img
                                                                                className="w-10 h-10"
                                                                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${valorSkill}`}
                                                                                alt={skill}
                                                                            />
                                                                        )}
                                                                        <span className="text-center">{skill}</span>
                                                                    </div>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                </motion.div>
                                            );
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
