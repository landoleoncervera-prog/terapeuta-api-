import OpenAI from 'openai';

export async function POST(request) {
  try {
    // DEBUG: Ver si key existe
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return Response.json({ error: "OPENAI_API_KEY no encontrada" }, { status: 500 });
    }
    
    const openai = new OpenAI({ apiKey: key });
    const { messages } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });
    
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
