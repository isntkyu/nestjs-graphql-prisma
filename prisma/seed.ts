import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'tony',
    email: 'tony@gmail.com',
    hashedPassword: 'aaaaa',
    posts: {
      create: [
        {
          title: 'PGNP',
          content: 'Prisma GraphQL Nestjs PostgreSQL',
          published: true,
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
