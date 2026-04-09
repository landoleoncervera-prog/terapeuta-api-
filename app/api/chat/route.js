import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(request) {
  try {
    const { input } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: "grok-4.20-reasoning",
      messages: [{ role: "user", content: input }],
    });
    
    return Response.json({ response: response.choices[0].message.content });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
