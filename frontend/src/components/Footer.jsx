import React from 'react';
import { HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#cbd5e1',
      padding: '3rem 0 2rem 0',
      marginTop: 'auto',
      borderTop: '1px solid #1e293b'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              <HeartPulse size={24} color="#3b82f6" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>City Hospital</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '300px' }}>
              Providing 24/7 intelligent patient assistance and visitor information services.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard</a></li>
                <li><a href="/doctors" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Doctors Directory</a></li>
                <li><a href="/departments" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Departments</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Emergency Contact</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>+1-800-555-0911</p>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>24 Hours Toll-Free Hotline</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
          <p>© {new Date().getFullYear()} City Hospital. All rights reserved.</p>
          <p>Phase 1 MVP - Hospital Information Agent</p>
        </div>
      </div>
    </footer>
  );
}
