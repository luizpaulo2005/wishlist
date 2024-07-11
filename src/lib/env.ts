import { z } from "zod";

// Definindo o schema para as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_SECRET: z.string(),
    NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID: z.string(),
    NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_SECRET: z.string(),
})

// Verificando se as variáveis de ambiente estão corretas
const env = envSchema.parse(process.env);

export { env };