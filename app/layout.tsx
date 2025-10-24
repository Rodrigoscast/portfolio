import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/layout";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        className={`${inter.variable} antialiased bg-gray-100 dark:bg-sidebar`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <LanguageProvider>
            <Layout>
              {children}
            </Layout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}