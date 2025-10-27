import { useEffect, useState } from "react";

export function useClima() {
  const [clima, setClima] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataHora, setDataHora] = useState<{ data: string; hora: string }>({
    data: "",
    hora: "",
  });

  // ⏰ Atualiza data/hora em tempo real
  useEffect(() => {
    function atualizarHora() {
      const agora = new Date();

      // Formata data e hora no estilo brasileiro
      const dataFormatada = agora.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "long"
      });

      const horaFormatada = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });

      setDataHora({
        data: dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1),
        hora: horaFormatada,
      });
    }

    atualizarHora();
    const interval = setInterval(atualizarHora, 1000); // atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  // 🌦 Busca o clima
  useEffect(() => {
    async function getClima() {
      try {
        //Tenta geolocalização via navegador
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
              const res = await fetch(
                `/api/clima?lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();
              setClima(data);
              setLoading(false);
            },
            async () => {
              //Se o usuário negar → fallback IP
              const res = await fetch(`/api/clima`);
              const data = await res.json();
              setClima(data);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 8000 }
          );
        } else {
          //Se geolocation não existir
          const res = await fetch(`/api/clima`);
          const data = await res.json();
          setClima(data);
          setLoading(false);
        }
      } catch (err: any) {
        setErro("Erro ao obter o clima");
        setLoading(false);
      }
    }

    getClima();
  }, []);

  return { clima, erro, loading, dataHora };
}
