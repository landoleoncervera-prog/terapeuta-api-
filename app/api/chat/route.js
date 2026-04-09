import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // CAMBIA A OPENAI
});

export async function POST(request) {
  try {
    const { messages } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // GRATIS + rápido
      messages: messages,
    });
    
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
