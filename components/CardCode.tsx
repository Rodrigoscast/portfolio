// components/CodeCard.tsx
import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, prism, atomDark, duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

export default function CodeCard({ code }: { code: string }) {
   const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <aside className="bg-white dark:bg-black text-white rounded-lg w-full font-mono p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">Next</p>
      </div>
      <div className="mt-4">
        <SyntaxHighlighter
            language="tsx"
            style={currentTheme === "dark" ? vscDarkPlus : duotoneLight}
            customStyle={{
                borderRadius: "8px",
                padding: "8px",
                fontSize: "0.75rem",
                maxHeight: "300px",
                overflowY: "auto",
            }}
        >
            {code}
        </SyntaxHighlighter>
      </div>
    </aside>
  );
}
