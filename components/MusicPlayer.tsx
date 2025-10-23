"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Pause, Globe, Code, Sun } from "lucide-react";

export default function InfoArea() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* 🎵 Music Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Lofi Player 🎧</h2>
          <button
            onClick={() => setPlaying(!playing)}
            className="p-2 rounded-full hover:bg-zinc-800"
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-3">
          {playing ? "Tocando: Chill Vibes - lofi.co" : "Pausado"}
        </p>
      </motion.div>

      {/* 📰 Dev News Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg"
      >
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Globe size={18} /> Dev News 🌐
        </h2>
        <ul className="text-sm text-zinc-400 space-y-2">
          <li>• TypeScript 6.0 lançado com novos recursos 🔥</li>
          <li>• React 20 melhora performance em SSR ⚛️</li>
          <li>• GitHub Copilot ganha modo Chat integrado 🤖</li>
        </ul>
      </motion.div>

      {/* 🌤️ Clima / Tema Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-2xl p-5 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Sun size={20} /> Clima Hoje
          </h2>
          <span className="text-sm opacity-80">Franca-SP</span>
        </div>
        <div className="mt-3 text-3xl font-bold">27°C ☀️</div>
        <p className="text-sm opacity-90">Dia ensolarado, perfeito pra codar!</p>
      </motion.div>
    </div>
  );
}
