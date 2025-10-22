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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto flex flex-col gap-6 bg-card border border-border p-8 rounded-2xl shadow-lg mt-10"
        >
            <h2 className="text-2xl font-bold text-center">💬 Fale Comigo</h2>

            <Input
                placeholder="Seu nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <Input
                type="email"
                placeholder="Seu e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Textarea
                placeholder="Escreva sua mensagem..."
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="min-h-[120px]"
            />

            <Button
                onClick={enviarEmail}
                disabled={loading}
                className="w-full text-md py-5"
            >
                {loading ? "Enviando..." : "Enviar mensagem"}
            </Button>
        </motion.div>
    );
}
