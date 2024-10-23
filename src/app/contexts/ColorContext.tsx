import React, { createContext, useContext, useEffect, useState } from "react";

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  success: string;
  warning: string;
  danger: string;
}

const ColorContext = createContext<{
  colors: Colors;
  setColor: (colorType: keyof Colors, colorValue: string) => void;
} | null>(null);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultColors: Colors = {
    primary: "#01598b",
    secondary: "#e3d8d2",
    accent: "#a6e6ff",
    neutral: "#9c9c9c",
    success: "#D3FFA6",
    warning: "#FFFAA6",
    danger: "#8C0106",
  };

  const [colors, setColors] = useState<Colors>({
    primary: localStorage.getItem("primary") || defaultColors.primary,
    secondary: localStorage.getItem("secondary") || defaultColors.secondary,
    accent: localStorage.getItem("accent") || defaultColors.accent,
    neutral: localStorage.getItem("neutral") || defaultColors.neutral,
    success: localStorage.getItem("success") || defaultColors.success,
    warning: localStorage.getItem("warning") || defaultColors.warning,
    danger: localStorage.getItem("danger") || defaultColors.danger,
  });

  useEffect(() => {
    Object.entries(colors).forEach(([colorType, colorValue]) => {
      document.documentElement.style.setProperty(
        `--color-${colorType}`,
        colorValue
      );
    });
  }, [colors]);

  const setColor = (colorType: keyof Colors, colorValue: string) => {
    setColors((prevColors) => ({ ...prevColors, [colorType]: colorValue }));
    localStorage.setItem(colorType, colorValue);
  };

  return (
    <ColorContext.Provider value={{ colors, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
