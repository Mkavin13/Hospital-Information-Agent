import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FaqItem({ faq }) {
  const { question, answer, category } = faq;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card" style={{
      padding: '1.25rem',
      cursor: 'pointer',
      borderLeft: isOpen ? '4px solid var(--primary)' : '1px solid var(--border-color)',
      backgroundColor: isOpen ? 'var(--primary-light)' : 'var(--card-bg)',
      transition: 'all var(--transition-fast)'
    }} onClick={() => setIsOpen(!isOpen)}>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <HelpCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>{category}</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{question}</h4>
          </div>
        </div>
        <div>
          {isOpen ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
        </div>
      </div>

      {isOpen && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          animation: 'fadeIn var(--transition-fast)'
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}
