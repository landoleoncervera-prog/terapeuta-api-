'use client';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('¡Hola! Soy tu IA terapeuta Orlando. Cuéntame qué te pasa...');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setReply('Estoy pensando... 🧠');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      const data = await res.json();
      setReply(data.reply || 'No pude conectar con OpenAI. Verifica tu clave.');
    } catch (error) {
      setReply('Error de conexión. Intenta de nuevo.');
    }
    
    setLoading(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
          🧠 Terapeuta IA Orlando
        </h1>
        <p className="text-xl text-white/90 max-w-md mx-auto">
          Tu coach emocional, nutrición y fitness en Berlín
        </p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl border border-white/20 shadow-2xl">
        <div className="mb-8 p-6 bg-white/20 rounded-2xl min-h-[150px] flex items-end">
          <div className="text-lg text-white leading-relaxed">{reply}</div>
        </div>
        
        <div className="flex gap-3">
          <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="¿Cómo te sientes hoy? ¿Ansiedad, dieta, emociones...?"
            className="flex-1 p-5 rounded-2xl bg-white/30 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            disabled={loading}
          />
          <button 
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="px-8 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-lg transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🤔' : 'Enviar'}
          </button>
        </div>
        
        <p className="text-center mt-6 text-white/60 text-sm">
          Powered by GPT-4o • Berlín 2026
        </p>
      </div>
    </div>
  );
}
