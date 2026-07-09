import React, { useState, useEffect } from 'react';
import { getContact } from '../services/api';
import { Phone, Mail, MapPin, Clock, ShieldAlert, Navigation } from 'lucide-react';

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getContact();
      setContacts(data);
    } catch (err) {
      setErrorMsg("Failed to load contact information. Make sure the database seeds are deployed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 0' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <div style={{
          backgroundColor: 'var(--primary-light)',
          padding: '0.6rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Phone size={28} color="var(--primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Contact & Helplines</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Get 24/7 assistance, locate coordinates, and review visiting policies.</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            margin: '0 auto 1rem auto'
          }}></div>
          <p>Retrieving Helpline Data...</p>
        </div>
      )}

      {/* Error State */}
      {errorMsg && !loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fee2e2',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          color: '#b91c1c',
          marginBottom: '2rem'
        }}>
          <ShieldAlert size={24} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Content Layout */}
      {!loading && !errorMsg && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem'
        }}>
          
          {/* Helplines and General Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Helpline Directory</h3>

            {contacts.map((c) => {
              const isEmergency = c.phoneType.toLowerCase().includes("emergency");
              return (
                <div key={c.id} className="card" style={{
                  borderLeft: isEmergency ? '4px solid var(--accent)' : '4px solid var(--primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{c.phoneType}</h4>
                    {isEmergency && (
                      <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.7rem' }}>
                        Critical Care
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={16} color={isEmergency ? "var(--accent)" : "var(--primary)"} />
                      <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{c.phoneNumber}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={15} color="var(--text-muted)" />
                      <span>{c.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                      <MapPin size={15} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span>{c.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                      <Clock size={15} color="var(--text-muted)" />
                      <span>Hours: {c.visitingHours}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Location & Directions Map Placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Location & Directions</h3>
            
            <div className="card" style={{
              flex: 1,
              backgroundColor: 'var(--bg-main)',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px dashed var(--border-color)',
              padding: '2rem',
              textAlign: 'center',
              gap: '1rem',
              backgroundImage: 'radial-gradient(var(--border-color) 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
            }}>
              <div style={{
                backgroundColor: 'var(--primary-light)',
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Navigation size={32} color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Interactive Google Map</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: '1.5' }}>
                  City Hospital, 100 Medical Plaza Way. Map embedding and routing directions will be finalized in Phase 2.
                </p>
              </div>
              <button className="btn btn-outline" disabled style={{ fontSize: '0.85rem' }}>
                Open in Google Maps (Coming Soon)
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
