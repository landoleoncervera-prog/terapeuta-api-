export async function POST(request) {
  try {
    const { messages } = await request.json();
    const input = messages[messages.length-1].content;
    
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
    return Response.json({ 
      choices: [{
        message: { role: "assistant", content: data.response }
      }]
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
