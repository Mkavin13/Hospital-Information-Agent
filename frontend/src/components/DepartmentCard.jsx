import React from 'react';
import { Building, MapPin, Clock } from 'lucide-react';

export default function DepartmentCard({ department, onClick }) {
  const { name, description, floorLocation, timings, services } = department;
  const serviceList = services ? services.split(',').map(s => s.trim()) : [];

  return (
    <div className="card animate-slide-up" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      position: 'relative'
    }}>
      {/* Top accent border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'var(--grad-primary)'
      }} />

      <div style={{ marginTop: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{
            backgroundColor: 'var(--primary-light)',
            padding: '0.4rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building size={20} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{name}</h3>
        </div>
        
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          {description}
        </p>

        {/* Floor Location and Timings */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.65rem', 
          marginBottom: '1.5rem', 
          fontSize: '0.85rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
            <MapPin size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Location:</span>
            <span>{floorLocation}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
            <Clock size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Timings:</span>
            <span>{timings}</span>
          </div>
        </div>

        {/* Services Badges */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>Services Offered:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {serviceList.map((service, idx) => (
              <span key={idx} className="badge" style={{ 
                backgroundColor: 'var(--bg-main)', 
                color: 'var(--text-secondary)', 
                fontSize: '0.72rem',
                border: '1px solid var(--border-color)'
              }}>
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {onClick && (
        <button 
          onClick={onClick}
          className="btn btn-secondary" 
          style={{ width: '100%', marginTop: '1.75rem', fontSize: '0.88rem', padding: '0.65rem', borderRadius: '12px' }}
        >
          View Doctors & Details
        </button>
      )}
    </div>
  );
}
