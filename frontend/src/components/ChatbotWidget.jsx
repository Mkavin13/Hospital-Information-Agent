import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, HeartPulse, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/api';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am the City Hospital Assistant. Ask me anything about our doctors, departments, timings, or FAQs.", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    if (!textToSend) setInputValue("");
    
    // Append User Message
    setMessages(prev => [...prev, { text: query, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query);
      setMessages(prev => [...prev, { 
        text: response.answer, 
        isBot: true,
        source: response.source 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I apologize, but I am having trouble reaching the server. Please verify your connection or try again shortly.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  const suggestions = [
    "Who is the cardiologist?",
    "Visiting hours",
    "Where is radiology?",
    "Emergency number"
  ];

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, fontFamily: 'var(--font-body)' }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Floating Chat Overlay */}
      {isOpen && (
        <div style={{
          width: '380px',
          height: '520px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'bubblePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            padding: '1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <HeartPulse size={24} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>Hospital Assistant</h3>
                <span style={{ fontSize: '0.75rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#4ade80', borderRadius: '50%', display: 'inline-block' }}></span>
                  AI Agent Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                opacity: 0.85
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.85'}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.isBot ? "chat-bubble chat-bubble-bot" : "chat-bubble chat-bubble-user"}
                style={{
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  position: 'relative'
                }}
              >
                <div>{msg.text}</div>
                {msg.isBot && msg.source && (
                  <span style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    textAlign: 'right',
                    marginTop: '0.25rem',
                    fontWeight: 500
                  }}>
                    Source: {msg.source}
                  </span>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="chat-bubble chat-bubble-bot" style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '14px' }}>
                  <span className="dot" style={{ animationDelay: '0s' }}></span>
                  <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                  <span className="dot" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions if user is starting */}
          {messages.length === 1 && (
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                <Sparkles size={12} color="var(--primary)" />
                <span>Suggested Queries:</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.65rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '16px',
                      backgroundColor: '#f1f5f9',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: '0.85rem 1rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: '#ffffff',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              className="form-input"
              placeholder="Ask a hospital question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              style={{
                flex: 1,
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                border: '1px solid var(--border-color)'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: (isLoading || !inputValue.trim()) ? 'var(--border-color)' : 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                cursor: (isLoading || !inputValue.trim()) ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .dot {
          width: 6px;
          height: 6px;
          background-color: var(--text-secondary);
          border-radius: 50%;
          display: inline-block;
          animation: dotBounce 1.4s infinite ease-in-out both;
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
