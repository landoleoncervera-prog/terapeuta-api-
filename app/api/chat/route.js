import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "grok-3",  // ← CAMBIO AQUÍ
      messages: [
        {role: "system", content: "Eres Orlando Leon terapeuta Berlín. Español empático nutrición fitness."},
        {role: "user", content: message}
      ]
    });
    
    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ reply: "Error: " + error.message });
  }
}
