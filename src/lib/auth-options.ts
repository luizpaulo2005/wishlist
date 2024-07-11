import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

// Configurações de autenticação
const authOptions = {
  // Chave secreta para assinar os tokens
  secret: env.NEXT_PUBLIC_AUTH_SECRET,
  // Configurações dos providers
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Callbacks
  callbacks: {
    // Função executada quando o usuário faz login
    async signIn({ account, profile }: any) {
      // Verificando se o provedor é o Google e se o e-mail foi verificado
      if (account.provider === "google" && profile.email_verified) {
        // Verificando se o usuário já existe no banco de dados
        const select = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // Se o usuário não existir, ele é criado
        if (!select) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              imageUrl: profile.picture,
            },
          });
        }
      }

      return true;
    },
  },
};

export { authOptions };
