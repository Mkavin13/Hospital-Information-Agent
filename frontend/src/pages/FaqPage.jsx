import React, { useState, useEffect } from 'react';
import { getFaqs, searchFaqs } from '../services/api';
import FaqItem from '../components/FaqItem';
import SearchBar from '../components/SearchBar';
import { HelpCircle, ShieldAlert } from 'lucide-react';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const categories = ["All", "Visiting", "OPD", "Billing", "Emergency", "General"];

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getFaqs();
      setFaqs(data);
    } catch (err) {
      setErrorMsg("Failed to load FAQs. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (val) => {
    setSearchVal(val);
    setSelectedCategory("All");

    if (!val.trim()) {
      loadFaqs();
      return;
    }

    setLoading(true);
    try {
      const data = await searchFaqs(val);
      setFaqs(data);
    } catch (err) {
      setErrorMsg("Failed to search FAQs.");
    } finally {
      setLoading(false);
    }
  };

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category.toLowerCase() === selectedCategory.toLowerCase());

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
          <HelpCircle size={28} color="var(--primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Find answers regarding hospital visiting rules, billing, OPD hours, and support.</p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Search */}
        <div style={{ maxWidth: '500px' }}>
          <SearchBar 
            value={searchVal}
            onChange={handleSearch}
            placeholder="Search FAQs by question keywords..."
          />
        </div>

        {/* Category Chips */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(c)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  borderRadius: '20px',
                  border: selectedCategory === c ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: selectedCategory === c ? 'var(--primary)' : '#ffffff',
                  color: selectedCategory === c ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {c}
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
          <p>Scanning FAQ Registry...</p>
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

      {/* FAQ Accordion List */}
      {!loading && !errorMsg && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No FAQs found in this category.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))
          )}
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
