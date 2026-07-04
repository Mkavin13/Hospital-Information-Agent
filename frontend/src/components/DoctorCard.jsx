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
      {/* Blue line marker */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'var(--primary)'
      }} />

      <div>
        {/* Department & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.25rem' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
            {departmentName}
          </span>
          {isAvailable ? (
            <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle size={12} /> Available
            </span>
          ) : (
            <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <XCircle size={12} /> On Leave
            </span>
          )}
        </div>

        {/* Doctor Details */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{name}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 500, marginBottom: '1rem' }}>
          {specialization}
        </p>

        {/* Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Calendar size={15} style={{ color: 'var(--text-muted)' }} />
            <span>{availabilityDays}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Clock size={15} style={{ color: 'var(--text-muted)' }} />
            <span>{opTimings}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <MapPin size={15} style={{ color: 'var(--text-muted)' }} />
            <span>{roomCabin}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
