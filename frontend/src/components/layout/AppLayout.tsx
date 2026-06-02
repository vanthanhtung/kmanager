import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const currentLang = i18n.language.startsWith('vi') ? 'vi' : 'en';

  return (
    <div className="app-layout">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <nav className="top-nav">
          <span className="brand">🎤 kmanager</span>
          {auth.role === 'VENUE_MANAGER' && (
            <>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>{t('nav.rooms')}</NavLink>
              <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav.menu')}</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav.dashboard')}</NavLink>
            </>
          )}
          {auth.role === 'SUPER_ADMIN' && (
            <NavLink to="/admin/venues" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav.admin')}</NavLink>
          )}
          <div style={{ flex: 1 }} />
          <div className="lang-toggle">
            <button className={currentLang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>EN</button>
            <button className={currentLang === 'vi' ? 'active' : ''} onClick={() => changeLang('vi')}>VI</button>
          </div>
          <button className="btn-secondary btn-sm" onClick={handleLogout}>{t('common.logout')}</button>
        </nav>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
