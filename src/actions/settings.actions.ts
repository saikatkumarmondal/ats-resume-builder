"use server";

import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/lib/auth";

type ActionResult = { success: true } | { success: false; error: string };

export async function deleteAccount(): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.user.delete({ where: { id: session.user.id } });
  await signOut({ redirectTo: "/" });

  return { success: true };
}