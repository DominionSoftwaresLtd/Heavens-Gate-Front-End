import React, { useState } from 'react';
import { Bot, Sparkles, Send, X } from 'lucide-react';
import { api } from '../services/api.js';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  category?: string;
  relatedModule?: string;
}

export const AiAssistantModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Shalom and welcome! I am the Heavens Gate Digital Assistant, grounded in the official guidelines and policies of our prayer mountain in Gilgil, Nakuru County. How may I guide your visit today?'
    }
  ]);

  const quickQuestions = [
    'Can I bring food or fruits?',
    'What is the dress code?',
    'What should I pack?',
    'How do I get there from Nairobi?',
    'What are the room prices?'
  ];

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q) return;

    const userMsg: Message = { id: `usr-${Date.now()}`, sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.askAI(q);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: res.answer,
        category: res.category,
        relatedModule: res.relatedModule
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to reach the knowledge base right now. Please ask our reception officers or contact 0722 000 000.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-orange-500 rounded-3xl max-w-xl w-full h-[620px] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header in Vivid Orange */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-cinzel font-bold text-white text-base">Ask Heavens Gate AI</h3>
                <span className="text-[10px] bg-white text-orange-700 px-2 py-0.5 rounded-full font-bold">
                  Official Gilgil Rules
                </span>
              </div>
              <p className="text-xs text-orange-100">Grounded institutional visitor knowledge base</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick prompt pills */}
        <div className="p-2.5 bg-orange-50/60 border-b border-orange-100 flex items-center space-x-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-orange-800 text-[11px] shrink-0 font-bold flex items-center pl-1">
            <Sparkles className="w-3 h-3 text-orange-600 mr-1" /> Quick:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="shrink-0 bg-white hover:bg-orange-100 text-slate-700 hover:text-orange-800 px-3 py-1 rounded-full border border-orange-200 transition text-xs font-medium shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-orange-600 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="flex items-center space-x-1.5 text-orange-600 text-xs font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Heavens Gate Assistant</span>
                    {msg.category && (
                      <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.2 rounded font-semibold ml-1">
                        {msg.category}
                      </span>
                    )}
                  </div>
                )}
                <div>{msg.text}</div>
                {msg.relatedModule && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-orange-700 font-bold">
                    📌 Relevant Section: {msg.relatedModule}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-3 text-xs text-orange-600 font-bold flex items-center space-x-2 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce [animation-delay:0.4s]"></span>
                <span>Searching verified Gilgil policies...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about fasting, gate hours, rooms, travel..."
            className="flex-1 bg-slate-50 border border-slate-300 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white p-2.5 rounded-xl font-bold transition flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
