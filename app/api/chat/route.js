import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json();
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // xai-syumU...
    baseURL: 'https://api.x.ai/v1',     // Grok!
  });
  
  const response = await openai.chat.completions.create({
    model: "grok-2-latest",
    messages: [ /* tu prompt Orlando */ ],
    max_tokens: 300,
    temperature: 0.8
  });
  
  return Response.json({ reply: response.choices[0].message.content });
}
