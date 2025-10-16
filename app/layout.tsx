import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/layout";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focal Gestão",
  description: "Seja bem-vindo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-sidebar`}
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