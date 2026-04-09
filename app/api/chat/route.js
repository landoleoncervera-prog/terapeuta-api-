export async function POST(request) {
  try {
    const { messages } = await request.json();
    
    // HARDCODE TU KEY (borra después)
    const openai = new OpenAI({ 
      apiKey: "sk-proj-TU-KEY-EXACTA-AQUÍ" 
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt
