import { prisma } from "@/lib/prisma";
import { AI_DAILY_REQUEST_LIMIT } from "@/config/ai.config";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function checkAiRateLimit(userId: string): Promise<RateLimitResult> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const requestCount = await prisma.aIHistory.count({
    where: { userId, createdAt: { gte: startOfDay } },
  });

  return {
    allowed: requestCount < AI_DAILY_REQUEST_LIMIT,
    remaining: Math.max(0, AI_DAILY_REQUEST_LIMIT - requestCount),
  };
}