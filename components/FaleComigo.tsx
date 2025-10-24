"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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

    async function enviarEmail() {
        if (!form.nome || !form.email || !form.mensagem) {
            toast.error("Preencha todos os campos antes de enviar.");
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
                toast.success("Mensagem enviada, Logo entrarei em contato!")
                setForm({ nome: "", email: "", mensagem: "" });
            } else if (res.status === 429) {
                toast.info("Devagar! Aguarde um pouco antes de enviar outro e-mail.")
            } else {
                toast.error("Erro ao enviar. Algo deu errado, tente novamente.")
            }
        } catch (error) {
            console.error(error);
            toast.error("Falha de conexão. Não foi possível enviar o e-mail.")
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
            className="w-full max-w-lg mx-auto flex flex-col gap-6 bg-card border border-border p-8 rounded-2xl shadow-lg mt-10"
        >
            <motion.h2 
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
                className="text-2xl font-bold text-center"
            >
                💬 Entre em contato 
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
                <Input
                    placeholder="Seu nome"
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
                    placeholder="Seu e-mail"
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
                    placeholder="Escreva sua mensagem..."
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
                    {loading ? "Enviando..." : "Enviar mensagem"}
                </Button>
            </motion.div>
        </motion.div>
    );
}
