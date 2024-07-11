import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/providers";

// Fonte padrão da aplicação
const inter = Inter({ subsets: ["latin"] });

// Metadados da aplicação
export const metadata: Metadata = {
  title: "Lista de Desejos",
  description:
    "Uma lista de desejos criada para fins de treino de aprendizado.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
