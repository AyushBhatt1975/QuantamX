import { useState } from 'react';

function UsersIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function BedIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" /><path d="M6 8v9" />
        </svg>
    );
}

export function RoomCard({ room, onSelect, selected, selectable = false }) {
    const [imgError, setImgError] = useState(false);
    const [hovered, setHovered] = useState(false);
    const amenities = room.amenities?.split(',').slice(0, 4) || [];

    const fallback = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80';

    const isAvailable = room.isAvailable;

    return (
        <div
            style={{
                background: selected
                    ? 'linear-gradient(145deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: selected
                    ? '1px solid var(--gold)'
                    : hovered
                        ? '1px solid var(--border)'
                        : '1px solid var(--border-subtle)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'var(--transition)',
                transform: hovered && !selected ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: selected ? 'var(--shadow-gold)' : hovered ? 'var(--shadow-md)' : 'none',
                opacity: !isAvailable ? 0.55 : 1,
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div style={{ position: 'relative', height: '175px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                    src={imgError ? fallback : room.imageUrl}
                    alt={room.roomType}
                    onError={() => setImgError(true)}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(26,26,46,0.7) 0%, transparent 60%)',
                }} />

                {/* Status */}
                <div style={{
                    position: 'absolute', top: '0.6rem', right: '0.6rem',
                    background: isAvailable ? 'rgba(72,187,120,0.15)' : 'rgba(252,129,129,0.15)',
                    border: `1px solid ${isAvailable ? 'rgba(72,187,120,0.4)' : 'rgba(252,129,129,0.4)'}`,
                    borderRadius: '999px',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: isAvailable ? 'var(--success)' : 'var(--error)',
                    letterSpacing: '0.05em',
                }}>
                    {isAvailable ? '✓ Available' : 'Booked'}
                </div>

                {/* Selected checkmark */}
                {selected && (
                    <div style={{
                        position: 'absolute', top: '0.6rem', left: '0.6rem',
                        width: 24, height: 24,
                        background: 'var(--gold)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--charcoal)',
                    }}>✓</div>
                )}

                <div style={{
                    position: 'absolute', bottom: '0.6rem', left: '0.75rem',
                    color: 'rgba(250,247,242,0.85)', fontSize: '0.75rem',
                    fontWeight: 500,
                }}>Room {room.roomNumber}</div>
            </div>

            {/* Content */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--cream)',
                        marginBottom: '0.2rem',
                    }}>{room.roomType}</h4>
                    <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--muted)', fontSize: '0.78rem' }}>
                        <span style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                            <BedIcon /> {room.bedType} Bed
                        </span>
                        <span style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                            <UsersIcon /> Max {room.maxOccupancy}
                        </span>
                    </div>
                </div>

                <p style={{
                    color: 'rgba(250,247,242,0.55)',
                    fontSize: '0.78rem',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>{room.description}</p>

                {/* Amenity tags */}
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {amenities.map(a => (
                        <span key={a} style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '5px',
                            padding: '0.15rem 0.45rem',
                            fontSize: '0.67rem',
                            color: 'var(--muted)',
                        }}>{a.trim()}</span>
                    ))}
                </div>

                {/* Price & action */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.6rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--gold-light)',
                        }}>₹{Math.round(room.pricePerNight).toLocaleString('en-IN')}</span>
                        <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>/night</span>
                    </div>

                    {selectable && isAvailable && (
                        <button
                            id={`select-room-${room.id}`}
                            onClick={() => onSelect(room)}
                            style={{
                                padding: '0.45rem 1rem',
                                background: selected
                                    ? 'var(--gold)'
                                    : 'transparent',
                                border: `1.5px solid ${selected ? 'var(--gold)' : 'var(--gold-dark)'}`,
                                borderRadius: '8px',
                                color: selected ? 'var(--charcoal)' : 'var(--gold)',
                                fontWeight: 600,
                                fontSize: '0.78rem',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                            }}
                        >
                            {selected ? '✓ Selected' : 'Select'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
