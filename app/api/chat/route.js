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
      model: "grok-2-latest",
      messages: [
        {role: "system", content: "Eres Orlando Leon, terapeuta en Berlín. Especialista en regulación emocional, nutrición, fitness. Responde en español empático y profesional."},
        {role: "user", content: message}
      ],
      max_tokens: 800
    });
    
    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ reply: `Error Grok: ${error.message}` });
  }
}
