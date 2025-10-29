import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Exo } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Focal Gestão",
  description: "Seja bem-vindo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${exo.variable} antialiased bg-gray-100 dark:bg-sidebar`}
      >
          {children}
      </body>
    </html>
  );
}