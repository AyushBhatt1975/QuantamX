import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

function EyeIcon({ open }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      addToast('Please fill in all fields', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      addToast('Welcome back! 🎉', 'success');
      navigate(from);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}>
      {/* BG overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,46,0.87)' }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '440px',
        animation: 'fadeInUp 0.5s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 42, height: 42,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem',
              color: 'var(--charcoal)',
            }}>S</div>
            <span style={{
              fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 700,
              background: 'linear-gradient(135deg, var(--cream), var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>StayLux</span>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(26,26,46,0.95)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
            color: 'var(--cream)', marginBottom: '0.4rem',
          }}>Welcome Back</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Sign in to access your bookings and profile
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <label htmlFor="login-email" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="input-field"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input-field"
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  id="toggle-password-btn"
                  onClick={() => setShowPwd(v => !v)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="login-submit-btn"
              className="btn-primary"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', opacity: submitting ? 0.75 : 1, marginTop: '0.5rem' }}
            >
              {submitting ? '⏳ Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>New to StayLux?</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>

          <Link to="/register" id="go-register-link" className="btn-outline" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}
