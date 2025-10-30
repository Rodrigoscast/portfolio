"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PowerGlitch } from "powerglitch";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type Projeto = {
    nome: string;
    descricao: string;
    tags: string[];
    link: string;
    host: string;
    imagem: string;
};

const ptProjects: Projeto[] = [
    {
        nome: "Eva - Solução Unimed",
        descricao:
            "Criado durante um hackathon de 24h, Eva é um sistema inteligente de agendamento médico com chatbots e IA. Possui cadastro de pacientes, login seguro, análise de imagens e leitura de PDFs para tornar o atendimento mais rápido e acessível.",
        tags: ["Next.js", "FastAPI", "Supabase", "Llama API"],
        link: "https://github.com/Rodrigoscast/hackaton-2025",
        host: "",
        imagem: "/img/eva.jpg",
    },
    {
        nome: "Sistema de Estoque Web",
        descricao:
            "Plataforma completa de controle de estoque, com entradas e saídas de peças, controle por projeto, produção por usuário, relatórios de compras, alertas de estoque baixo e dashboards analíticos com previsão de consumo.",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Python"],
        link: "https://github.com/Rodrigoscast/estoque-web",
        host: "",
        imagem: "/img/estoque.png",
    },
    {
        nome: "Ludoteca",
        descricao:
            "Reúne jogos clássicos como forca e jogo da velha em um só lugar — simples, divertida e nostálgica. Ideal para quem quer relaxar e testar o raciocínio de forma leve e acessível.",
        tags: ["Next.js", "Framer Motion", "Shadcn/UI", "TailwindCSS"],
        link: "https://github.com/Rodrigoscast/ludoteca",
        host: "https://my-ludoteca.netlify.app/",
        imagem: "/img/ludoteca.png",
    },
    {
        nome: "Portfólio",
        descricao:
            "Um portfólio interativo e dinâmico, criado para mostrar meus projetos e habilidades com animações modernas, efeitos e temas dinâmicos, consumo de APIs e muito mais. Possui easter eggs e interações em tempo real.",
        tags: ["Next.js", "Framer Motion", "Shadcn/UI", "TailwindCSS", "API"],
        link: "https://github.com/Rodrigoscast/portfolio",
        host: "https://rodrigoscastro.netlify.app/",
        imagem: "/img/portfolio.jpg",
    },
];

const enProjects: Projeto[] = [
    {
        nome: "Eva - Unimed Solution",
        descricao:
            "Developed during a 24-hour hackathon, Eva is an intelligent medical scheduling system powered by chatbots and AI. It includes patient registration, secure login, image analysis, and PDF reading for smarter and faster appointments.",
        tags: ["Next.js", "FastAPI", "Supabase", "Llama API"],
        link: "https://github.com/Rodrigoscast/hackaton-2025",
        host: "",
        imagem: "/img/eva.jpg",
    },
    {
        nome: "Web Inventory System",
        descricao:
            "A complete inventory management platform tracking item inflow and outflow, project-based control, user production, purchase reports, low-stock alerts, and full analytics dashboards with consumption forecasts.",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Python"],
        link: "https://github.com/Rodrigoscast/estoque-web",
        host: "",
        imagem: "/img/estoque.png",
    },
    {
        nome: "Ludoteca",
        descricao:
            "A collection of classic games like Hangman and Tic-Tac-Toe — simple, fun, and nostalgic. Perfect for those who want to relax and exercise their mind in an easy and accessible way.",
        tags: ["Next.js", "Framer Motion", "Shadcn/UI", "TailwindCSS"],
        link: "https://github.com/Rodrigoscast/ludoteca",
        host: "https://my-ludoteca.netlify.app/",
        imagem: "/img/ludoteca.png",
    },
    {
        nome: "Portfolio",
        descricao:
            "An interactive and dynamic portfolio designed to showcase my projects and skills through modern animations, visual effects, dynamic themes, API integrations, and more. It also features Easter eggs and real-time interactions.",
        tags: ["Next.js", "Framer Motion", "Shadcn/UI", "TailwindCSS", "API"],
        link: "https://github.com/Rodrigoscast/portfolio",
        host: "https://rodrigoscastro.netlify.app/",
        imagem: "/img/portfolio.jpg",
    },
];

export default function Projetos({
    visivel,
    ref,
}: {
    visivel: boolean;
    ref: any;
}) {
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";
    const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(
        null
    );
    const [modalProjeto, setModalProjeto] = useState(false);
    const { lang, abreDev, devMode } = useLanguage();

    useEffect(() => {
        if (devMode) {
            const glitch = PowerGlitch.glitch(".glitch", { playMode: "always" });
            return () => glitch.stopGlitch(); // cleanup
        }
    }, [devMode]);

    const projetos = lang == "pt" ? ptProjects : enProjects;

    return (
        <motion.div
            ref={ref}
            className="flex flex-col w-full items-center justify-start min-h-screen w-full p-10 pt-5 overflow-hidden"
        >
            {/* Título */}
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                layout
                className="font-bold text-3xl my-10 text-center transition-colors duration-500"
            >
                {lang == 'pt' ? 'Conheça alguns dos meus principais projetos' : 'Explore some of my featured projects'}
            </motion.h1>

            {/* Cards de projetos */}
            <div
                className={`grid grid-cols-1 grid-cols-2 gap-8 w-full px-20 ${devMode && ('glitch')}`}
                onContextMenu={(e) => {
                    e.preventDefault();
                    if (devMode) {
                        abreDev('projetos')
                    }
                }}
            >
                {projetos.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{
                            delay: 0.2 + (i * 0.15),
                            duration: 0.5,
                            type: "spring",
                            stiffness: 120,
                        }}
                        onClick={() => { setProjetoSelecionado(proj); setModalProjeto(true) }}
                        className="cursor-pointer bg-card border border-border rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-out flex flex-col hover:scale-105"
                    >
                        {/* Imagem do projeto */}
                        <div className="relative w-full h-56 overflow-hidden group">
                            <motion.img
                                src={proj.imagem}
                                alt={proj.nome}
                                className="object-cover w-full h-full transition-all duration-700 ease-out hover:scale-115 hover:rotate-3"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                            {/* Tags */}
                            <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                                {proj.tags.map((tag, j) => (
                                    <span
                                        key={j}
                                        className="text-[11px] bg-card/80 backdrop-blur-sm px-2 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* Corpo do card */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
                                bg-card/80 backdrop-blur-sm
                                px-4 py-2 rounded-xl flex flex-col items-center 
                                w-[95%] text-center shadow-md"
                            >
                                <h3 className="font-semibold text-lg">{proj.nome}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {projetoSelecionado && modalProjeto && (
                <Dialog open={modalProjeto} onOpenChange={setModalProjeto}>
                    <DialogContent>
                        <DialogHeader>
                            {/* Imagem grande */}
                            <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                                <img
                                    src={projetoSelecionado.imagem}
                                    alt={projetoSelecionado.nome}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <DialogTitle className="text-2xl font-bold mb-3">
                                {projetoSelecionado.nome}
                            </DialogTitle>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {projetoSelecionado.tags.map((tag, j) => (
                                    <span
                                        key={j}
                                        className="text-xs bg-muted dark:bg-muted/40 px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground mb-6">
                                {projetoSelecionado.descricao}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-row items-center w-full justify-between">
                            <a
                                href={projetoSelecionado.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
                            >
                                <Code size={18} />
                                Acessar Código
                            </a>
                            {projetoSelecionado.host != '' && (
                                <a
                                    href={projetoSelecionado.host}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
                                >
                                    <ExternalLink size={18} />
                                    Acessar Projeto
                                </a>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </motion.div>
    );
}
