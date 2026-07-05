import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartPulse, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)'
    }}>
      <div className="container" style={{
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
          <div>
            <h1 style={{ 
              fontSize: '1.35rem', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #1e293b 30%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>City Hospital</h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '-2px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Information Agent</p>
          </div>
        </Link>

        {/* Links */}
        <div className="nav-links-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
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
            transition: 'all 0.25s ease'
          }}>
            <Sparkles size={16} />
            <span>Ask AI Assistant</span>
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
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
        }
        .btn-ai:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4) !important;
          background: var(--primary-hover) !important;
        }
      `}</style>
    </nav>
  );
}
