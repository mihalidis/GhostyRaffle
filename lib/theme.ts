export type ThemeName = "classic" | "winter";

export interface Theme {
  name: ThemeName;
  label: string;
  bg: string;
  bgSecondary: string;
  surface: string;
  surfaceBorder: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  textDim: string;
  shadow: string;
  inputBg: string;
  inputBorder: string;
  danger: string;
  success: string;
  ghostColor: string;
}

export const themes: Record<ThemeName, Theme> = {
  classic: {
    name: "classic",
    label: "Classic Arcade",
    bg: "bg-[#0D0D1A]",
    bgSecondary: "bg-[#1A0D2E]",
    surface: "bg-[#1E1035]",
    surfaceBorder: "border-[#3D1F6E]",
    primary: "bg-[#FF007F]",
    primaryHover: "hover:bg-[#CC0066]",
    secondary: "bg-[#7B00FF]",
    accent: "bg-[#00E5FF]",
    text: "text-[#F8F8FF]",
    textMuted: "text-[#B8A9D9]",
    textDim: "text-[#7B6FA0]",
    shadow: "shadow-[#FF007F]",
    inputBg: "bg-[#130A24]",
    inputBorder: "border-[#4A2080]",
    danger: "bg-[#FF3366]",
    success: "bg-[#00FF88]",
    ghostColor: "#FF007F",
  },
  winter: {
    name: "winter",
    label: "Winter Ghost",
    bg: "bg-[#050D1A]",
    bgSecondary: "bg-[#0A1428]",
    surface: "bg-[#0D1E3D]",
    surfaceBorder: "border-[#1A3A6E]",
    primary: "bg-[#4FC3F7]",
    primaryHover: "hover:bg-[#0288D1]",
    secondary: "bg-[#FF5252]",
    accent: "bg-[#E0F7FA]",
    text: "text-[#E8F4FD]",
    textMuted: "text-[#90CAF9]",
    textDim: "text-[#4A7FA5]",
    shadow: "shadow-[#4FC3F7]",
    inputBg: "bg-[#071020]",
    inputBorder: "border-[#1A3A6E]",
    danger: "bg-[#FF5252]",
    success: "bg-[#69F0AE]",
    ghostColor: "#4FC3F7",
  },
};

export function detectTheme(): ThemeName {
  const month = new Date().getMonth();
  return month === 11 ? "winter" : "classic";
}

export const currentTheme: Theme = themes[detectTheme()];
