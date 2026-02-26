import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { bookingService } from '../services/api';
import { PageSpinner } from '../components/Spinner';

function CheckCircle() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

export function BookingConfirmation() {
    const { id } = useParams();
    const location = useLocation();
    const [booking, setBooking] = useState(location.state?.booking || null);
    const [loading, setLoading] = useState(!booking);

    useEffect(() => {
        if (!booking && id) {
            bookingService.getById(id)
                .then(r => setBooking(r.data))
                .catch(() => { })
                .finally(() => setLoading(false));
        }
    }, [id, booking]);

    const fmt = (date) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) return <div className="page-wrapper"><PageSpinner /></div>;

    if (!booking) return (
        <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
                <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Booking Not Found</h2>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>The booking details could not be retrieved.</p>
                <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
            </div>
        </div>
    );

    return (
        <div className="page-wrapper" style={{
            minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '3rem 1rem',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}>
            <div style={{ width: '100%', maxWidth: '600px', animation: 'fadeInUp 0.6s ease' }}>
                {/* Success indicator */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: 100, height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(72,187,120,0.15), rgba(72,187,120,0.05))',
                        border: '2px solid rgba(72,187,120,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'var(--success)',
                        animation: 'pulse-gold 2s ease infinite',
                    }}>
                        <CheckCircle />
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                        fontWeight: 700, color: 'var(--cream)', marginBottom: '0.5rem',
                    }}>
                        Booking Confirmed! 🎉
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
                        Your luxury stay has been successfully reserved.
                    </p>
                </div>

                {/* Booking card */}
                <div style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    border: '1px solid var(--border)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
                }}>
                    {/* Reference header */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
                        borderBottom: '1px solid var(--border)',
                        padding: '1.5rem',
                        textAlign: 'center',
                    }}>
                        <p style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                            Booking Reference
                        </p>
                        <p style={{
                            fontFamily: 'monospace',
                            fontSize: '1.5rem', fontWeight: 800,
                            letterSpacing: '0.15em',
                            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>{booking.bookingReference}</p>
                    </div>

                    {/* Hotel info */}
                    <div style={{ padding: '1.75rem' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                            color: 'var(--cream)', fontWeight: 700, marginBottom: '0.4rem',
                        }}>{booking.hotelName}</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
                            📍 {booking.hotelAddress}, {booking.hotelCity}
                        </p>

                        {/* Stay dates */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                            gap: '1rem', alignItems: 'center',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '14px', padding: '1.25rem',
                            marginBottom: '1.5rem',
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: 'var(--muted)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Check-In</p>
                                <p style={{ color: 'var(--cream)', fontWeight: 700, fontSize: '0.95rem' }}>{fmt(booking.checkInDate)}</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    padding: '0.35rem 0.75rem',
                                    background: 'rgba(201,168,76,0.12)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '999px',
                                    color: 'var(--gold)',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {booking.totalNights} Night{booking.totalNights !== 1 ? 's' : ''}
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: 'var(--muted)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Check-Out</p>
                                <p style={{ color: 'var(--cream)', fontWeight: 700, fontSize: '0.95rem' }}>{fmt(booking.checkOutDate)}</p>
                            </div>
                        </div>

                        {/* Details grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {[
                                { label: 'Guest', value: booking.userName },
                                { label: 'Email', value: booking.userEmail },
                                { label: 'Phone', value: booking.userPhone || '—' },
                                { label: 'Contact Hotel', value: booking.hotelContact || '—' },
                                { label: 'Status', value: booking.bookingStatus || 'CONFIRMED' },
                                { label: 'Payment', value: booking.paymentStatus || 'PAID' },
                            ].map(({ label, value }) => (
                                <div key={label} style={{
                                    padding: '0.875rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '10px',
                                }}>
                                    <p style={{ color: 'var(--muted)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{label}</p>
                                    <p style={{ color: 'var(--cream)', fontSize: '0.88rem', fontWeight: 600, wordBreak: 'break-all' }}>{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Rooms */}
                        {booking.rooms && booking.rooms.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                                    Booked Rooms
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {booking.rooms.map((r, i) => (
                                        <span key={i} style={{
                                            background: 'rgba(201,168,76,0.08)',
                                            border: '1px solid rgba(201,168,76,0.2)',
                                            borderRadius: '8px', padding: '0.4rem 0.85rem',
                                            color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 600,
                                        }}>🛏️ {r.roomType} – #{r.roomNumber}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Total amount */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1.25rem', borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))',
                            border: '1px solid rgba(201,168,76,0.25)',
                        }}>
                            <div>
                                <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>Total Amount Paid</p>
                                <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>({booking.totalNights} nights)</p>
                            </div>
                            <p style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem', fontWeight: 700,
                                color: 'var(--gold)',
                            }}>₹{Math.round(booking.totalAmount || 0).toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <Link to="/dashboard" id="view-all-bookings-btn" className="btn-primary" style={{ fontSize: '0.9rem' }}>
                        📋 View All Bookings
                    </Link>
                    <Link to="/hotels" id="book-another-btn" className="btn-outline" style={{ fontSize: '0.9rem' }}>
                        🏨 Book Another Hotel
                    </Link>
                </div>

                {/* Info note */}
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem 1.25rem',
                    background: 'rgba(100,163,255,0.05)',
                    border: '1px solid rgba(100,163,255,0.15)',
                    borderRadius: '12px',
                    textAlign: 'center',
                }}>
                    <p style={{ color: '#63B3ED', fontSize: '0.82rem' }}>
                        📧 A confirmation has been noted against your account. Please keep your booking reference handy.
                    </p>
                </div>
            </div>
        </div>
    );
}
