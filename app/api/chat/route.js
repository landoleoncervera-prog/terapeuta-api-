import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "Eres Orlando Leon, terapeuta profesional en Berlín. Especialista en regulación emocional, nutrición y coaching. Hablas español natural, empático y profesional. Ayudas con terapia, dietas y fitness."
        },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });
    
    return NextResponse.json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    return NextResponse.json({ 
      reply: "Error: Verifica tu clave OpenAI. " + error.message 
    }, { status: 500 });
  }
}
