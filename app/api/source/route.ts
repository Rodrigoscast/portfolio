import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Função segura pra ler arquivo
function readFileSafe(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return `// ⚠️ arquivo não encontrado: ${filePath}`;
  }
}

export async function GET() {
  const base = path.join(process.cwd(), "components");
  const back = path.join(process.cwd(), "app", "api");

  // Estrutura de dados: categorias > subcategorias > códigos
  const codigos: Record<string, Record<string, string[]>> = {
    tema: {
      frontend: [
        readFileSafe(path.join(base, "ThemeToggle.tsx"))
      ]
    },
    language: {
      frontend: [
        readFileSafe(path.join(base, "LanguageSwitch.tsx"))
      ]
    },
    exemplo: {
      frontend: [
        readFileSafe(path.join(base, "ui", "Button.tsx")),
      ],
    },
    kame: {
      frontend: [
        readFileSafe(path.join(base, "ChatKame.tsx")),
      ],
      backend: [
        readFileSafe(path.join(back, "kame", "route.ts")),
      ],
    },
    devmode: {
      frontend: [
        readFileSafe(path.join(base, "CardCode.tsx")),
      ],
      backend: [
        readFileSafe(path.join(back, "source", "route.ts")),
      ],
    },
    musica: {
      frontend: [
        readFileSafe(path.join(base, "DemonstracaoMusic.tsx")),
      ],
      backend: [
        readFileSafe(path.join(back, "clima", "route.ts")),
      ],
    },
    mensagem: {
      frontend: [
        readFileSafe(path.join(base, "FaleComigo.tsx")),
      ],
      backend: [
        readFileSafe(path.join(back, "enviar-email", "route.ts")),
      ],
    },
    projetos: {
      frontend: [
        readFileSafe(path.join(base, "Projetos.tsx")),
      ]
    },
    tecnologias: {
      frontend: [
        readFileSafe(path.join(base, "tecnologias.tsx")),
      ]
    },
    secret: {
      frontend: [
        readFileSafe(path.join(base, "DemonstracaoCassette.tsx")),
      ],
      animation: [
        readFileSafe(path.join(base, "CassetteModel.jsx")),
      ]
    },
  };

  return NextResponse.json(codigos);
}
