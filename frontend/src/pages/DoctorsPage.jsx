import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDoctors, searchDoctors, getDoctorsByDepartment } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import { Stethoscope, ShieldAlert } from 'lucide-react';

export default function DoctorsPage() {
  const [searchParams] = useSearchParams();
  const [doctorsList, setDoctorsList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const depts = ["All", "Cardiology", "Pediatrics", "Orthopedics", "Radiology", "General Medicine", "Emergency"];

  useEffect(() => {
    const deptParam = searchParams.get('dept');
    if (deptParam) {
      handleDeptSelect(deptParam);
    } else {
      loadDoctors();
    }
  }, [searchParams]);

  const loadDoctors = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getDoctors();
      setDoctorsList(data);
    } catch (err) {
      setErrorMsg("Failed to load doctor database. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (val) => {
    setSearchVal(val);
    setSelectedDept("All"); // Reset department selection on manual search
    
    if (!val.trim()) {
      loadDoctors();
      return;
    }

    setLoading(true);
    try {
      const data = await searchDoctors(val);
      setDoctorsList(data);
    } catch (err) {
      setErrorMsg("Failed to search doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeptSelect = async (dept) => {
    setSelectedDept(dept);
    setSearchVal(""); // Reset search value
    setLoading(true);
    setErrorMsg("");

    try {
      if (dept === "All") {
        const data = await getDoctors();
        setDoctorsList(data);
      } else {
        const data = await getDoctorsByDepartment(dept);
        setDoctorsList(data);
      }
    } catch (err) {
      setErrorMsg(`Failed to load doctors in ${dept} department.`);
    } finally {
      setLoading(false);
    }
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
          <Stethoscope size={28} color="var(--primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Doctors & Medical Specialists</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Find schedules, availability, and cabin details.</p>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '500px' }}>
          <SearchBar 
            value={searchVal}
            onChange={handleSearch}
            placeholder="Search by doctor name, specialty, or department..."
          />
        </div>

        {/* Filter Chips */}
        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
            Filter by Clinical Department:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {depts.map((d, idx) => (
              <button
                key={idx}
                onClick={() => handleDeptSelect(d)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  borderRadius: '20px',
                  border: selectedDept === d ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: selectedDept === d ? 'var(--primary)' : 'var(--card-bg)',
                  color: selectedDept === d ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {d}
              </button>
            ))}
          </div>
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
          <p>Scanning Hospital Registry...</p>
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

      {/* Doctors Grid */}
      {!loading && !errorMsg && (
        <>
          {doctorsList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No doctors found matching your criteria.</p>
              <button className="btn btn-outline" onClick={loadDoctors} style={{ marginTop: '1rem' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {doctorsList.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
        </>
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
