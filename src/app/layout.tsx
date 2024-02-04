import { AuthProvider, QueryProvider, ThemeProvider } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Desejos",
  description: "App criado para gerenciar sua lista de desejos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <body className={inter.className}>
              <Toaster />
              <Navbar />
              {children}
            </body>
          </QueryProvider>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
