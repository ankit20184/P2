import { prisma } from "./client";

async function main() {
  const customers = await prisma.customer.findMany();

  console.log(customers);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
