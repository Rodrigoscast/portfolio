"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

type Projeto = {
    nome: string;
    descricao: string;
    tags: string[];
    link: string;
    imagem: string;
};

const projetos: Projeto[] = [
    {
        nome: "Brasil Empreendimentos",
        descricao:
            "Aplicativo de controle de contratos e parcelas em aberto, desenvolvido em React Native com backend em Node.js e banco PostgreSQL.",
        tags: ["React Native", "Node.js", "PostgreSQL"],
        link: "https://play.google.com/store/apps/details?id=br.com.brasilempreendimentos",
        imagem: "/img/imagem-sample.jpg",
    },
    {
        nome: "Sistema de Estoque Web",
        descricao:
            "Sistema completo de controle de estoque com relatórios e BI, construído em Next.js e integrado ao backend em FastAPI com PostgreSQL.",
        tags: ["Next.js", "FastAPI", "PostgreSQL"],
        link: "https://estoque-demo.vercel.app/",
        imagem: "/img/imagem-sample.jpg",
    },
    {
        nome: "Guarita Digital",
        descricao:
            "Sistema de controle de entrada e saída de veículos com autenticação JWT, integração com banco de dados e design responsivo.",
        tags: ["Next.js", "Node.js", "JWT"],
        link: "https://guarita.vercel.app/",
        imagem: "/img/imagem-sample.jpg",
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

    return (
        <motion.div
            ref={ref}
            className="flex flex-col w-full items-center justify-start min-h-screen p-10 pt-5 overflow-hidden"
        >
            {/* Título */}
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                layout
                className="font-bold text-3xl my-10 text-center transition-colors duration-500"
            >
                Conheça alguns dos meus principais projetos
            </motion.h1>

            {/* Cards de projetos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
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
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setProjetoSelecionado(proj)}
                        className="cursor-pointer bg-card border border-border rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col"
                    >
                        {/* Imagem do projeto */}
                        <div className="relative w-full h-56 overflow-hidden group">
                            <motion.img
                                src={proj.imagem}
                                alt={proj.nome}
                                className="object-cover w-full h-full transition-transform duration-700 ease-out"
                                whileHover={{ scale: 1.1, rotate: 1.5 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                            {/* Tags */}
                            <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                                {proj.tags.map((tag, j) => (
                                    <span
                                        key={j}
                                        className="text-[11px] bg-card/60 backdrop-blur-sm px-2 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* Corpo do card */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
                                bg-card/40 backdrop-blur-sm
                                px-4 py-2 rounded-xl flex flex-col items-center 
                                w-[95%] text-center shadow-md"
                            >
                                <h3 className="font-semibold text-lg">{proj.nome}</h3>
                            </div>
                        </div>                        
                    </motion.div>
                ))}
            </div>

            {/* Modal de Detalhes */}
            <AnimatePresence>
                {projetoSelecionado && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
                            className="bg-card p-6 rounded-2xl max-w-lg w-[90%] shadow-xl relative overflow-hidden"
                        >
                            <button
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
                                onClick={() => setProjetoSelecionado(null)}
                            >
                                <X />
                            </button>

                            {/* Imagem grande */}
                            <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                                <img
                                    src={projetoSelecionado.imagem}
                                    alt={projetoSelecionado.nome}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h2 className="text-2xl font-bold mb-3">
                                {projetoSelecionado.nome}
                            </h2>

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

                            <p className="text-sm text-muted-foreground mb-6">
                                {projetoSelecionado.descricao}
                            </p>

                            <a
                                href={projetoSelecionado.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
                            >
                                <ExternalLink size={18} />
                                Acessar Projeto
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
