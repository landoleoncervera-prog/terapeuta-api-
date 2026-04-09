export async function POST(request) {
  try {
    const { input } = await request.json();
    
    const response = await fetch('https://api.x.ai/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-4.20-reasoning",
        input: input
      }),
    });
    
    const data = await response.json();
    return Response.json({ response: data.response });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
