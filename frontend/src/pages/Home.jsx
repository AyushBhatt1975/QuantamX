import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hotelService } from '../services/api';
import { HotelCard } from '../components/HotelCard';
import { PageSpinner } from '../components/Spinner';

const DESTINATIONS = [
  { city: 'New Delhi', emoji: '🏛️', desc: 'The Capital' },
  { city: 'Mumbai', emoji: '🌊', desc: 'City of Dreams' },
  { city: 'Jaipur', emoji: '🏰', desc: 'Pink City' },
  { city: 'Shimla', emoji: '⛰️', desc: 'Queen of Hills' },
  { city: 'Kerala', emoji: '🌴', desc: 'God\'s Own Country' },
  { city: 'Hyderabad', emoji: '💎', desc: 'City of Pearls' },
];

const FEATURES = [
  { icon: '🏆', title: 'Curated Luxury', desc: 'Hand-picked 5-star properties verified for quality and service excellence.' },
  { icon: '🔒', title: 'Secure Booking', desc: 'End-to-end encrypted transactions and instant booking confirmation.' },
  { icon: '💰', title: 'Best Price Guarantee', desc: 'We match or beat any lower price you find for the same room.' },
  { icon: '🛎️', title: '24/7 Concierge', desc: 'Our dedicated team is available around the clock to assist you.' },
  { icon: '🔄', title: 'Flexible Cancellation', desc: 'Free cancellation on most bookings up to 48 hours before arrival.' },
  { icon: '⭐', title: 'Loyalty Rewards', desc: 'Earn points on every stay and redeem for exclusive perks.' },
];

const STATS = [
  { value: '6+', label: 'Luxury Properties' },
  { value: '50+', label: 'Room Types' },
  { value: '4.7★', label: 'Average Rating' },
  { value: '24/7', label: 'Guest Support' },
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    hotelService.getAll()
      .then(r => setHotels(r.data.slice(0, 3)))
      .catch(() => setHotels([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(26,26,46,0.75) 60%, rgba(26,26,46,0.55) 100%)',
        }} />

        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '5rem' }}>
          <div style={{ maxWidth: '700px' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '999px',
              padding: '0.4rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              marginBottom: '1.5rem',
              animation: 'fadeInUp 0.5s ease',
            }}>
              <span>✦</span> India's Premier Luxury Hotel Platform <span>✦</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--cream)',
              marginBottom: '1.25rem',
              animation: 'fadeInUp 0.5s ease 0.1s both',
            }}>
              Where Every Stay<br />
              Feels Like <span className="gold-text">Royalty</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(250,247,242,0.7)',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: '520px',
              animation: 'fadeInUp 0.5s ease 0.2s both',
            }}>
              Discover India's most extraordinary hotels — from palace suites in Jaipur to floating villas in Kerala. Your perfect luxury escape begins here.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              gap: '0',
              maxWidth: '540px',
              animation: 'fadeInUp 0.5s ease 0.3s both',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1.5px solid var(--border)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <input
                id="hero-search"
                type="text"
                placeholder="Search by city, hotel, or destination…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '1rem 1.25rem',
                  background: 'rgba(26,26,46,0.9)',
                  border: 'none',
                  color: 'var(--cream)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <button type="submit" id="hero-search-btn" style={{
                padding: '1rem 1.75rem',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                border: 'none',
                color: 'var(--charcoal)',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'var(--transition)',
                whiteSpace: 'nowrap',
              }}>
                🔍 Search
              </button>
            </form>

            {/* Quick links */}
            <div style={{
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
              marginTop: '1.25rem',
              animation: 'fadeInUp 0.5s ease 0.4s both',
            }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Popular:</span>
              {['Delhi', 'Mumbai', 'Jaipur', 'Shimla'].map(city => (
                <button key={city} onClick={() => navigate(`/hotels?search=${city}`)} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '999px',
                  padding: '0.25rem 0.75rem',
                  color: 'rgba(250,247,242,0.75)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = 'var(--gold-dark)'; e.currentTarget.style.color = 'var(--gold-light)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(250,247,242,0.75)'; }}
                >{city}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.4rem', color: 'var(--muted)', fontSize: '0.72rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          animation: 'fadeIn 1s ease 1s both',
        }}>
          <span>Scroll</span>
          <div style={{
            width: 20, height: 30,
            border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            display: 'flex', justifyContent: 'center', paddingTop: '4px',
          }}>
            <div style={{
              width: 3, height: 6,
              background: 'var(--gold)',
              borderRadius: '99px',
              animation: 'scrollBounce 1.5s ease infinite',
            }} />
          </div>
        </div>
        <style>{`
          @keyframes scrollBounce {
            0%,100%{transform:translateY(0)}
            50%{transform:translateY(8px)}
          }
        `}</style>
      </section>

      {/* ── STATS ── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{value}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED HOTELS ── */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Featured Properties</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--cream)',
              marginBottom: '0.75rem',
            }}>
              Handpicked <span className="gold-text">Luxury</span> Escapes
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Carefully selected properties that set the benchmark for hospitality excellence.
            </p>
          </div>

          {loading ? (
            <PageSpinner />
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.75rem',
                marginBottom: '3rem',
              }}>
                {hotels.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link to="/hotels" id="view-all-hotels-btn" className="btn-outline">
                  View All Properties →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(to bottom, var(--charcoal), var(--charcoal-mid))' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Explore India</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--cream)',
            }}>
              Top <span className="gold-text">Destinations</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.25rem',
          }}>
            {DESTINATIONS.map((d, i) => (
              <Link
                key={d.city}
                to={`/hotels?search=${d.city}`}
                id={`dest-${d.city.toLowerCase().replace(' ', '-')}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1.75rem 1rem',
                  background: 'var(--glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                  textDecoration: 'none',
                  animation: `fadeInUp 0.5s ease ${i * 0.07}s both`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold-dark)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.07)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'var(--glass)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>{d.emoji}</span>
                <span style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem' }}>{d.city}</span>
                <span style={{ color: 'var(--muted)', fontSize: '0.72rem', marginTop: '0.2rem' }}>{d.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Why Choose Us</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--cream)',
            }}>
              The <span className="gold-text">StayLux</span> Difference
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} style={{
                padding: '1.75rem',
                background: 'var(--glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                transition: 'var(--transition)',
                animation: `fadeInUp 0.5s ease ${i * 0.07}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>{f.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--cream)', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(26,26,46,0) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}>Begin Your Journey</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--cream)',
            marginBottom: '1.25rem',
          }}>
            Ready to Experience <span className="gold-text">Pure Luxury?</span>
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Join thousands of discerning travellers who choose StayLux for their finest hotel experiences across India.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" id="cta-register-btn" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Create Free Account
            </Link>
            <Link to="/hotels" id="cta-hotels-btn" className="btn-outline" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Browse Hotels
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
