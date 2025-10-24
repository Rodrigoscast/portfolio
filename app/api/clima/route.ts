import { NextResponse } from "next/server";

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
    const { searchParams } = new URL(req.url);
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    let lat = latParam;
    let lon = lonParam;
    let city = "";
    let state = "";
    let country = "";

    //Se não tiver coordenadas, pega via IP
    if (!lat || !lon) {
      const ip =
        process.env.NODE_ENV === "development"
          ? "187.32.15.147"
          : req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "auto";

      const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
      const geoData = await geoRes.json();

      if (!geoData || geoData.status !== "success") {
        return NextResponse.json(
          { erro: `Não foi possível determinar a localização do IP` },
          { status: 400 }
        );
      }

      lat = geoData.lat;
      lon = geoData.lon;
      city = geoData.city;
      state = geoData.region || ""; // ex: "SP"
      country = geoData.country;
    } else {
      //Se vier lat/lon (usuário permitiu localização) → usa reverse geocoding
      const reverseRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        { headers: { "User-Agent": "NextWeatherApp/1.0" } }
      );

      const reverseData = await reverseRes.json();
      const addr = reverseData.address || {};

      city = addr.city || addr.town || addr.village || "";
      state = addr.state_code || addr.state || "";
      country = addr.country || "";
      if (state.length > 2 && addr["ISO3166-2-lvl4"]) {
        // Pega a sigla tipo "BR-SP"
        state = addr["ISO3166-2-lvl4"].split("-")[1] || state;
      }
    }

    //Consulta o Open-Meteo
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

    return NextResponse.json({
      cidade: city || null,
      estado: state || null,
      pais: country || null,
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
