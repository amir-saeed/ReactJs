import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
  
    const systemPrompt = {
      role: "system",
      content: `
          You are a healthcare information assistant named "CareMate".
          You must only answer questions related to health, medicine, wellness, nutrition, or the human body.
          If the question is not about health, reply with:
          "I'm sorry, I can only provide information about healthcare topics."
          Never discuss politics, technology, or unrelated subjects.
        `,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemPrompt, ...messages],
      temperature: 0.4,
    });

    const reply = completion.choices[0].message?.content || "No response";
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
