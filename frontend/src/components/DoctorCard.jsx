import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

export default function DoctorCard({ doctor }) {
  const { name, specialization, departmentName, availabilityDays, opTimings, roomCabin, isAvailable } = doctor;

  return (
    <div className="card animate-slide-up" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Accent marker */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'var(--grad-primary)'
      }} />

      <div>
        {/* Department & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', marginTop: '0.25rem' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
            {departmentName}
          </span>
          {isAvailable ? (
            <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span className="pulse-dot"></span> Available
            </span>
          ) : (
            <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <XCircle size={12} /> On Leave
            </span>
          )}
        </div>

        {/* Doctor Details */}
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>{name}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '1.25rem' }}>
          {specialization}
        </p>

        {/* Schedule Grid */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.65rem', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '1rem', 
          marginTop: '0.5rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Calendar size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span style={{ fontWeight: 500 }}>{availabilityDays}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Clock size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span style={{ fontWeight: 500 }}>{opTimings}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <MapPin size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{roomCabin}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
