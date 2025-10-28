"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useLanguage } from "@/contexts/LanguageContext";
import { PowerGlitch } from "powerglitch";

export default function FaleComigo({
    visivel,
    ref,
}: {
    visivel: boolean;
    ref: any;
}) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        mensagem: "",
    });
    const { lang, abreDev, devMode } = useLanguage();

    useEffect(() => {
        if (devMode) {
            const glitch = PowerGlitch.glitch(".glitch", { playMode: "always" });
            return () => glitch.stopGlitch(); // cleanup
        }
    }, [devMode]);

    async function enviarEmail() {
        if (!form.nome || !form.email || !form.mensagem) {
            toast.error(
                lang == "pt"
                    ? "Preencha todos os campos antes de enviar."
                    : "Please fill out all fields before sending."
            );
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/enviar-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.status === 200) {
                toast.success(
                    lang == "pt"
                        ? "Mensagem enviada! Logo entrarei em contato!"
                        : "Message sent! I’ll get back to you soon!"
                );
                setForm({ nome: "", email: "", mensagem: "" });
            } else if (res.status === 429) {
                toast.info(
                    lang == "pt"
                        ? "Devagar! Aguarde um pouco antes de enviar outro e-mail."
                        : "Slow down! Please wait a bit before sending another email."
                );
            } else {
                toast.error(
                    lang == "pt"
                        ? "Erro ao enviar. Algo deu errado, tente novamente."
                        : "Error sending message. Something went wrong, please try again."
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(
                lang == "pt"
                    ? "Falha de conexão. Não foi possível enviar o e-mail."
                    : "Connection failed. Unable to send the email."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 80 }}
            animate={visivel ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            onContextMenu={(e) => {
                e.preventDefault();
                if (devMode) {
                    abreDev('mensagem')
                }
            }}
            className={`w-full max-w-lg mx-auto flex flex-col gap-6 bg-sidebar border border-border p-8 rounded-2xl shadow-lg mt-10 ${devMode && ('glitch')}`}
        >
            <motion.h2
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
                className="text-2xl font-bold text-center relative pt-2"
            >
                <img src="/gifs/chat.png" alt="Chat" className="w-10 h-10 absolute top-0 left-0" />
                {lang == 'pt' ? 'Entre em contato' : 'Get in touch'}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
                <Input
                    placeholder={lang == 'pt' ? "Seu Nome" : "Your Name"}
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
            >
                <Input
                    type="email"
                    placeholder={lang == 'pt' ? "Seu e-mail" : "Your Email"}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
            >
                <Textarea
                    placeholder={lang == 'pt' ? "Escreva sua mensagem..." : "Type your message..."}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="min-h-[120px]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
            >
                <Button
                    onClick={enviarEmail}
                    disabled={loading}
                    className="w-full text-md py-5 cursor-pointer"
                >
                    {lang == 'pt' ? (loading ? "Enviando..." : "Enviar mensagem") : (loading ? "Sending..." : "Send message")}
                </Button>
            </motion.div>
        </motion.div>
    );
}
