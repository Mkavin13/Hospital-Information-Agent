import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', position: 'relative' }}>
      <input
        type="text"
        className="form-input"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          paddingLeft: '3rem',
          borderRadius: '30px',
          height: '50px',
          border: '1px solid var(--border-color)',
          fontSize: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '1.25rem',
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={20} />
      </div>
    </form>
  );
}
