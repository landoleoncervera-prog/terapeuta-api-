export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json();
  return Response.json({ reply: '¡Hola Orlando! Funciona 😎' });
}
