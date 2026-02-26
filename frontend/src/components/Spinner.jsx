export function Spinner({ size = 40, color = 'var(--gold)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
      <div style={{
        width: size,
        height: size,
        border: `3px solid rgba(201,168,76,0.15)`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
    }}>
      <Spinner size={52} />
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Loading…
      </p>
    </div>
  );
}
