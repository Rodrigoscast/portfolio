import { NextResponse } from "next/server";

// Tabela de códigos do Open-Meteo → descrição do clima
const weatherDescriptions: Record<number, string> = {
  0: "Céu limpo",
  1: "Principalmente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Névoa",
  48: "Neblina",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  56: "Garoa congelante leve",
  57: "Garoa congelante forte",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva intensa",
  66: "Chuva congelante leve",
  67: "Chuva congelante forte",
  71: "Neve leve",
  73: "Neve moderada",
  75: "Neve intensa",
  77: "Flocos de neve",
  80: "Pancadas de chuva fraca",
  81: "Pancadas de chuva moderada",
  82: "Pancadas de chuva forte",
  85: "Neve leve",
  86: "Neve forte",
  95: "Trovoadas",
  96: "Trovoadas com granizo pequeno",
  99: "Trovoadas com granizo grande",
};

export async function GET(req: Request) {
  try {
    // 1️⃣ Pega o IP do usuário
    const ip =
    process.env.NODE_ENV === "development"
        ? "221.38.25.220"
        : req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "auto";      

    // 2️⃣ Pega latitude e longitude usando ip-api.com
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await geoRes.json();

    if (!geoData || geoData.status !== "success") {
      return NextResponse.json(
        { erro: `Não foi possível determinar a localização do IP http://ip-api.com/json/${ip}` },
        { status: 400 }
      );
    }

    const { lat, lon, city, country } = geoData;

    // 3️⃣ Chama o Open-Meteo para pegar o clima atual
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
    );

    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      return NextResponse.json(
        { erro: "Não foi possível obter o clima atual" },
        { status: 500 }
      );
    }

    const code = weatherData.current.weather_code;
    const temperatura = weatherData.current.temperature_2m;
    const descricao = weatherDescriptions[code] || "Clima desconhecido";

    // 4️⃣ Retorna o resultado final
    return NextResponse.json({
      cidade: city,
      pais: country,
      temperatura,
      descricao,
    });
  } catch (error) {
    console.error("Erro ao obter clima:", error);
    return NextResponse.json(
      { erro: "Erro interno ao consultar o clima" },
      { status: 500 }
    );
  }
}
