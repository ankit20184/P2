import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const llm = {
  async invoke(prompt: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite", // or the exact Gemini 3.5 Flash model name that works for your account
      contents: prompt,
    });

    return {
      content: response.text ?? "",
    };
  },
};
