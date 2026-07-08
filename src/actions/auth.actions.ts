"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/schemas/auth.schema";
import { signOut } from "@/lib/auth";


type ActionResult = { success: true } | { success: false; error: string };

function normalizeSignInResult(result: unknown) {
  if (typeof result === "string") {
    try {
      const url = new URL(result, "http://localhost");
      const error = url.searchParams.get("error");
      if (error) {
        return {
          ok: false,
          error: error === "CredentialsSignin" ? "Invalid email or password" : error,
        };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Invalid email or password" };
    }
  }

  if (!result || typeof result !== "object") {
    return { ok: false, error: "Invalid email or password" };
  }

  const authResult = result as { ok?: boolean; error?: string };
  if (authResult.error) {
    return {
      ok: false,
      error: authResult.error === "CredentialsSignin" ? "Invalid email or password" : authResult.error,
    };
  }

  return { ok: authResult.ok ?? false, error: authResult.ok ? undefined : "Invalid email or password" };
}

export async function loginUser(input: LoginInput): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const result = await signIn("credentials", {
    email: parsed.data.email.toLowerCase().trim(),
    password: parsed.data.password,
    redirect: false,
  });

  const normalized = normalizeSignInResult(result);
  if (!normalized.ok) {
    return { success: false, error: normalized.error ?? "Invalid email or password" };
  }

  return { success: true };
}

export async function registerUser(input: RegisterInput): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return { success: false, error: "An account with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "An account with this email already exists" };
    }
    throw error;
  }

  return { success: true };
}

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}