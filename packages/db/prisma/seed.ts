import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();

  await prisma.order.deleteMany();

  await prisma.customer.deleteMany();

  await prisma.product.deleteMany();

  const products = [];

  for (let i = 0; i < 50; i++) {
    products.push({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement([
        "Electronics",
        "Books",
        "Fashion",
        "Furniture",
        "Sports",
      ]),
      price: Number(
        faker.commerce.price({
          min: 100,
          max: 5000,
        }),
      ),
    });
  }

  await prisma.product.createMany({
    data: products,
  });

  console.log("Products created");
  const customers = [];

  for (let i = 0; i < 100; i++) {
    customers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      country: "India",
    });
  }

  await prisma.customer.createMany({
    data: customers,
  });

  const dbCustomers = await prisma.customer.findMany();

  const dbProducts = await prisma.product.findMany();
  for (let i = 0; i < 1000; i++) {
    const customer = faker.helpers.arrayElement(dbCustomers);

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        status: faker.helpers.arrayElement([
          "Pending",
          "Completed",
          "Cancelled",
        ]),
        total: 0,
      },
    });

    let total = 0;

    const itemCount = faker.number.int({
      min: 1,
      max: 5,
    });

    for (let j = 0; j < itemCount; j++) {
      const product = faker.helpers.arrayElement(dbProducts);

      const quantity = faker.number.int({
        min: 1,
        max: 4,
      });

      const price = product.price;

      total += quantity * price;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity,
          price,
        },
      });
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        total,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seed completed");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
