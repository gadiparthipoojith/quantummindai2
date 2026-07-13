import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Users (Founders & Clients)
  const poojith = await prisma.user.upsert({
    where: { passcode: "poojith" },
    update: {},
    create: {
      passcode: "poojith",
      role: "admin",
      name: "Gadiparthi Poojith (Founder)",
    },
  });

  const surya = await prisma.user.upsert({
    where: { passcode: "surya" },
    update: {},
    create: {
      passcode: "surya",
      role: "admin",
      name: "Surya Antarvedi (Founder)",
    },
  });

  const acme = await prisma.user.upsert({
    where: { passcode: "acme" },
    update: {},
    create: {
      passcode: "acme",
      role: "client_acme",
      name: "Client: Acme Corp",
      clientAlias: "client_acme",
    },
  });

  const nova = await prisma.user.upsert({
    where: { passcode: "nova" },
    update: {},
    create: {
      passcode: "nova",
      role: "client_nova",
      name: "Client: Nova Retail",
      clientAlias: "client_nova",
    },
  });

  const apex = await prisma.user.upsert({
    where: { passcode: "apex" },
    update: {},
    create: {
      passcode: "apex",
      role: "client_apex",
      name: "Client: Apex AI",
      clientAlias: "client_apex",
    },
  });

  console.log("Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
