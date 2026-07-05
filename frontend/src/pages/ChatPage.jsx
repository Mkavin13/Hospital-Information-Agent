import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendChatMessage } from '../services/api';
import { MessageSquare, Send, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([
    { text: "Hello! I am the City Hospital AI assistant. How can I help you today? You can ask about doctor schedules, departments, floor coordinates, emergency numbers, or hospital FAQs.", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Check if an initial search query was forwarded from the dashboard
    const initialQuery = searchParams.get('query');
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
    }
  }, [searchParams]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    if (!textToSend) setInputValue("");
    setErrorMsg("");

    // Append user query
    setMessages(prev => [...prev, { text: messageText, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(messageText);
      setMessages(prev => [...prev, {
        text: response.answer,
        isBot: true,
        source: response.source,
        matchedIntent: response.matchedIntent
      }]);
    } catch (err) {
      setErrorMsg("Unable to transmit message to backend server. Make sure the Spring Boot service is active.");
      setMessages(prev => [...prev, {
        text: "I apologize, but I failed to communicate with the hospital network. Please try again shortly.",
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

  const suggestionPills = [
    "Who is the cardiologist available on Monday?",
    "Where is the radiology department?",
    "What are the general ward visiting hours?",
    "What is the emergency hotline number?",
    "Is parking available at the hospital?",
    "Where is the billing desk located?"
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 76px)', boxSizing: 'border-box', minHeight: '500px' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: 'var(--primary-light)',
            padding: '0.6rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <MessageSquare size={28} color="var(--primary)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI Assistant Workspace</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Phase 1 Hybrid Context Chatbot (Gemini / Llama 3)</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#e2e8f0', padding: '0.4rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
          <span>Online Directory Mode</span>
        </div>
      </div>

      {/* Main Chat Workspace Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gap: '2rem',
        flex: 1,
        minHeight: 0 // Crucial for overflow scroll to work in grid children
      }}>
        
        {/* Chat Conversation Console */}
        <div className="chat-container" style={{ height: '100%', borderRadius: 'var(--radius-lg)' }}>
          
          {/* Scrollable Message Box */}
          <div style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.isBot ? "chat-bubble chat-bubble-bot" : "chat-bubble chat-bubble-user"}
                style={{
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  marginBottom: '1rem'
                }}
              >
                <div>{msg.text}</div>
                {msg.isBot && msg.source && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.5rem',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: '0.25rem',
                    fontWeight: 500
                  }}>
                    <span>Intent: {msg.matchedIntent || 'general'}</span>
                    <span>Source: {msg.source}</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="chat-bubble chat-bubble-bot" style={{ alignSelf: 'flex-start', padding: '0.85rem 1.1rem' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '14px' }}>
                  <span className="dot" style={{ animationDelay: '0s' }}></span>
                  <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                  <span className="dot" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Network Connection Error Panel */}
          {errorMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fee2e2',
              borderTop: '1px solid #fecaca',
              padding: '0.75rem 1.25rem',
              color: '#b91c1c',
              fontSize: '0.85rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Console Text Entry */}
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: '#ffffff',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              className="form-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              placeholder="Ask the chatbot about doctors, timings, rooms, or policies..."
              style={{
                flex: 1,
                borderRadius: '30px',
                paddingLeft: '1.25rem',
                height: '48px',
                border: '1.5px solid var(--border-color)',
                fontSize: '0.95rem'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              style={{
                height: '46px',
                padding: '0 1.5rem',
                borderRadius: '23px',
                backgroundColor: (isLoading || !inputValue.trim()) ? 'var(--border-color)' : 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                cursor: (isLoading || !inputValue.trim()) ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 500,
                transition: 'background-color 0.2s'
              }}
            >
              <span>Send</span>
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Query Suggestions / Policy Info Panel */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          height: '100%',
          overflowY: 'auto'
        }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="var(--primary)" />
              <span>Suggested Queries</span>
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Click any chip to query the database and trigger the AI context generation engine automatically:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {suggestionPills.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.15s',
                    lineHeight: '1.4'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.25rem',
            marginTop: 'auto'
          }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <HelpCircle size={16} />
              <span>Chatbot Scope</span>
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              In Phase 1, the AI agent is trained exclusively on internal hospital datasets. Queries concerning recipes, code, general trivia, or external matters will return polite out-of-scope notifications.
            </p>
          </div>
        </div>

      </div>

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
