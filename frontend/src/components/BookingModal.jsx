import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomCard } from './RoomCard';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

function XIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export function BookingModal({ hotel, rooms, onClose }) {
    const { user, isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const [selectedRooms, setSelectedRooms] = useState([]);
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(tomorrow);
    const [specialRequests, setSpecialRequests] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: select rooms, 2: dates & confirm

    const toggleRoom = (room) => {
        setSelectedRooms(prev =>
            prev.find(r => r.id === room.id)
                ? prev.filter(r => r.id !== room.id)
                : [...prev, room]
        );
    };

    const nights = Math.max(1, Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    ));

    const total = selectedRooms.reduce((sum, r) => sum + parseFloat(r.pricePerNight) * nights, 0);

    const availableRooms = rooms.filter(r => r.isAvailable);

    const handleBook = async () => {
        if (!isAuthenticated) {
            addToast('Please sign in to make a booking', 'warning');
            onClose();
            navigate('/login');
            return;
        }
        if (selectedRooms.length === 0) {
            addToast('Please select at least one room', 'warning');
            return;
        }
        if (new Date(checkOut) <= new Date(checkIn)) {
            addToast('Check-out must be after check-in', 'error');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                userId: user.id,
                hotelId: hotel.id,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                roomIds: selectedRooms.map(r => r.id),
                specialRequests,
            };
            const { data } = await bookingService.create(payload);
            addToast('🎉 Booking confirmed!', 'success');
            onClose();
            navigate(`/booking-confirmation/${data.id}`, { state: { booking: data } });
        } catch (err) {
            addToast(err.response?.data?.message || 'Booking failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box">
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--cream)', fontWeight: 700 }}>
                            Book Your Stay
                        </h2>
                        <p style={{ color: 'var(--gold)', fontSize: '0.875rem', marginTop: '0.2rem' }}>{hotel.hotelName}</p>
                    </div>
                    <button onClick={onClose} id="close-modal-btn" style={{
                        background: 'var(--glass)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        color: 'var(--muted)',
                        cursor: 'pointer',
                        padding: '0.4rem',
                        display: 'flex',
                    }}>
                        <XIcon />
                    </button>
                </div>

                {/* Step Tabs */}
                <div style={{
                    display: 'flex',
                    padding: '1rem 1.5rem 0',
                    gap: '0.5rem',
                }}>
                    {['Select Rooms', 'Confirm Details'].map((label, i) => (
                        <div key={label} style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '0.6rem',
                            borderRadius: '8px',
                            background: step === i + 1 ? 'rgba(201,168,76,0.12)' : 'transparent',
                            border: `1.5px solid ${step === i + 1 ? 'var(--gold-dark)' : 'var(--border-subtle)'}`,
                            color: step === i + 1 ? 'var(--gold-light)' : 'var(--muted)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                        }}
                            onClick={() => i === 0 || selectedRooms.length > 0 ? setStep(i + 1) : null}
                        >
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: 18, height: 18, borderRadius: '50%',
                                background: step === i + 1 ? 'var(--gold)' : 'var(--border-subtle)',
                                color: step === i + 1 ? 'var(--charcoal)' : 'var(--muted)',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                marginRight: '0.4rem',
                            }}>{i + 1}</span>
                            {label}
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div style={{ padding: '1.25rem 1.5rem', maxHeight: '55vh', overflowY: 'auto' }}>
                    {step === 1 && (
                        <>
                            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
                                Select one or more rooms ({availableRooms.length} available)
                            </p>
                            {availableRooms.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>😔</div>
                                    <p>No rooms available at this time.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {availableRooms.map(room => (
                                        <RoomCard
                                            key={room.id}
                                            room={room}
                                            selectable
                                            selected={!!selectedRooms.find(r => r.id === room.id)}
                                            onSelect={toggleRoom}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Dates */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div>
                                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                                        Check-In
                                    </label>
                                    <input
                                        id="checkin-date"
                                        type="date"
                                        value={checkIn}
                                        min={today}
                                        onChange={e => setCheckIn(e.target.value)}
                                        className="input-field"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                                        Check-Out
                                    </label>
                                    <input
                                        id="checkout-date"
                                        type="date"
                                        value={checkOut}
                                        min={checkIn}
                                        onChange={e => setCheckOut(e.target.value)}
                                        className="input-field"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                            </div>

                            {/* Selected rooms summary */}
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '12px',
                                padding: '1rem',
                            }}>
                                <h4 style={{ color: 'var(--cream)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                    Selected Rooms ({selectedRooms.length})
                                </h4>
                                {selectedRooms.map(r => (
                                    <div key={r.id} style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: '0.82rem', padding: '0.4rem 0',
                                        borderBottom: '1px solid var(--border-subtle)',
                                    }}>
                                        <span style={{ color: 'var(--cream)' }}>{r.roomType} – Room {r.roomNumber}</span>
                                        <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
                                            ₹{Math.round(r.pricePerNight * nights).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem' }}>
                                    <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{nights} night{nights !== 1 ? 's' : ''}</span>
                                    <div>
                                        <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Total: </span>
                                        <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                                            ₹{Math.round(total).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                                    Special Requests (optional)
                                </label>
                                <textarea
                                    id="special-requests"
                                    value={specialRequests}
                                    onChange={e => setSpecialRequests(e.target.value)}
                                    placeholder="E.g. Early check-in, high floor, vegetarian meal..."
                                    rows={3}
                                    className="input-field"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                }}>
                    {step === 1 ? (
                        <>
                            <button onClick={onClose} className="btn-ghost" style={{ fontSize: '0.875rem' }}>Cancel</button>
                            <button
                                id="next-step-btn"
                                onClick={() => setStep(2)}
                                className="btn-primary"
                                style={{ fontSize: '0.875rem' }}
                                disabled={selectedRooms.length === 0}
                            >
                                Continue →
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setStep(1)} className="btn-ghost" style={{ fontSize: '0.875rem' }}>← Back</button>
                            <button
                                id="confirm-booking-btn"
                                onClick={handleBook}
                                className="btn-primary"
                                style={{ fontSize: '0.875rem', opacity: loading ? 0.7 : 1 }}
                                disabled={loading}
                            >
                                {loading ? '⏳ Booking...' : `✓ Confirm Booking`}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
