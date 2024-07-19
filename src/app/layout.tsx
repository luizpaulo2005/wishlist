import { AuthProvider, ThemeProvider } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Fonte padrão da aplicação
const inter = Inter({ subsets: ["latin"] });

// Metadados da aplicação
export const metadata: Metadata = {
  title: "Lista de Desejos",
  description:
    "Uma lista de desejos criada para fins de treino de aprendizado.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body className={inter.className}>
            <Toaster richColors toastOptions={{ duration: 3000 }} />
            <Navbar />
            {children}
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
