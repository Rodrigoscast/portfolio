"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  const alternarTema = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <StyledWrapper>
      <label htmlFor="switch" className="switch">
        <input
          id="switch"
          type="checkbox"
          checked={!isDark}
          onChange={alternarTema}
        />
        <span className="slider" />
        <span className="decoration" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 2.5em;   /* estreito */
    height: 4.5em; /* alto */
    cursor: pointer;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    --background: #20262c;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  /* Bolinha */
  .slider:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
    left: 20%;
    top: 55%;
    transform: translateY(0);
    box-shadow: inset 7px -6px 0px 0px #ececd9, -4px 3px 4px -2px #dadada;
    background: var(--background);
    transition: 0.5s;
  }

  /* Pontinhos decorativos */
  .decoration {
    position: absolute;
    content: "";
    height: 2px;
    width: 2px;
    border-radius: 50%;
    left: 50%;
    top: 15%;
    background: #e5f041e6;
    backdrop-filter: blur(10px);
    transition: all 0.5s;
    box-shadow: -5px 14px 0 #e5f041e6, 3px 10px 0 #e5f041e6,
      -10px 5px 0 #e5f041e6, -14px 16px 0 #e5f041e6, 11px 15px 0 #e5f041e6,
      3px 25px 0 #e5f041e6;
  }

  input:checked ~ .decoration {
    transform: translateY(20px);  /* Agora desce */
    width: 10px;
    height: 10px;
    left: 60%;
    top: auto;
    bottom: 48%;
    background: white;
    box-shadow: -18px -22px 0 white, -13px -23px 0 1.6px white,
      -5px 0px 0 1px white, -8px -22px 0 white, -10px 0px 0 white;
  }

  input:checked + .slider {
    background-color: #5494de;
  }

  input:checked + .slider:before {
    transform: translateY(-145%);
    box-shadow: inset 15px -4px 0px 15px #efdf2b, 0 0 10px 0px #efdf2b;
  }
`;
