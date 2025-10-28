"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import kameReveal from "@/public/icons/kame-reveal.json";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";

interface Mensagem {
    autor: "user" | "kame";
    texto: string;
}

export default function ChatKame() {
    const { lang, kame, setKame } = useLanguage();
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const [texto, setTexto] = useState("");
    const lottieRef = useRef<any>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [digitando, setDigitando] = useState(false);
    const refKame = useRef<HTMLDivElement>(null);


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

    // Carrega histórico
    useEffect(() => {
        const salvo = localStorage.getItem("chatKame");
        if (salvo && salvo != '[]') {
            setMensagens(JSON.parse(salvo));
        } else {
            const inicial: Mensagem[] = [
                {
                    autor: "kame",
                    texto:
                        "Olá! Sou o Kame, fui criado para responder qualquer dúvida sobre o Rodrigo!",
                },
            ];
            setMensagens(inicial);
            localStorage.setItem("chatKame", JSON.stringify(inicial));
        }
    }, []);

    // Salva histórico e rola pro fim
    useEffect(() => {
        localStorage.setItem("chatKame", JSON.stringify(mensagens));
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            // animação suave
            (viewport as HTMLDivElement).scrollTo({
                top: (viewport as HTMLDivElement).scrollHeight,
                behavior: "smooth",
            });
        }
    }, [mensagens]);

    async function enviarMensagem() {
        if (!texto.trim()) return;

        const novaMensagem: Mensagem = { autor: "user", texto };
        setMensagens((prev) => [...prev, novaMensagem]);
        setTexto("");
        setDigitando(true);

        try {
            const res = await fetch("/api/kame", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mensagem: texto }),
            });

            const data = await res.json();
            const resposta = data.resposta || "Desculpe, algo deu errado 😅";

            setDigitando(false);

            setMensagens((prev) => [...prev, { autor: "kame", texto: resposta }]);
        } catch (err) {
            setMensagens((prev) => [
                ...prev,
                { autor: "kame", texto: "Ops, não consegui responder agora 😢" },
            ]);
            setDigitando(false);
        }
    }

    useEffect(() => {
        lottieRef.current?.goToAndStop(0, true);
        setTimeout(() => {
           lottieRef.current?.play() 
        }, 1000);        
    }, [kame])

    return (
        <motion.div
            ref={refKame}
            initial={{ opacity: 0, y: 400 }}
            animate={kame ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-0 right-14 flex flex-col items-center justify-center"
        >
            <Card className="bg-card/60 border-border w-96 max-h-[90vh] pt-1 shadow-xl rounded-t-2xl rounded-b-none backdrop-blur-md overflow-hidden flex flex-col">
                <CardContent className="flex flex-col h-full px-2 gap-3">
                    <div className="flex items-center gap-2 justify-center text-sm font-semibold text-foreground h-25 relative">
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={kameReveal}
                            loop={false}
                            autoplay={false}
                            className="w-25 h-25 rounded-full bg-muted"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.2 }}
                            animate={kame ? { opacity: 1, scale: 1, transition: { delay: 1.6, duration: 0.6, ease: "easeOut" } } : { opacity: 0, scale: 0.2 }}
                            className="absolute -bottom-1 bg-blue-300 dark:bg-blue-500 rounded-full px-2"
                        >
                            Kame IA
                        </motion.div>
                    </div>                   

                    <ScrollArea ref={scrollAreaRef} className="rounded-md h-75">
                        <div className="flex flex-col gap-2 px-4">
                            {mensagens.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${m.autor === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-md ${m.autor === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-muted text-foreground rounded-bl-none"
                                            }`}
                                    >
                                        <div className="prose prose-invert text-sm max-w-none">
                                            <ReactMarkdown>{m.texto}</ReactMarkdown>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                             {digitando && (
                                <div className="text-xs text-muted-foreground italic pl-3">
                                    {lang == 'pt' ? 'Kame está digitando...' : 'Kame is typing...'}
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="flex items-center gap-2">
                        <Input
                            placeholder={lang == 'pt' ? "Fale com o Kame..." : "Talk to Kame..."}
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                        />
                        <Button onClick={enviarMensagem} className="cursor-pointer">
                            <Send size={16} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
