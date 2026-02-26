import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export function OAuth2Callback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth(); // I need to expose setUser or add a completeSocialLogin method
  const { addToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const username = params.get('username');
    const email = params.get('email');
    const fullName = params.get('fullName');

    if (id && username) {
      const userData = { id, username, email, fullName };
      localStorage.setItem('staylux_user', JSON.stringify(userData));
      window.location.href = '/dashboard'; // Using href to ensure context refresh if needed, or use navigate
    } else {
      addToast('Social login failed', 'error');
      navigate('/login');
    }
  }, [location, navigate, addToast]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner">Completing login...</div>
    </div>
  );
}
