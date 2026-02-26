import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--nav-height)',
      zIndex: 100,
      transition: 'all 0.4s ease',
      background: isScrolled
        ? 'rgba(26, 26, 46, 0.95)'
        : 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-subtle)' : 'none',
    }}>
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--charcoal)',
            fontFamily: 'var(--font-display)',
          }}>S</div>
          <span style={{
            fontSize: '1.35rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FAF7F2, var(--gold-light))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>StayLux</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {[
            { to: '/', label: 'Home' },
            { to: '/hotels', label: 'Hotels' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              color: isActive(to) ? 'var(--gold-light)' : 'rgba(250,247,242,0.8)',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.03em',
              transition: 'color 0.2s',
              borderBottom: isActive(to) ? '1.5px solid var(--gold)' : '1.5px solid transparent',
              paddingBottom: '2px',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--cream)'}
              onMouseLeave={e => e.target.style.color = isActive(to) ? 'var(--gold-light)' : 'rgba(250,247,242,0.8)'}
            >{label}</Link>
          ))}

          {isAuthenticated ? (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                id="user-menu-btn"
                onClick={() => setDropdownOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'var(--glass)',
                  border: '1px solid var(--border)',
                  borderRadius: '999px',
                  padding: '0.4rem 0.75rem 0.4rem 0.4rem',
                  color: 'var(--cream)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--charcoal)',
                  fontWeight: 700, fontSize: '0.75rem',
                }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user?.name?.split(' ')[0]}</span>
                <ChevronDown />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#1A1A2E',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  minWidth: '180px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeInUp 0.2s ease',
                }}>
                  <Link to="/dashboard" id="dashboard-link" style={{
                    display: 'block', padding: '0.85rem 1.25rem',
                    color: 'var(--cream)', fontSize: '0.875rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--glass)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    📋 My Bookings
                  </Link>
                  <button onClick={handleLogout} id="logout-btn" style={{
                    width: '100%', textAlign: 'left',
                    padding: '0.85rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--error)', fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(252,129,129,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn-ghost" id="login-nav-btn" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>Sign In</Link>
              <Link to="/register" className="btn-primary" id="register-nav-btn" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>Join Now</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMobileOpen(v => !v)}
          className="mobile-toggle"
          style={{ background: 'none', border: 'none', color: 'var(--cream)', padding: '0.25rem' }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(26,26,46,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <Link to="/" style={{ color: 'var(--cream)', fontWeight: 500 }}>Home</Link>
          <Link to="/hotels" style={{ color: 'var(--cream)', fontWeight: 500 }}>Hotels</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={{ color: 'var(--cream)', fontWeight: 500 }}>My Bookings</Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--error)', textAlign: 'left', fontWeight: 500, padding: 0 }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{ textAlign: 'center' }}>Sign In</Link>
              <Link to="/register" className="btn-primary" style={{ textAlign: 'center' }}>Join Now</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .mobile-toggle { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}
