import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "Eres Orlando León, terapeuta Berlín. Empático, valida emociones, nutrición fitness. Español cálido profesional."
        },
        { role: "user", content: message }
      ]
    });
    
    return NextResponse.json({ 
      reply: response.choices[0].message.content 
    });
  } catch (error) {
    return NextResponse.json({ 
      reply: "Error: Añade OPENAI_API_KEY en Vercel" 
    });
  }
}
