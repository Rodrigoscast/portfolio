"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export function LanguageSwitch() {
  const [lang, setLang] = useState("pt");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLang(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "pt" ? "en" : "pt";
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <StyledSwitch onClick={toggleLanguage} $lang={lang}>
      <div className="track">
        <div className="overlay" />
        <div className="knob" />
      </div>
    </StyledSwitch>
  );
}

const pop = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledSwitch = styled.div<{ $lang: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .track {
    position: relative;
    width: 2.5em;
    height: 4.5em;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    transition: all 0.4s ease;
    background-image: url(${({ $lang }) =>
      $lang === "pt"
        ? "https://flagcdn.com/w80/br.png"
        : "https://flagcdn.com/w80/us.png"});
    background-size: cover;
    background-position: center;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.15);
  }

  .knob {
    position: absolute;
    left: 50%;
    top: ${({ $lang }) => ($lang === "en" ? "6px" : "calc(100% - 26px)")};
    transform: translateX(-50%);
    width: 1.5em;
    height: 1.5em;
    background: white;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    transition: top 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55),
      box-shadow 0.3s;
    animation: ${pop} 0.4s;
  }

  &:hover .knob {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }

  &:active .knob {
    transform: translateX(-50%) scale(0.95);
  }
`;
