const backendUrl = process.env.NEXT_PUBLIC_BACKEND?.replace(/\/$/, "");

export async function registerSession(): Promise<string | null> {
  if (!backendUrl) return null;

  const response = await fetch(`${backendUrl}/views/create_session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "bypass-tunnel-reminder": "1",
    },
  });

  if (!response.ok) return null;

  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || !("id" in data)) return null;

  return typeof data.id === "string" ? data.id : null;
}

export async function registerView(codVisit: string, campo: string) {
  if (!backendUrl) return;

  await fetch(`${backendUrl}/views`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "bypass-tunnel-reminder": "1",
    },
    body: JSON.stringify({ cod_visit: codVisit, campo }),
  });
}