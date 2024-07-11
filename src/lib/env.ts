import { z } from "zod";

// Definindo o schema para as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(),
})

// Verificando se as variáveis de ambiente estão corretas
const env = envSchema.parse(process.env);

export { env };