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
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    navigate(`/chat?query=${encodeURIComponent(searchVal)}`);
  };

  const navCards = [
    {
      title: "Find Doctors",
      desc: "Search for medical specialists, active timetables, and available cabins.",
      link: "/doctors",
      icon: <UserRound size={24} color="var(--primary)" />,
      badge: "Schedules"
    },
    {
      title: "Hospital Departments",
      desc: "Explore clinical services, floor maps, and opening hours.",
      link: "/departments",
      icon: <Building2 size={24} color="var(--primary)" />,
      badge: "Locations"
    },
    {
      title: "Frequently Asked Questions",
      desc: "Check policies on parking, billings, discharge procedures, and visiting hours.",
      link: "/faqs",
      icon: <HelpCircle size={24} color="var(--primary)" />,
      badge: "FAQ Guides"
    },
    {
      title: "Contact Registry",
      desc: "Get 24/7 emergency numbers, ambulance direct line, and directions.",
      link: "/contact",
      icon: <PhoneCall size={24} color="var(--primary)" />,
      badge: "Emergency Help"
    },
    {
      title: "AI Chatbot Assistant",
      desc: "Ask natural language questions about our hospital and receive instant answers.",
      link: "/chat",
      icon: <MessageSquareShare size={24} color="var(--primary)" />,
      badge: "Conversational AI"
    }
  ];

  return (
    <div className="animate-fade-in" style={{ 
      padding: '4rem 0 6rem 0',
      background: 'radial-gradient(circle at 10% 20%, rgba(239, 246, 255, 0.5) 0%, rgba(255, 255, 255, 0) 80%)',
      minHeight: '100%'
    }}>
      
      {/* Hero Welcome Segment */}
      <div style={{
        textAlign: 'center',
        maxWidth: '850px',
        margin: '0 auto 4.5rem auto',
        padding: '0 1.5rem'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'var(--grad-primary-light)', 
          padding: '0.5rem 1.25rem', 
          borderRadius: '30px',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          boxShadow: '0 4px 10px rgba(37, 99, 235, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.15)'
        }}>
          <Sparkles size={14} className="animate-pulse" />
          <span>Intelligent Patient Services Hub</span>
        </div>
        
        <h2 style={{ 
          fontSize: '3rem', 
          fontWeight: 800, 
          color: 'var(--text-primary)', 
          marginBottom: '1.25rem', 
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #0f172a 30%, #2563eb 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to the City Hospital Assistant
        </h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          maxWidth: '650px',
          margin: '0 auto 2.5rem auto'
        }}>
          Find doctors, check department locations, read hospital policies, and chat with our AI agent to resolve queries instantly.
        </p>

        {/* Global Chat Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-bar-wrapper" style={{
          position: 'relative',
          maxWidth: '650px',
          margin: '0 auto',
          transition: 'all 0.3s'
        }}>
          <input
            type="text"
            className="form-input"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Ask AI e.g., 'Which cardiologist is available on Monday?' or 'Where is radiology?'"
            style={{
              paddingLeft: '3.5rem',
              paddingRight: '8.5rem',
              height: '62px',
              borderRadius: '31px',
              fontSize: '1.05rem',
              border: '1.5px solid rgba(226, 232, 240, 0.8)',
              boxShadow: 'var(--shadow-md)',
              background: '#ffffff',
              transition: 'all 0.3s ease'
            }}
          />
          <div style={{
            position: 'absolute',
            left: '1.35rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={24} />
          </div>
          <button type="submit" className="btn btn-primary btn-search-submit" style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            height: '46px',
            borderRadius: '23px',
            padding: '0 1.75rem',
            background: 'var(--grad-primary)',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)',
            border: 'none',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Ask Bot
          </button>
        </form>
      </div>

      {/* Navigation Cards Grid */}
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '2rem',
          borderBottom: '1.5px solid rgba(226, 232, 240, 0.5)',
          paddingBottom: '1rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Explore Hospital Directories
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Select a directory below to browse schedules, department info, FAQs, or contact details.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {navCards.map((card, idx) => (
            <div key={idx} className="card dashboard-card" style={{
              minHeight: '260px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    background: 'var(--primary-light)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.05)'
                  }}>
                    {card.icon}
                  </div>
                  <span className="badge badge-primary" style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    padding: '0.35rem 0.85rem'
                  }}>
                    {card.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {card.desc}
                </p>
              </div>

              <Link to={card.link} className="btn btn-outline card-btn" style={{ 
                marginTop: '2rem', 
                width: '100%', 
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '12px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease'
              }}>
                <span>Open Directory</span>
                <ArrowRight size={16} className="arrow-icon" style={{ transition: 'transform 0.2s ease' }} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .search-bar-wrapper input:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.15) !important;
          transform: translateY(-1px);
        }
        .btn-search-submit:hover {
          background: var(--primary-hover) !important;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35) !important;
          transform: translateY(-1px);
        }
        .dashboard-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .dashboard-card:hover {
          border-color: rgba(37, 99, 235, 0.25) !important;
        }
        .dashboard-card:hover .card-btn {
          background-color: var(--primary) !important;
          color: white !important;
          border-color: var(--primary) !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
        }
        .dashboard-card:hover .arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
