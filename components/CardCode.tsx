"use client";

import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  duotoneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function CodeCard({ name }: { name: string }) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [code, setCode] = useState<Record<string, Record<string, string[]>>>({});

  useEffect(() => {
    fetch("/api/source")
      .then((res) => res.json())
      .then((data) => setCode(data));
  }, []);

  const data = code[name];

  if (!data) return null;

  const subTabs = Object.keys(data);

  return (
    <aside className="bg-[#e7d8be] dark:bg-sidebar text-foreground rounded-lg w-full font-mono p-4 shadow-lg">
      {/* Cabeçalho tipo janela */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm text-muted-foreground">Next</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={subTabs[0]} className="mt-4">
        <TabsList className="w-full flex flex-wrap gap-2 justify-start bg-muted/20 rounded-lg p-1">
          {subTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="cursor-pointer hover:bg-muted/40 capitalize px-3 py-1 text-sm rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {subTabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {data[tab].map((snippet, i) => (
              <SyntaxHighlighter
                key={i}
                language="tsx"
                style={currentTheme === "dark" ? vscDarkPlus : duotoneLight}
                customStyle={{
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "0.8rem",
                  maxHeight: "300px",
                  overflow: "auto",
                  whiteSpace: "pre",
                  wordBreak: "normal",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {snippet}
              </SyntaxHighlighter>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </aside>
  );
}
