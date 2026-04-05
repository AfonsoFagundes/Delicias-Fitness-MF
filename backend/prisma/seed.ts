import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {
  await prisma.admin.create({
    data: {
        username: "admin", 
        email: "deliciasmf@gmail.com", 
        password: "123456"
    },
  });
  console.log('Seed plantada!')
}

main();