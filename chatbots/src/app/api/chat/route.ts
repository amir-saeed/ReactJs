import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 🧩 Inject Healthcare system instruction
    const systemPrompt = {
      role: "system",
      content: `
        You are a helpful and knowledgeable Healthcare Assistant named "CareMate".
        You provide accurate, up-to-date, and safe health-related information only.
        You do NOT provide medical diagnoses or prescriptions.
        You always advise users to consult qualified doctors for serious or personal medical concerns.
        Keep answers concise, factual, and easy for non-experts to understand.
        Your tone is caring, calm, and professional.
      `,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemPrompt, ...messages],
      temperature: 0.4, // more factual and consistent
    });

    const reply = completion.choices[0].message?.content || "No response";
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

