import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface ColorScheme {
    bg: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    shadow: string;
    gradients: {
      background: [string, string, string];
      surface: [string, string];
      primary: [string, string];
      success: [string, string];
      warning: [string, string];
      danger: [string, string];
      muted: [string, string];
      empty: [string, string];
    };
    backgrounds: {
      input: string;
      editInput: string;
    };
    statusBarStyle: "light-content" | "dark-content";
  }
  
  const lightColors: ColorScheme = {
    bg: "#fff",
    surface: "#fff",
    text: "#1e293b",
    textMuted: "#64748b",
    border: "transparent",
    primary: "#000",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    shadow: "#000000",
     gradients: {
       background: ["#f8f9fa", "#e2e8f0", "#e2e8f0"],
      surface: [
        "rgba(0,0,0,0.12)", // glassy dark overlay
        "rgba(0,0,0,0.04)"
      ],
      primary: ["rgba(0,0,0,0.80)", "rgba(0,0,0,0.25)"],
      success: ["#10b981", "#059669"],
      warning: ["#f59e0b", "#d97706"],
      danger: ["#ef4444", "#dc2626"],
      muted: ["#e5e7eb", "#d1d5db"],
      empty: ["#e5e7eb", "#d1d5db"],
    },
    backgrounds: {
      input: "#fff",
      editInput: "#fff",
    },
    statusBarStyle: "dark-content" as const,
  };
  
  const darkColors: ColorScheme = {
    bg: "#000",
    surface: "#000",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    border: "transparent",
    primary: "#fff",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    shadow: "#000000",
    gradients: {
      background: [ "#fff","#000","#000"],
      surface: [
        "rgba(255,255,255,0.25)", // glassy white overlay
        "rgba(255,255,255,0.05)"
      ],
      primary: ["rgba(255,255,255,0.80)", "rgba(255,255,255,0.25)"],
      success: ["#10b981", "#059669"],
      warning: ["#f59e0b", "#d97706"],
      danger: ["#ef4444", "#dc2626"],
      muted: ["#23272f", "#2d323c"],
      empty: ["#374151", "#4b5563"],
    },
    backgrounds: {
      input: "#000000",
      editInput: "#000000",
    },
    statusBarStyle: "light-content" as const,
  };

  
interface ThemeContextType {
    isDarkMode : boolean
    toggleDarkMode : () => void
    colors : ColorScheme
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
  
    useEffect(() => {
      AsyncStorage.getItem("darkMode").then((value) => {
        if (value) setIsDarkMode(JSON.parse(value));
      });
    }, []);
  
    const toggleDarkMode = async () => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
    };
  
    const colors = isDarkMode ? darkColors : lightColors;
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };