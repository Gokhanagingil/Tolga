'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { MessageCircle, X, Send, Headphones } from 'lucide-react';

export default function ChatWidget() {
  const { chatMessages, chatOpen, toggleChat, addChatMessage } = useAppStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addChatMessage(input.trim(), 'user');
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!chatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-istanbul-navy text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-istanbul-gold rounded-full animate-pulse-slow" />
          <span className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Destek
          </span>
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up"
          style={{ height: '500px', maxHeight: 'calc(100vh - 6rem)' }}
        >
          <div className="bg-istanbul-navy text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-istanbul-sea rounded-full flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Destek Asistanı</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-xs text-gray-300">Otomatik Yanıt</span>
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-istanbul-navy text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Mesajınızı yazın..."
                className="input-field text-sm flex-1"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-11 h-11 bg-istanbul-navy text-white rounded-xl flex items-center justify-center hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {['Fiyat bilgisi', 'Randevu al', 'Bölge önerisi'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => addChatMessage(quick, 'user')}
                  className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full hover:bg-gray-100 transition-all"
                >
                  {quick}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
