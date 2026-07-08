// scripts/reset-password.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const email = "mondal@test.com";
    const plainPassword = "12345678";

    const passwordHash = await bcrypt.hash(plainPassword, 10);

    const updated = await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    console.log("পাসওয়ার্ড রিসেট হয়েছে:", updated.email);
    console.log("নতুন হ্যাশ:", passwordHash);
  } catch (err) {
    console.error("এরর হয়েছে:", err);
  } finally {
    await pool.end();
  }
}

main();