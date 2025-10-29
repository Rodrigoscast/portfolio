"use client";
import { useEffect, useRef } from "react";

export default function Pacman() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Carrega o código do jogo dinamicamente
    const loadScript = async (src: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    };

    // 🔹 Carrega os scripts originais
    loadScript("/jogos/pacman/static/script/game.js");
    loadScript("/jogos/pacman/static/script/index.js");
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <canvas
        ref={canvasRef}
        id="canvas"
        width={500}
        height={640}
        className="block"
      ></canvas>
    </div>
  );
}
