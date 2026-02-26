import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PageSpinner } from '../components/Spinner';
import { useToast } from '../components/Toast';

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

const STATUS_STYLE = {
  CONFIRMED: { bg: 'rgba(72,187,120,0.12)', border: 'rgba(72,187,120,0.3)', color: '#68D391' },
  PENDING: { bg: 'rgba(246,173,85,0.12)', border: 'rgba(246,173,85,0.3)', color: '#F6AD55' },
  CANCELLED: { bg: 'rgba(252,129,129,0.12)', border: 'rgba(252,129,129,0.3)', color: '#FC8181' },
  COMPLETED: { bg: 'rgba(100,210,255,0.12)', border: 'rgba(100,210,255,0.3)', color: '#63B3ED' },
};

function BookingCard({ booking }) {
  const status = (booking.bookingStatus || 'CONFIRMED').toUpperCase();
  const style = STATUS_STYLE[status] || STATUS_STYLE.CONFIRMED;
  const nights = booking.totalNights || 1;

  const fmt = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'var(--transition)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Header stripe */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.05rem',
            color: 'var(--cream)', fontWeight: 700, marginBottom: '0.15rem',
          }}>{booking.hotelName}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
            📍 {booking.hotelCity}
          </p>
        </div>
        <div style={{
          padding: '0.3rem 0.8rem',
          background: style.bg,
          border: `1px solid ${style.border}`,
          borderRadius: '999px',
          color: style.color,
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {status}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {/* Dates row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Check-In</p>
            <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem' }}>{fmt(booking.checkInDate)}</p>
          </div>
          <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700 }}>{nights}N</div>
            <div style={{ fontSize: '1.2rem' }}>→</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Check-Out</p>
            <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem' }}>{fmt(booking.checkOutDate)}</p>
          </div>
        </div>

        {/* Rooms */}
        {booking.rooms && booking.rooms.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {booking.rooms.map((r, i) => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                color: 'var(--muted)',
              }}>🛏️ {r.roomType || `Room ${r.roomId}`}</span>
            ))}
          </div>
        )}

        {booking.specialRequests && (
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
            💬 {booking.specialRequests}
          </p>
        )}

        {/* Footer row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Booking Ref</p>
            <p style={{
              fontFamily: 'monospace',
              color: 'var(--gold-light)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
            }}>{booking.bookingReference}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Total Amount</p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem', fontWeight: 700,
              color: 'var(--gold)',
            }}>₹{Math.round(booking.totalAmount || 0).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }

    bookingService.getByUserId(user.id)
      .then(r => setBookings(r.data))
      .catch(() => addToast('Could not load bookings', 'error'))
      .finally(() => setLoading(false));
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) return null;

  const filtered = filter === 'all' ? bookings
    : bookings.filter(b => (b.bookingStatus || 'CONFIRMED').toUpperCase() === filter.toUpperCase());

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => (b.bookingStatus || '').toUpperCase() === 'CONFIRMED').length,
    totalSpent: bookings.reduce((s, b) => s + parseFloat(b.totalAmount || 0), 0),
    nights: bookings.reduce((s, b) => s + (b.totalNights || 0), 0),
  };

  return (
    <div className="page-wrapper" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem',
          animation: 'fadeInUp 0.5s ease',
        }}>
          <div>
            <p className="section-label">My Account</p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700, color: 'var(--cream)',
            }}>
              Welcome, <span className="gold-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>{user?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/hotels" id="browse-hotels-dash-btn" className="btn-primary" style={{ fontSize: '0.875rem' }}>
              + New Booking
            </Link>
            <button id="logout-dash-btn" onClick={() => { logout(); navigate('/'); addToast('Signed out. See you soon!', 'info'); }}
              className="btn-ghost" style={{ fontSize: '0.875rem', color: 'var(--error)', borderColor: 'rgba(252,129,129,0.2)' }}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.25rem', marginBottom: '2.5rem',
          animation: 'fadeInUp 0.5s ease 0.1s both',
        }}>
          {[
            { label: 'Total Bookings', value: stats.total, icon: '📋', color: 'var(--gold)' },
            { label: 'Confirmed', value: stats.confirmed, icon: '✅', color: 'var(--success)' },
            { label: 'Nights Stayed', value: stats.nights, icon: '🌙', color: '#63B3ED' },
            { label: 'Total Spent', value: `₹${Math.round(stats.totalSpent).toLocaleString('en-IN')}`, icon: '💰', color: 'var(--gold-light)', small: true },
          ].map(({ label, value, icon, color, small }) => (
            <div key={label} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              border: '1px solid var(--border-subtle)', borderRadius: '16px',
              padding: '1.5rem 1.25rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: small ? '1.25rem' : '2rem',
                fontWeight: 700, color, marginBottom: '0.25rem',
              }}>{value}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Bookings section */}
        <div style={{ animation: 'fadeInUp 0.5s ease 0.2s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--cream)', fontWeight: 700 }}>
              My Bookings
            </h2>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['all', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map(f => (
                <button key={f} id={`filter-${f.toLowerCase()}`} onClick={() => setFilter(f)} style={{
                  padding: '0.3rem 0.8rem',
                  background: filter === f ? 'rgba(201,168,76,0.12)' : 'transparent',
                  border: `1px solid ${filter === f ? 'var(--gold-dark)' : 'var(--border-subtle)'}`,
                  borderRadius: '999px',
                  color: filter === f ? 'var(--gold-light)' : 'var(--muted)',
                  fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'var(--transition)', textTransform: 'capitalize',
                }}>
                  {f === 'all' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <PageSpinner />
          ) : filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '4rem 2rem',
              background: 'var(--glass)', border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
            }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏨</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                {filter === 'all' ? 'No bookings yet' : `No ${filter.toLowerCase()} bookings`}
              </h3>
              <p style={{ color: 'var(--muted)', maxWidth: '360px', margin: '0 auto 2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {filter === 'all'
                  ? 'Discover our luxury hotels and create your first memorable stay.'
                  : 'Try a different filter to see your bookings.'}
              </p>
              {filter === 'all' && (
                <Link to="/hotels" className="btn-primary">Browse Hotels</Link>
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {filtered.map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
          )}
        </div>

        {/* Profile section */}
        <div style={{
          marginTop: '3rem',
          background: 'var(--glass)', border: '1px solid var(--border-subtle)',
          borderRadius: '20px', padding: '2rem',
          animation: 'fadeInUp 0.5s ease 0.3s both',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--cream)', fontWeight: 700, marginBottom: '1.25rem' }}>
            Profile Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Full Name', value: user?.name, icon: '👤' },
              { label: 'Email', value: user?.email, icon: '📧' },
              { label: 'Phone', value: user?.phone || 'Not provided', icon: '📞' },
              { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '2024', icon: '🗓️' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{
                padding: '1rem', background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)', borderRadius: '10px',
              }}>
                <p style={{ color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {icon} {label}
                </p>
                <p style={{ color: 'var(--cream)', fontSize: '0.9rem', fontWeight: 500, wordBreak: 'break-all' }}>{value || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
