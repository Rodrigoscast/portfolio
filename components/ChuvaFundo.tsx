"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // versão leve e compatível

export default function ChuvaFundo() {
  const init = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="chuva"
        init={init}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: {
              value: 180,
              density: { enable: true, area: 800 },
            },
            color: { value: "#9ecfff" },
            shape: { type: "line" },
            opacity: {
              value: 0.3,
              random: { enable: true, minimumValue: 0.1 },
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 40, max: 90 },
              random: true,
            },
            move: {
              enable: true,
              // 💨 direção diagonal simulando vento
              direction: "bottom-right",
              speed: { min: 40, max: 75 },
              random: true,
              straight: true,
              outModes: { default: "out" },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Efeito “vidro molhado” */}
      <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/20 pointer-events-none" />
    </div>
  );
}
