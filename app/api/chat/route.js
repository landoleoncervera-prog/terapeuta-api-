Reemplaza TODO el código con ESTE:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(request) {
  try {
    const { input } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: "grok-beta", // O tu modelo disponible
      messages: [{ role: "user", content: input }],
    });
    
    return Response.json({ response: response.choices.message.content });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```
