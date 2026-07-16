"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@repo/db");
async function main() {
    const users = await db_1.prisma.user.findMany();
    console.log(users);
}
main();
