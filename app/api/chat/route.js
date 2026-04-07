import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // ← Tu key aquí
  baseURL: process.env.XAI_API_KEY ? 'https://api.x.ai/v1' : undefined,
});

export async function POST(req) {
  try {
    const { message, userId = 'default' } = await req.json();
    
    // LEE TU PROMPT MAESTRO
    const promptPath = path.join(process.cwd(), 'app/api/chat/PROMPT.md');
    const basePrompt = fs.readFileSync(promptPath, 'utf8');
    
    const systemPrompt = `${basePrompt}

CONTEXTO PACIENTE: Nuevo usuario
HISTORIAL: Primera conversación
Usuario ID: ${userId}

FORMATO RESPUESTA:
Respuesta: [texto humano]
Camino: "dolor" | "assessment" | "robust"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // GRATIS OpenAI
      messages: [
        {role: "system", content: systemPrompt},
        {role: "user", content: message}
      ],
      max_tokens: 400
    });
    
    return NextResponse.json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    return NextResponse.json({ 
      reply: `Error: ${error.message}. Añade OPENAI_API_KEY` 
    });
  }
}
