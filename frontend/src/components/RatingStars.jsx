export function RatingStars({ rating, size = 'md', showValue = true }) {
  const r = parseFloat(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalf = r - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const fontSize = size === 'sm' ? '0.75rem' : size === 'lg' ? '1.1rem' : '0.9rem';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
      <div style={{ display: 'flex', gap: '1px', fontSize }}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`f${i}`} style={{ color: 'var(--gold)' }}>★</span>
        ))}
        {hasHalf && <span style={{ color: 'var(--gold-dark)' }}>⯨</span>}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`e${i}`} style={{ color: '#4A5568' }}>★</span>
        ))}
      </div>
      {showValue && (
        <span style={{ color: 'var(--gold-light)', fontWeight: 600, fontSize: size === 'sm' ? '0.75rem' : '0.85rem', marginLeft: '2px' }}>
          {r.toFixed(1)}
        </span>
      )}
    </div>
  );
}
