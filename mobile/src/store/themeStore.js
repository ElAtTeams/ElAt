import { Appearance } from "react-native"
import { create } from "zustand"

const palettes = {
  light: {
    background: "#ffffff",
    surface: "#ffffff",
    text: "#f2f2f2".replace("#f2f2f2", "#1a1a1a"),
    subtext: "#666",
    border: "#e6e6e6",
    primary: "#10b981",
    primarySoft: "#e7f8f2",
    muted: "#f8f9fa",
    danger: "#ef4444",
  },
  dark: {
    background: "#0f1115",
    surface: "#161a20",
    text: "#f2f2f2",
    subtext: "#A3A3A3",
    border: "#2a2f36",
    primary: "#10b981",
    primarySoft: "#0e2a23",
    muted: "#131821",
    danger: "#ef4444",
  },
}

const getSystemMode = () => (Appearance.getColorScheme() === "dark" ? "dark" : "light")

export const useThemeStore = create((set) => ({
  mode: "system", // "system" | "light" | "dark"
  setMode: (mode) => set({ mode }),
}))

export const getActiveMode = (mode) => (mode === "system" ? getSystemMode() : mode)

export const useThemeColors = () => {
  const mode = useThemeStore((s) => s.mode)
  const active = getActiveMode(mode)
  return palettes[active]
}

export const useThemeMeta = () => {
  const mode = useThemeStore((s) => s.mode)
  const active = getActiveMode(mode)
  return { colors: palettes[active], isDark: active === "dark" }
}