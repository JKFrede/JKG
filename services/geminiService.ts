
import { GoogleGenAI } from "@google/genai";

export const getSecurityInsight = async (algorithm: string, context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a very brief security insight (max 2 sentences) about using ${algorithm} for the following context: "${context}". Mention if it's considered safe by modern standards.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to provide AI insights at this moment.";
  }
};
