import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

function FieldError({ msg }) {
  if (!msg) return null;
  return <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.3rem' }}>{msg}</p>;
}

export function Register() {
  const [form, setForm] = useState({ fullName: '', username: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address';
    if (form.phone && !form.phone.match(/^[+]?[\d\s\-()]{8,15}$/)) e.phone = 'Enter a valid phone number';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await register({
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password
      });
      addToast('Account created successfully! Welcome to StayLux 🎉', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="page-wrapper" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundImage: 'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80)',
      backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,46,0.90)' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '480px', animation: 'fadeInUp 0.5s ease' }}>
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

        <div style={{
          background: 'rgba(26,26,46,0.97)',
          border: '1px solid var(--border)',
          borderRadius: '24px', padding: '2.5rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.4rem' }}>
            Create Account
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Join StayLux and discover extraordinary stays
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Full Name *
              </label>
              <input id="reg-name" type="text" placeholder="Rajan Sharma" value={form.fullName}
                onChange={set('fullName')} className="input-field" />
              <FieldError msg={errors.fullName} />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="reg-username" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Username *
              </label>
              <input id="reg-username" type="text" placeholder="yourusername" value={form.username}
                onChange={set('username')} className="input-field" />
              <FieldError msg={errors.username} />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <input id="reg-email" type="email" placeholder="you@example.com" value={form.email}
                onChange={set('email')} className="input-field" />
              <FieldError msg={errors.email} />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="reg-phone" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Phone (optional)
              </label>
              <input id="reg-phone" type="tel" placeholder="+91-98765-43210" value={form.phone}
                onChange={set('phone')} className="input-field" />
              <FieldError msg={errors.phone} />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input id="reg-password" type={showPwd ? 'text' : 'password'} placeholder="Min. 6 characters"
                  value={form.password} onChange={set('password')} className="input-field"
                  style={{ paddingRight: '3rem' }} />
                <button type="button" id="toggle-reg-pwd" onClick={() => setShowPwd(v => !v)} style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex',
                }}><EyeIcon open={showPwd} /></button>
              </div>
              <FieldError msg={errors.password} />
              {/* Strength bar */}
              {form.password && (
                <div style={{ display: 'flex', gap: '3px', marginTop: '0.4rem' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: '2px',
                      background: form.password.length >= i * 2
                        ? (form.password.length < 6 ? 'var(--error)' : form.password.length < 10 ? 'var(--warning)' : 'var(--success)')
                        : 'var(--border-subtle)',
                      transition: 'background 0.3s',
                    }} />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm-pwd" style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Confirm Password *
              </label>
              <input id="reg-confirm-pwd" type="password" placeholder="Re-enter password"
                value={form.confirmPassword} onChange={set('confirmPassword')} className="input-field" />
              <FieldError msg={errors.confirmPassword} />
            </div>

            <button type="submit" id="register-submit-btn" className="btn-primary"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', marginTop: '0.5rem', opacity: submitting ? 0.75 : 1 }}>
              {submitting ? '⏳ Creating account…' : '✨ Create Account'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>Already a member?</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>

          <Link to="/login" id="go-login-link" className="btn-outline" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
