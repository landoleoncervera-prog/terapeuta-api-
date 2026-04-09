import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { messages } = await request.json();
    
    // PEGA TU KEY AQUÍ EXACTA de openai.com
    const openai = new OpenAI({ 
      apiKey: "sk-proj-TU-KEY-COMPLETA-AQUÍ" 
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });
    
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
