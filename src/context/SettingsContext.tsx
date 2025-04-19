import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  
  export interface SettingsContextType {
    theme: "light" | "dark";
    fontSize: number;
    fontFamily: string;
    scale: number;
    setTheme: (theme: "light" | "dark") => void;
    setFontSize: (size: number) => void;
    setFontFamily: (font: string) => void;
    setScale: (scale: number) => void;
  }
  
  // Функции чтения из localStorage с fallback
  const getInitialTheme = (): "light" | "dark" =>
    (localStorage.getItem("theme") as "light" | "dark") || "light";
  
  const getInitialFontSize = (): number =>
    Number(localStorage.getItem("fontSize")) || 14;
  
  const getInitialFontFamily = (): string =>
    localStorage.getItem("fontFamily") || "Inter, sans-serif";
  
  const getInitialScale = (): number =>
    Number(localStorage.getItem("scale")) || 100;
  
  const SettingsContext = createContext<SettingsContextType>({
    theme: "light",
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    scale: 100,
    setTheme: () => {},
    setFontSize: () => {},
    setFontFamily: () => {},
    setScale: () => {},
  });
  
  export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<"light" | "dark">(getInitialTheme);
    const [fontSize, setFontSizeState] = useState<number>(getInitialFontSize);
    const [fontFamily, setFontFamilyState] = useState<string>(getInitialFontFamily);
    const [scale, setScaleState] = useState<number>(getInitialScale);
  
    // Применяем класс темы к HTML
    useEffect(() => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    useEffect(() => {
      localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);
  
    useEffect(() => {
      localStorage.setItem("fontFamily", fontFamily);
    }, [fontFamily]);
  
    useEffect(() => {
      localStorage.setItem("scale", scale.toString());
    }, [scale]);
  
    return (
      <SettingsContext.Provider
        value={{
          theme,
          fontSize,
          fontFamily,
          scale,
          setTheme: setThemeState,
          setFontSize: setFontSizeState,
          setFontFamily: setFontFamilyState,
          setScale: setScaleState,
        }}
      >
        {children}
      </SettingsContext.Provider>
    );
  };
  
  export const useSettings = () => useContext(SettingsContext);
  
  
  

  