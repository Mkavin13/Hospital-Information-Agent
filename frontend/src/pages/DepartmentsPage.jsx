import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDepartments } from '../services/api';
import DepartmentCard from '../components/DepartmentCard';
import { Building2, ShieldAlert } from 'lucide-react';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      setErrorMsg("Failed to load departments. Make sure the Spring Boot service is online.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (deptName) => {
    // Redirect to doctors page and filter by department name
    navigate(`/doctors?dept=${encodeURIComponent(deptName)}`);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 0' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{
          backgroundColor: 'var(--primary-light)',
          padding: '0.6rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Building2 size={28} color="var(--primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Hospital Departments</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Explore medical disciplines, physical building locations, and treatments.</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            margin: '0 auto 1rem auto',
            animation: 'spin 0.8s linear infinite'
          }}></div>
          <p>Loading Department Directories...</p>
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

      {/* Departments Grid */}
      {!loading && !errorMsg && (
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          {departments.map((dept) => (
            <DepartmentCard 
              key={dept.id} 
              department={dept} 
              onClick={() => handleCardClick(dept.name)}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
