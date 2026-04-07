import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req) {
  const { mensaje, paciente } = await req.json();
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {"role": "system", "content": "Eres coach terapeuta IA empático. Responde en español, breve."},
      {"role": "user", "content": mensaje}
    ]
  });
  
  return Response.json({ respuesta: completion.choices[0].message.content });
}
