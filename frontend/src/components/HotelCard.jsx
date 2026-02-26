import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RatingStars } from './RatingStars';

function MapPinIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function BedIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4v16" />
            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" />
            <path d="M6 8v9" />
        </svg>
    );
}

export function HotelCard({ hotel, index = 0 }) {
    const [imgError, setImgError] = useState(false);
    const [hovered, setHovered] = useState(false);

    const amenitiesArr = hotel.amenities?.split(',').slice(0, 3) || [];

    const fallbackImg = `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80`;

    return (
        <div
            style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: `1px solid ${hovered ? 'var(--gold-dark)' : 'var(--border-subtle)'}`,
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'var(--transition)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)' : 'var(--shadow-md)',
                animation: `fadeInUp 0.5s ease ${index * 0.08}s both`,
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                    src={imgError ? fallbackImg : hotel.imageUrl}
                    alt={hotel.hotelName}
                    onError={() => setImgError(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: hovered ? 'scale(1.07)' : 'scale(1)',
                    }}
                />
                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0) 60%)',
                }} />

                {/* Rating badge */}
                <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: 'rgba(26,26,46,0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    padding: '0.3rem 0.7rem',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>★</span>
                    <span style={{ color: 'var(--cream)', fontSize: '0.8rem', fontWeight: 600 }}>
                        {parseFloat(hotel.rating).toFixed(1)}
                    </span>
                </div>

                {/* Available rooms */}
                {hotel.availableRoomsCount > 0 && (
                    <div style={{
                        position: 'absolute', top: '0.75rem', left: '0.75rem',
                        background: 'rgba(72,187,120,0.2)',
                        border: '1px solid rgba(72,187,120,0.4)',
                        borderRadius: '999px',
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--success)',
                        letterSpacing: '0.05em',
                    }}>
                        {hotel.availableRoomsCount} rooms available
                    </div>
                )}

                {/* City on image */}
                <div style={{
                    position: 'absolute', bottom: '0.75rem', left: '0.875rem',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    color: 'rgba(250,247,242,0.9)', fontSize: '0.8rem',
                }}>
                    <MapPinIcon />
                    <span>{hotel.city}, {hotel.state}</span>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <div>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--cream)',
                        lineHeight: 1.3,
                        marginBottom: '0.25rem',
                    }}>{hotel.hotelName}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{hotel.location}</p>
                </div>

                <p style={{
                    color: 'rgba(250,247,242,0.6)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {hotel.description}
                </p>

                {/* Amenities chips */}
                {amenitiesArr.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {amenitiesArr.map(a => (
                            <span key={a} style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '6px',
                                padding: '0.2rem 0.5rem',
                                fontSize: '0.7rem',
                                color: 'var(--muted)',
                            }}>{a.trim()}</span>
                        ))}
                        {hotel.amenities?.split(',').length > 3 && (
                            <span style={{
                                background: 'rgba(201,168,76,0.08)',
                                border: '1px solid rgba(201,168,76,0.2)',
                                borderRadius: '6px',
                                padding: '0.2rem 0.5rem',
                                fontSize: '0.7rem',
                                color: 'var(--gold)',
                            }}>+{hotel.amenities.split(',').length - 3} more</span>
                        )}
                    </div>
                )}

                {/* Price & CTA */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        {hotel.minPrice && (
                            <>
                                <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>from</span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                    <span style={{
                                        color: 'var(--gold-light)',
                                        fontWeight: 700,
                                        fontSize: '1.25rem',
                                        fontFamily: 'var(--font-display)',
                                    }}>₹{Math.round(hotel.minPrice).toLocaleString('en-IN')}</span>
                                    <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>/night</span>
                                </div>
                            </>
                        )}
                    </div>
                    <Link
                        to={`/hotel/${hotel.id}`}
                        id={`view-hotel-${hotel.id}`}
                        className="btn-primary"
                        style={{ fontSize: '0.78rem', padding: '0.55rem 1.1rem' }}
                    >
                        View Hotel
                    </Link>
                </div>
            </div>
        </div>
    );
}
