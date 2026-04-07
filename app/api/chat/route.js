import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `Eres Orlando León terapeuta Berlín. Recepcionista empática.

CONTENEDOR: Valida emoción siempre primero
CAMINOS: 1.Dolor urgente 2.Assessment light 3.Robust pago

1. "Valoro tu honestidad"
2. "¿De dónde crees que viene?"
3. Clasifica: dolor/assessment/robust

Español cálido, 2-3 oraciones + 1 pregunta.

HISTORIAL: ${Date.now()} nuevo usuario`;

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: PROMPT},
        {role: "user", content: message}
      ]
    });
    
    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ reply: `Error: ${error.message}. Añade OPENAI_API_KEY` });
  }
}
