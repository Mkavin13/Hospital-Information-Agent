import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HeartPulse, 
  UserRound, 
  Building2, 
  HelpCircle, 
  PhoneCall, 
  MessageSquareShare, 
  Search,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    // Redirect to chat page carrying the user's initial question
    navigate(`/chat?query=${encodeURIComponent(searchVal)}`);
  };

  const navCards = [
    {
      title: "Find Doctors",
      desc: "Search for medical specialists, active timetables, and available cabins.",
      link: "/doctors",
      icon: <UserRound size={32} color="var(--primary)" />,
      badge: "Schedules"
    },
    {
      title: "Hospital Departments",
      desc: "Explore clinical services, floor maps, and opening hours.",
      link: "/departments",
      icon: <Building2 size={32} color="var(--primary)" />,
      badge: "Locations"
    },
    {
      title: "Frequently Asked Questions",
      desc: "Check policies on parking, billings, discharge procedures, and visiting hours.",
      link: "/faqs",
      icon: <HelpCircle size={32} color="var(--primary)" />,
      badge: "FAQ Guides"
    },
    {
      title: "Contact Registry",
      desc: "Get 24/7 emergency numbers, ambulance direct line, and directions.",
      link: "/contact",
      icon: <PhoneCall size={32} color="var(--primary)" />,
      badge: "Emergency Help"
    },
    {
      title: "AI Chatbot Assistant",
      desc: "Ask natural language questions about our hospital and receive instant answers.",
      link: "/chat",
      icon: <MessageSquareShare size={32} color="var(--primary)" />,
      badge: "Conversational AI"
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '3rem 0' }}>
      
      {/* Hero Welcome Segment */}
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 3rem auto',
        padding: '0 1rem'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          backgroundColor: 'var(--primary-light)', 
          padding: '0.4rem 1rem', 
          borderRadius: '20px',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <Sparkles size={16} />
          <span>Intelligent Patient Services - Phase 1</span>
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.2' }}>
          Welcome to the City Hospital Assistant
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Find doctors, check department locations, read hospital policies, and chat with our AI agent to resolve queries instantly.
        </p>

        {/* Global Chat Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            className="form-input"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Ask AI e.g., 'Which cardiologist is available on Monday?' or 'Where is radiology?'"
            style={{
              paddingLeft: '3rem',
              paddingRight: '7rem',
              height: '56px',
              borderRadius: '28px',
              fontSize: '1rem',
              border: '1.5px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <div style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={22} />
          </div>
          <button type="submit" className="btn btn-primary" style={{
            position: 'absolute',
            right: '6px',
            top: '6px',
            height: '44px',
            borderRadius: '22px',
            padding: '0 1.25rem'
          }}>
            Ask Bot
          </button>
        </form>
      </div>

      {/* Navigation Cards Grid */}
      <div className="container">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
          Explore Hospital Directories
        </h3>
        
        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {navCards.map((card, idx) => (
            <div key={idx} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  {card.icon}
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem', fontWeight: 600 }}>
                    {card.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{card.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{card.desc}</p>
              </div>

              <Link to={card.link} className="btn btn-outline" style={{ marginTop: '1.5rem', width: '100%', fontSize: '0.85rem' }}>
                Open Directory
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
