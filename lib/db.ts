import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaPg | undefined;
};

function createPrismaClient() {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error("DATABASE_URL is not set");
    }

    const adapter = new PrismaPg({connectionString: url});
    return new PrismaClient({adapter});
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}