import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, X, Bot, RefreshCw, 
  CornerDownRight, Volume2, ShieldCheck, CheckSquare 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Welcome to Larzoo Intelligent Sourcing! I am your **Larzoo AI Commerce Assistant**.\n\nI can coordinate complex B2B procurement, estimate spot pricing variables across primary farms, retrieve active vendor evaluations, or help you structure custom bulk requisitions.\n\nTry checking our wholesale pricing indexes or ask about bulk delivery terms."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    { label: "1 Ton Wholesale Onions Quote", prompt: "What wholesale spot price can Larzoo guarantee for a 1-ton red onions consignment?" },
    { label: "Daily Hotel Dairy Setup", prompt: "Configure a daily recurring supply of 300 litres of full-cream milk and vegetables for a large hotel." },
    { label: "Wedding Banquets Sourcing", prompt: "Need to source custom biodegradable catering eco-plates for a 1500-guest event." },
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      text: textToSend,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        }),
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'model',
        text: data.text || "I apologize, I lost packet connectivity with the central Larzoo coordination nodes. Could you retry?"
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI assistant API error", error);
      const errMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'model',
        text: "**System Alert**: Our secure servers are currently running in standard local simulation mode.\n\nTo configure live, production-grade Gemini LLM generation, set your `GEMINI_API_KEY` inside the Core Secrets config. In this mode, I can still draft mock contracts and check spot commodities margins!"
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <motion.button
        id="floating-ai-launcher"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-[#00D4FF] to-[#00A99D] rounded-full shadow-[0_8px_30px_rgba(0,212,255,0.4)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.6)] cursor-pointer text-slate-950 flex items-center gap-2 group hover:scale-[1.05] active:scale-95"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Bot className="w-6 h-6 animate-pulse text-slate-950" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-slate-950 font-bold whitespace-nowrap text-xs uppercase tracking-wider">
           Consult Larzoo AI Sourcing
        </span>
      </motion.button>

      {/* Slide-out drawer panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="drawer-ai-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#0F172A]/85 border-l border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between z-50"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0F172A]/85 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/5 border border-white/10 text-[#00D4FF] rounded-xl">
                  <Bot className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Larzoo AI Commerce Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#00D4FF] font-semibold uppercase tracking-wider font-mono">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" /> System Layer Active
                  </div>
                </div>
              </div>
              <button 
                id="btn-close-ai-drawer"
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/5 border border-white/10 hover:border-[#00D4FF]/30 text-slate-300 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat message streams */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {messages.map((m) => {
                const isModel = m.role === 'model';
                return (
                  <div key={m.id} className={`flex gap-3 max-w-[85%] ${isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                    <div className={`p-2.5 h-9 w-9 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs backdrop-blur-md ${
                      isModel ? 'bg-white/5 border border-white/10 text-[#00D4FF]' : 'bg-[#0F172A] text-slate-350 border border-white/10'
                    }`}>
                      {isModel ? <Bot className="w-4 h-4" /> : 'ME'}
                    </div>

                    <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2 border backdrop-blur-md ${
                      isModel ? 'bg-[#0F172A]/70 border-white/10 text-slate-300' : 'bg-gradient-to-r from-[#00D4FF] to-[#00A99D] text-slate-950 border-white/5 font-extrabold'
                    }`}>
                      {/* Simple custom markdown renderer helper for bolding and bullets */}
                      <div className="whitespace-pre-line font-sans">
                        {m.text.split('\n\n').map((paragraph, index) => {
                          // Handle bold elements e.g. **text**
                          let rendered = paragraph;
                          
                          // Quick match bold text
                          const boldRegex = /\*\*(.*?)\*\*/g;
                          const parts = [];
                          let lastIndex = 0;
                          let match;

                          while ((match = boldRegex.exec(paragraph)) !== null) {
                            if (match.index > lastIndex) {
                              parts.push(<span key={lastIndex}>{paragraph.substring(lastIndex, match.index)}</span>);
                            }
                            parts.push(<strong key={match.index} className={isModel ? "text-white font-bold" : "text-slate-955 font-black"}>{match[1]}</strong>);
                            lastIndex = boldRegex.lastIndex;
                          }
                          if (lastIndex < paragraph.length) {
                            parts.push(<span key={lastIndex}>{paragraph.substring(lastIndex)}</span>);
                          }

                          return (
                            <p key={index} className="space-y-1">
                              {parts.length > 0 ? parts : paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="p-2 bg-white/5 border border-white/10 text-[#00D4FF] rounded-xl h-8 w-8 flex items-center justify-center backdrop-blur-md">
                    <Bot className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  </div>
                  <div className="p-4 bg-[#0F172A]/70 border border-white/10 rounded-2xl text-xs text-slate-400 flex items-center gap-2 backdrop-blur-md">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00D4FF]" /> Connecting to trade networks...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* In-drawer Quick suggestions footer */}
            <div className="p-6 border-t border-white/5 space-y-4 bg-slate-950/40">
              
              {messages.length === 1 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">Suggested Consultations:</span>
                  <div className="flex flex-col gap-1.5">
                    {quickPrompts.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q.prompt)}
                        className="text-left text-[11px] p-2.5 bg-white/5 border border-white/10 hover:border-[#00D4FF]/30 hover:bg-white/10 transition-all rounded-xl text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                      >
                        <CornerDownRight className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                        <span className="truncate">{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat action bar */}
              <div className="flex gap-2">
                <input
                  id="assistant-chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Type B2B specs, pricing queries, logistics routing parameters..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D4FF]/50 transition-all font-sans backdrop-blur-md"
                />
                <button
                  id="btn-send-assistant"
                  onClick={() => handleSend(input)}
                  className="p-3.5 bg-gradient-to-r from-[#00D4FF] to-[#00A99D] rounded-xl text-slate-950 font-bold shadow-[0_4px_12px_rgba(0,169,157,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </div>

              <div className="text-[10px] text-slate-600 text-center font-mono uppercase tracking-wider">
                 v0.4 Secure Sourcing API Encrypted
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
