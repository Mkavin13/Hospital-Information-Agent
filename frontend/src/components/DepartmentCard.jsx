import React from 'react';
import { Building } from 'lucide-react';

export default function DepartmentCard({ department, onClick }) {
  const { name, description, floorLocation, timings, services } = department;
  const serviceList = services ? services.split(',').map(s => s.trim()) : [];

  return (
    <div className="card animate-slide-up" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Building size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.25rem' }}>{name}</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {description}
        </p>

        {/* Floor Location and Timings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>Location:</span>
            <span>{floorLocation}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>Timings:</span>
            <span>{timings}</span>
          </div>
        </div>

        {/* Services Badges */}
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Services Offered:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {serviceList.map((service, idx) => (
              <span key={idx} className="badge" style={{ backgroundColor: '#f1f5f9', color: '#334155', fontSize: '0.7rem' }}>
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
          style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.5rem' }}
        >
          View Doctors & Details
        </button>
      )}
    </div>
  );
}
