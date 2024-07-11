import { PrismaClient } from "@prisma/client";

// Instância global do PrismaClient
const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error']
})

export { prisma }