import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../../api/client';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(username, password);
      setToken(res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('venueId', res.venueId || '');
      localStorage.setItem('venueName', res.venueName || '');
      localStorage.setItem('username', username);
      // Must reload so AuthProvider picks up the new localStorage values
      window.location.href = res.role === 'SUPER_ADMIN' ? '/admin/venues' : '/';
    } catch {
      setError(t('login.error_invalid'));
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <div className="card" style={{ width: 380, padding: 32 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: 'var(--color-primary)' }}>{t('login.title')}</h2>
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '8px 12px', borderRadius: 6, marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('login.username')}</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder={t('login.username_placeholder')} autoFocus required />
          </div>
          <div className="form-group">
            <label>{t('login.password')}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('login.password_placeholder')} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px', marginTop: 8 }} disabled={loading}>
            {loading ? t('common.loading') : t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
