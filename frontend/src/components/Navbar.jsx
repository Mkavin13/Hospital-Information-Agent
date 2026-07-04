import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartPulse, MessageSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: 'var(--text-primary)'
        }}>
          <HeartPulse size={32} color="var(--primary)" />
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>City Hospital</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-4px' }}>Information Agent</p>
          </div>
        </Link>

        {/* Links */}
        <div className="nav-links-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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

          <Link to="/chat" className="btn btn-primary animate-pulse" style={{ borderRadius: '24px', padding: '0.6rem 1.25rem' }}>
            <MessageSquare size={18} />
            Ask AI Assistant
          </Link>
        </div>
      </div>

      <style>{`
        .nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color var(--transition-fast);
          position: relative;
          padding: 0.25rem 0;
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
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--primary);
          border-radius: 2px;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-pulse:hover {
          animation: pulse 1s infinite alternate;
        }
      `}</style>
    </nav>
  );
}
