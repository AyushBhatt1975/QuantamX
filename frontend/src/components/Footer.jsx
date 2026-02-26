import { Link } from 'react-router-dom';

const footerLinks = {
  Explore: [
    { to: '/', label: 'Home' },
    { to: '/hotels', label: 'Browse Hotels' },
  ],
  Account: [
    { to: '/login', label: 'Sign In' },
    { to: '/register', label: 'Create Account' },
    { to: '/dashboard', label: 'My Bookings' },
  ],
  Destinations: [
    { to: '/hotels?location=Delhi', label: 'New Delhi' },
    { to: '/hotels?location=Mumbai', label: 'Mumbai' },
    { to: '/hotels?location=Jaipur', label: 'Jaipur' },
    { to: '/hotels?location=Shimla', label: 'Shimla' },
    { to: '/hotels?location=Kerala', label: 'Kerala' },
  ],
};

export function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to bottom, var(--charcoal-mid), #0D0D1A)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4rem',
      paddingBottom: '2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700, fontSize: '1.1rem',
                color: 'var(--charcoal)',
              }}>S</div>
              <span style={{
                fontSize: '1.3rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--gold-light)',
              }}>StayLux</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '240px' }}>
              India's premier luxury hotel booking platform. Crafting unforgettable stays since 2024.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
              {['📘', '🐦', '📸', '💼'].map((icon, i) => (
                <button key={i} style={{
                  width: 36, height: 36,
                  background: 'var(--glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >{icon}</button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                color: 'var(--gold)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
              }}>{section}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} style={{
                      color: 'var(--muted)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                      onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 style={{
              color: 'var(--gold)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-body)',
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '📧', text: 'support@staylux.in' },
                { icon: '📞', text: '+91-800-STAYLUX' },
                { icon: '🕐', text: '24/7 Guest Support' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem' }}>{icon}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            © 2024 StayLux. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <span key={t} style={{ color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
