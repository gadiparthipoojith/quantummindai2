import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Safe global reference cache for Serverless environments (both dev & prod)
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

let prismaInstance: PrismaClient;

if (!globalForPrisma.prisma) {
  const connectionString = process.env.DATABASE_URL;
  
  // Set connection parameters optimal for serverless environments
  const pool = new Pool({
    connectionString,
    max: 4,                  // Prevent serverless connection starvation
    idleTimeoutMillis: 30000, // Close idle connections quickly
    connectionTimeoutMillis: 5000, // Timeout fast if DB is unresponsive
  });
  
  const adapter = new PrismaPg(pool);
  globalForPrisma.prisma = new PrismaClient({ adapter });
  globalForPrisma.pool = pool;
}

prismaInstance = globalForPrisma.prisma;

export const prisma = prismaInstance;
export default prisma;
