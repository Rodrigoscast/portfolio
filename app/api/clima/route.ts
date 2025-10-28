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

// 🇺🇸 Traduções em inglês
const weatherDescriptionsEng: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with small hail",
  99: "Thunderstorm with large hail",
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

    // 🔹 Se não tiver coordenadas, pega via IP
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
          { erro: "Não foi possível determinar a localização do IP" },
          { status: 400 }
        );
      }

      lat = geoData.lat;
      lon = geoData.lon;
      city = geoData.city;
      state = geoData.region || "";
      country = geoData.country;
    } else {
      // 🔹 Se vier lat/lon (usuário permitiu localização)
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
        state = addr["ISO3166-2-lvl4"].split("-")[1] || state;
      }
    }

    // 🔹 Consulta o Open-Meteo
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
    const descricaoEng = weatherDescriptionsEng[code] || "Unknown weather";

    return NextResponse.json({
      cidade: city || null,
      estado: state || null,
      pais: country || null,
      temperatura,
      descricao,
      descricaoEng,
    });
  } catch (error) {
    console.error("Erro ao obter clima:", error);
    return NextResponse.json(
      { erro: "Erro interno ao consultar o clima" },
      { status: 500 }
    );
  }
}
