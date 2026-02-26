import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hotelService } from '../services/api';
import { HotelCard } from '../components/HotelCard';
import { PageSpinner } from '../components/Spinner';

const BED_TYPES = ['King', 'Queen', 'Twin', 'Double', 'Single'];

export function HotelsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || searchParams.get('location') || '';

  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('rating');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all hotels
  useEffect(() => {
    setLoading(true);
    hotelService.getAll()
      .then(r => { setHotels(r.data); })
      .catch(() => setError('Failed to load hotels. Please check if the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  // Filter + search + sort
  const applyFilters = useCallback(() => {
    let result = [...hotels];

    // Search
    const q = searchInput.toLowerCase().trim();
    if (q) {
      result = result.filter(h =>
        h.hotelName.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.state.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q)
      );
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(h => parseFloat(h.rating) >= minRating);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      if (sortBy === 'price_asc') return parseFloat(a.minPrice || 0) - parseFloat(b.minPrice || 0);
      if (sortBy === 'price_desc') return parseFloat(b.minPrice || 0) - parseFloat(a.minPrice || 0);
      if (sortBy === 'name') return a.hotelName.localeCompare(b.hotelName);
      return 0;
    });

    setFiltered(result);
  }, [hotels, searchInput, sortBy, minRating]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchInput ? { search: searchInput } : {});
    applyFilters();
  };

  const clearFilters = () => {
    setSearchInput('');
    setSortBy('rating');
    setMinRating(0);
    setSearchParams({});
  };

  const hasActiveFilters = searchInput || minRating > 0 || sortBy !== 'rating';

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem', animation: 'fadeInUp 0.5s ease' }}>
          <p className="section-label">Our Collection</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--cream)',
            marginBottom: '0.5rem',
          }}>
            Luxury <span className="gold-text">Hotels</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            {loading ? 'Loading…' : `${filtered.length} exceptional ${filtered.length === 1 ? 'property' : 'properties'} found`}
          </p>
        </div>

        {/* Search & Filter toolbar */}
        <div style={{
          background: 'var(--glass)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '1.25rem',
          marginBottom: '2rem',
          animation: 'fadeInUp 0.5s ease 0.1s both',
        }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <input
              id="hotel-search-input"
              type="text"
              placeholder="Search hotels, cities, or destinations…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="input-field"
              style={{ flex: '1 1 200px', minWidth: '200px' }}
            />
            <button type="submit" id="hotel-search-btn" className="btn-primary" style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
              🔍 Search
            </button>
            <button
              type="button"
              id="toggle-filters-btn"
              onClick={() => setShowFilters(v => !v)}
              className="btn-ghost"
              style={{ whiteSpace: 'nowrap' }}
            >
              ⚙ Filters {showFilters ? '▲' : '▼'}
            </button>
            {hasActiveFilters && (
              <button type="button" onClick={clearFilters} className="btn-ghost" style={{ color: 'var(--error)', borderColor: 'rgba(252,129,129,0.2)', whiteSpace: 'nowrap' }}>
                ✕ Clear
              </button>
            )}
          </form>

          {/* Expanded Filters */}
          {showFilters && (
            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              animation: 'fadeInUp 0.2s ease',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: '1 1 160px' }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sort By</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field"
                  style={{ background: '#1A1A2E', colorScheme: 'dark' }}
                >
                  <option value="rating">Top Rated</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: '1 1 160px' }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Min Rating: {minRating > 0 ? `${minRating}★` : 'Any'}
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[0, 4, 4.5, 4.8].map(r => (
                    <button key={r} onClick={() => setMinRating(r)} style={{
                      padding: '0.35rem 0.75rem',
                      background: minRating === r ? 'rgba(201,168,76,0.15)' : 'transparent',
                      border: `1px solid ${minRating === r ? 'var(--gold-dark)' : 'var(--border-subtle)'}`,
                      borderRadius: '6px',
                      color: minRating === r ? 'var(--gold-light)' : 'var(--muted)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}>
                      {r === 0 ? 'All' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <PageSpinner />
        ) : error ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: 'var(--glass)', borderRadius: '16px',
            border: '1px solid rgba(252,129,129,0.2)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ color: 'var(--cream)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Connection Error</h3>
            <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: 'var(--glass)', borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏨</div>
            <h3 style={{ color: 'var(--cream)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>No hotels found</h3>
            <p style={{ color: 'var(--muted)', maxWidth: '350px', margin: '0 auto 1.5rem' }}>
              Try a different search term or clear your filters.
            </p>
            <button onClick={clearFilters} className="btn-outline">Clear Filters</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}>
            {filtered.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
