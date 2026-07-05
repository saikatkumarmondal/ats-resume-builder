import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME } from "@/config/ai.config";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWithGemini(prompt: string): Promise<string> {
  const response = await genAI.models.generateContent({
    model: GEMINI_MODEL_NAME,
    contents: prompt,
  });

  return response.text ?? "";
}