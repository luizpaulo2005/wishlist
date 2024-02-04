"use client";
import { ThemeProvider as ColorProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ColorProvider {...props}>{children}</ColorProvider>;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { ThemeProvider, AuthProvider, QueryProvider };