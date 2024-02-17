import { AuthProvider, QueryProvider, ThemeProvider } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Desejos",
  description: "App criado para gerenciar sua lista de desejos",
  manifest: "/manifest.json",
  icons: [
    {
      href: "/icon192x192.png",
      sizes: "192x192",
      url: "",
    },
    {
      href: "/icon256x256.png",
      sizes: "256x256",
      url: "",
    },
    {
      href: "/icon384x384.png",
      sizes: "384x384",
      url: "",
    },
    {
      href: "/icon512x512.png",
      sizes: "512x512",
      url: "",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
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
