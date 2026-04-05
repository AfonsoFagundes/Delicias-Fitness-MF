"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.admin.create({
        data: {
            username: "admin",
            email: "deliciasmf@gmail.com",
            password: "123456"
        },
    });
    console.log('Seed plantada!');
}
main();
