import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const currencySeed: Prisma.CurrencyCreateInput[] = [
  {
    name: "Dollar (US)",
    code: "USD",
    symbol: "$",
  },
];
const load = async () => {
  try {
    console.log(`Start seeding ...`);

    // currencies
    currencySeed.map(async (curency) => {
      const result = await prisma.currency.create({
        data: curency,
      });
      console.log(`Created currency with id: ${result.id}`);
    });

    // users
    const userSeed: Prisma.UserCreateInput[] = [
      {
        name: "John Doe",
        email: "john@doe.com",
      },
    ];

    userSeed.map(async (user) => {
      await prisma.user.create({
        data: user,
      });
      console.log(`Created user with email: ${user.email}`);
    });

    console.log(`Seeding finished.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
