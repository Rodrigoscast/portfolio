"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

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
    imagem: string;
};

const projetos: Projeto[] = [
    {
        nome: "Eva - Solução Unimed",
        descricao:
            "Criado durante um hackaton de 24h, Eva é um sistema de agendamento médico através de chatbots e IAs, contando com um sistema de cadastro, login, análise de imagens e leitor de PDFs",
        tags: ["Next.js", "FastAPI", "Supabase", "Llama API"],
        link: "https://github.com/Rodrigoscast/hackaton-2025",
        imagem: "/img/imagem-sample.jpg",
    },
    {
        nome: "Sistema de Estoque Web",
        descricao:
            "Sistema completo de controle de estoque, com entrada e saída de peças, acompanhamento de peças por projeto, produção por usuário, relatório de compras, alertas de estoque baixo e gráficos completos de análise e previsão do estoque.",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Python"],
        link: "https://estoque-demo.vercel.app/",
        imagem: "/img/imagem-sample.jpg",
    },
    {
        nome: "Ludoteca",
        descricao:
            "O projeto tem como objetivo reunir jogos clássicos em um só lugar, oferecendo uma experiência simples, divertida e nostálgica para quem quer relaxar e testar o raciocínio de forma leve e acessível.",
        tags: ["Next.js", "Framer Motion"],
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
    const [modalProjeto, setModalProjeto] = useState(false);

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
                        onClick={() => {setProjetoSelecionado(proj); setModalProjeto(true)}}
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
                            <DialogTitle  className="text-2xl font-bold mb-3">
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
                            <DialogDescription>
                                <p className="text-sm text-muted-foreground mb-6">
                                    {projetoSelecionado.descricao}
                                </p>
                            </DialogDescription>
                        </DialogHeader>

                        <a
                            href={projetoSelecionado.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
                        >
                            <ExternalLink size={18} />
                            Acessar Projeto
                        </a>
                    </DialogContent>
                </Dialog>
            )}
        </motion.div>
    );
}
