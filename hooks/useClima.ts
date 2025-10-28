import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function useClima() {
  const [clima, setClima] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataHora, setDataHora] = useState<{ data: string; hora: string }>({
    data: "",
    hora: "",
  });
  const { lang } = useLanguage();

  // Atualiza data/hora em tempo real
  useEffect(() => {
    function atualizarHora() {
      const agora = new Date();

      // Locale depende da linguagem
      const locale = lang === "pt" ? "pt-BR" : "en-US";

      const dataFormatada = agora.toLocaleDateString(locale, {
        weekday: "short",
        day: "2-digit",
        month: "long",
      });

      const horaFormatada = agora.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });

      setDataHora({
        data:
          dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1),
        hora: horaFormatada,
      });
    }

    atualizarHora();
    const interval = setInterval(atualizarHora, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // Busca o clima
  useEffect(() => {
    async function getClima() {
      try {
        const fetchClima = async (url: string) => {
          const res = await fetch(url);
          const data = await res.json();

          // 🔁 Tradução automática
          const climaTraduzido =
            lang === "pt"
              ? data
              : {
                  ...data,
                  descricao: data.descricaoEng || data.descricao,
                  erro:
                    data.erro === "Não foi possível obter o clima atual"
                      ? "Unable to retrieve current weather"
                      : data.erro === "Erro interno ao consultar o clima"
                      ? "Internal error while fetching weather data"
                      : data.erro,
                };

          setClima(climaTraduzido);
          setLoading(false);
        };

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
              await fetchClima(`/api/clima?lat=${latitude}&lon=${longitude}`);
            },
            async () => {
              await fetchClima(`/api/clima`);
            },
            { enableHighAccuracy: true, timeout: 8000 }
          );
        } else {
          await fetchClima(`/api/clima`);
        }
      } catch (err: any) {
        setErro(
          lang === "pt" ? "Erro ao obter o clima" : "Error fetching weather"
        );
        setLoading(false);
      }
    }

    getClima();
  }, [lang]);

  return { clima, erro, loading, dataHora };
}
