import { PrismaClient } from '@prisma/client' 

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with connection handling
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Reuse Prisma client in development to avoid multiple connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Prisma Client will connect automatically on first query
// This avoids connection errors when database is sleeping (Neon free tier)
// Database will auto-wake on first connection attempt

export default prisma