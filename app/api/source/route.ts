import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const temaPath = path.join(process.cwd(), "components", "ThemeToggle.tsx");
  const langPath = path.join(process.cwd(), "components", "LanguageSwitch.tsx");

  const tema = fs.readFileSync(temaPath, "utf-8");
  const language = fs.readFileSync(langPath, "utf-8");
  
  return NextResponse.json({ tema, language });
}
