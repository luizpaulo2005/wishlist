"use client"
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as ColorProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ColorProvider {...props}>{children}</ColorProvider>;
};

export { AuthProvider, ThemeProvider };
