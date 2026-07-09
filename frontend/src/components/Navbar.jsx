import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartPulse, Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <nav style={{
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)',
      transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
    }}>
      <div className="container nav-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          textDecoration: 'none',
          color: 'var(--text-primary)',
          transition: 'transform var(--transition-fast)'
        }} className="brand-logo">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'var(--grad-primary)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            <HeartPulse size={24} color="#ffffff" />
          </div>
          <div className="brand-logo-text">
            <h1 style={{ 
              fontSize: '1.35rem', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>City Hospital</h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '-2px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Information Agent</p>
          </div>
        </Link>

        {/* Links & Actions */}
        <div className="nav-links-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Dashboard
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Doctors
          </NavLink>
          <NavLink to="/departments" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Departments
          </NavLink>
          <NavLink to="/faqs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            FAQs
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Contact
          </NavLink>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
              backgroundColor: 'var(--bg-surface)',
              flexShrink: 0
            }}
            className="btn-theme-toggle"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Dedicated Chat Link Button */}
          <Link to="/chat" className="btn btn-ai animate-glow" style={{ 
            borderRadius: '24px', 
            padding: '0.65rem 1.35rem',
            background: 'var(--grad-primary)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.9rem',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.25s ease',
            flexShrink: 0
          }}>
            <Sparkles size={16} />
            <span className="nav-ai-text">Ask AI</span>
          </Link>
        </div>
      </div>

      <style>{`
        .brand-logo:hover {
          transform: scale(1.02);
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all var(--transition-fast);
          position: relative;
          padding: 0.5rem 0;
          flex-shrink: 0;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-link.active {
          color: var(--primary);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2.5px;
          background: var(--grad-primary);
          border-radius: 2px;
          box-shadow: var(--shadow-glow);
        }
        .btn-ai:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4) !important;
          opacity: 0.95;
        }
        .btn-theme-toggle:hover {
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
          transform: scale(1.05);
        }
        
        /* Mobile Responsiveness Improvements */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.25rem !important;
          }
          .nav-links-wrapper {
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 768px) {
          .nav-links-wrapper {
            gap: 1rem !important;
          }
          .nav-link {
            font-size: 0.85rem !important;
          }
        }
        @media (max-width: 680px) {
          .brand-logo-text p {
            display: none !important;
          }
          .nav-links-wrapper {
            gap: 0.75rem !important;
          }
          .nav-link {
            font-size: 0.8rem !important;
          }
          .btn-ai {
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
          }
        }
        @media (max-width: 580px) {
          .nav-ai-text {
            display: none !important;
          }
          .btn-ai {
            padding: 0.6rem !important;
            border-radius: 50% !important;
          }
          .nav-links-wrapper {
            gap: 0.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .brand-logo-text {
            display: none !important;
          }
          .nav-links-wrapper {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </nav>
  );
}
