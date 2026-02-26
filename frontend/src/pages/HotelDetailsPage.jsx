import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { hotelService, roomService } from '../services/api';
import { RatingStars } from '../components/RatingStars';
import { RoomCard } from '../components/RoomCard';
import { BookingModal } from '../components/BookingModal';
import { PageSpinner } from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

function BackArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('rooms'); // rooms | amenities | info
  const [roomFilter, setRoomFilter] = useState('all'); // all | available | suite | deluxe
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      hotelService.getById(id),
      roomService.getByHotelId(id),
    ])
      .then(([hRes, rRes]) => {
        setHotel(hRes.data);
        setRooms(rRes.data);
      })
      .catch(() => setError('Failed to load hotel details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-wrapper"><PageSpinner /></div>;

  if (error || !hotel) return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😞</div>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Hotel Not Found</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>{error}</p>
        <Link to="/hotels" className="btn-primary">Browse All Hotels</Link>
      </div>
    </div>
  );

  const amenitiesArr = hotel.amenities?.split(',').map(a => a.trim()) || [];

  const filteredRooms = rooms.filter(r => {
    if (roomFilter === 'available') return r.isAvailable;
    if (roomFilter === 'suite') return r.roomType.toLowerCase().includes('suite');
    if (roomFilter === 'deluxe') return r.roomType.toLowerCase().includes('deluxe') || r.roomType.toLowerCase().includes('executive');
    return true;
  });

  const availableCount = rooms.filter(r => r.isAvailable).length;

  return (
    <div className="page-wrapper">
      {/* ── HERO IMAGE ── */}
      <div style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80' : hotel.imageUrl}
          alt={hotel.hotelName}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,26,46,0.3) 0%, rgba(26,26,46,0.95) 100%)',
        }} />

        {/* Back button */}
        <button
          id="back-btn"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: '5.5rem', left: '2rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(26,26,46,0.7)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '999px',
            padding: '0.5rem 1.1rem',
            color: 'var(--cream)', fontSize: '0.875rem',
            cursor: 'pointer', transition: 'var(--transition)',
          }}
        >
          <BackArrow /> Back
        </button>

        {/* Hotel name overlay */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: 0, right: 0,
          padding: '0 2rem',
        }}>
          <div className="container">
            <div style={{
              display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem',
            }}>
              <span style={{
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '999px', padding: '0.2rem 0.75rem',
                color: 'var(--gold-light)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {hotel.city}, {hotel.state}
              </span>
              {availableCount > 0 && (
                <span style={{
                  background: 'rgba(72,187,120,0.15)', border: '1px solid rgba(72,187,120,0.3)',
                  borderRadius: '999px', padding: '0.2rem 0.75rem',
                  color: 'var(--success)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                }}>
                  {availableCount} rooms available
                </span>
              )}
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--cream)',
              marginBottom: '0.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>{hotel.hotelName}</h1>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <RatingStars rating={hotel.rating} size="md" />
              <span style={{ color: 'rgba(250,247,242,0.6)', fontSize: '0.85rem' }}>
                📍 {hotel.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
          {/* Left column */}
          <div>
            {/* Tabs */}
            <div style={{
              display: 'flex', gap: '0.25rem',
              background: 'var(--glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '0.3rem',
              marginBottom: '2rem',
              width: 'fit-content',
            }}>
              {['rooms', 'amenities', 'info'].map(tab => (
                <button key={tab} id={`tab-${tab}`} onClick={() => setActiveTab(tab)} style={{
                  padding: '0.55rem 1.25rem',
                  background: activeTab === tab ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'transparent',
                  border: 'none', borderRadius: '8px',
                  color: activeTab === tab ? 'var(--charcoal)' : 'var(--muted)',
                  fontWeight: 600, fontSize: '0.85rem',
                  cursor: 'pointer', transition: 'var(--transition)',
                  textTransform: 'capitalize',
                }}>{tab === 'info' ? 'Hotel Info' : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
              ))}
            </div>

            {/* Tab: Rooms */}
            {activeTab === 'rooms' && (
              <div>
                {/* Room type filter */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {['all', 'available', 'suite', 'deluxe'].map(f => (
                    <button key={f} id={`room-filter-${f}`} onClick={() => setRoomFilter(f)} style={{
                      padding: '0.35rem 0.9rem',
                      background: roomFilter === f ? 'rgba(201,168,76,0.12)' : 'transparent',
                      border: `1px solid ${roomFilter === f ? 'var(--gold-dark)' : 'var(--border-subtle)'}`,
                      borderRadius: '999px',
                      color: roomFilter === f ? 'var(--gold-light)' : 'var(--muted)',
                      fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                      transition: 'var(--transition)', textTransform: 'capitalize',
                    }}>{f === 'all' ? 'All Rooms' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
                  ))}
                  <span style={{ color: 'var(--muted)', fontSize: '0.78rem', alignSelf: 'center', marginLeft: 'auto' }}>
                    {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {filteredRooms.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛏️</div>
                    <p>No rooms match this filter.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {filteredRooms.map(r => <RoomCard key={r.id} room={r} />)}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Amenities */}
            {activeTab === 'amenities' && (
              <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '1.5rem' }}>
                  Hotel Amenities
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {amenitiesArr.map(a => (
                    <div key={a} style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.875rem 1rem',
                      background: 'var(--glass)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                    }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: '6px',
                        background: 'rgba(201,168,76,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.85rem', flexShrink: 0,
                      }}>✦</span>
                      <span style={{ color: 'var(--cream)', fontSize: '0.875rem', fontWeight: 500 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Info */}
            {activeTab === 'info' && (
              <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '1rem' }}>
                  About {hotel.hotelName}
                </h2>
                <p style={{ color: 'rgba(250,247,242,0.7)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.97rem' }}>
                  {hotel.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                  {[
                    { label: 'Address', value: hotel.address, icon: '📍' },
                    { label: 'City', value: `${hotel.city}, ${hotel.state}`, icon: '🏙️' },
                    { label: 'Pincode', value: hotel.pincode, icon: '📮' },
                    { label: 'Phone', value: hotel.contactNumber, icon: '📞' },
                    { label: 'Email', value: hotel.email, icon: '📧' },
                    { label: 'Rating', value: `${hotel.rating} / 5.0`, icon: '⭐' },
                  ].map(({ label, value, icon }) => (
                    <div key={label} style={{
                      padding: '1rem',
                      background: 'var(--glass)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                    }}>
                      <div style={{ color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        {icon} {label}
                      </div>
                      <div style={{ color: 'var(--cream)', fontSize: '0.88rem', fontWeight: 500, wordBreak: 'break-all' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking sidebar */}
          <div style={{
            position: 'sticky', top: 'calc(var(--nav-height) + 1.5rem)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Starting from</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                  ₹{Math.round(hotel.minPrice || 0).toLocaleString('en-IN')}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>/night</span>
              </div>
              {hotel.maxPrice && (
                <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                  Up to ₹{Math.round(hotel.maxPrice).toLocaleString('en-IN')}/night
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🛏️', text: `${rooms.length} room types` },
                { icon: '✅', text: `${availableCount} rooms available now` },
                { icon: '⭐', text: `Rated ${hotel.rating}/5 by guests` },
                { icon: '📞', text: hotel.contactNumber },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span>{icon}</span>
                  <span style={{ color: 'rgba(250,247,242,0.75)' }}>{text}</span>
                </div>
              ))}
            </div>

            <button
              id="book-now-btn"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login', { state: { from: `/hotel/${id}` } });
                } else {
                  setShowModal(true);
                }
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem' }}
              disabled={availableCount === 0}
            >
              {availableCount === 0 ? '😔 Fully Booked' : '🏨 Book Now'}
            </button>

            {!isAuthenticated && (
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem' }}>
                <Link to="/login" style={{ color: 'var(--gold)' }}>Sign in</Link> to book this hotel
              </p>
            )}

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(72,187,120,0.05)', border: '1px solid rgba(72,187,120,0.2)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--success)', fontSize: '0.75rem', textAlign: 'center' }}>
                ✓ Free cancellation · ✓ Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <BookingModal
          hotel={hotel}
          rooms={rooms}
          onClose={() => setShowModal(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .hotel-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
