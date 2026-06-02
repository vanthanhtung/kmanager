import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function VenueManagementPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { venueId } = useParams<{ venueId: string }>();
  const isNew = !venueId;

  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!isNew) {
      api.getVenue(venueId!).then(v => {
        setVenueName(v.name);
        setAddress(v.address || '');
        setUsername(v.managerUsername || '');
        setIsActive(v.status === 'ACTIVE');
      });
    }
  }, [venueId]);

  const handleSave = async () => {
    if (!isNew && password && password !== confirmPassword) {
      setToast(t('venue.password_mismatch'));
      return;
    }
    setLoading(true);
    try {
      const data: any = { venueName, address, username: isNew ? username : undefined, password: password || undefined };
      if (isNew) await api.createVenue(data);
      else await api.updateVenue(venueId!, data);
      setToast(isNew ? t('venue.create_success') : t('venue.edit_success'));
      setTimeout(() => { setToast(''); navigate('/admin/venues'); }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t('venue.delete_confirm'))) return;
    await api.deleteVenue(venueId!);
    navigate('/admin/venues');
  };

  return (
    <div>
      {toast && <div className={`toast ${toast.includes('mismatch') ? 'error' : 'success'}`}>{toast}</div>}
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate('/admin/venues')}>← {t('common.back')}</button>
        <h1>{isNew ? t('venue.create_title') : t('venue.edit_title')}</h1>
        {!isNew && <button className="btn-danger" onClick={handleDelete}>{t('common.delete')}</button>}
      </div>
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>{t('venue.venue_name')} *</label>
          <input value={venueName} onChange={e => setVenueName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{t('venue.address')}</label>
          <input value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        {!isNew && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={isActive} onChange={async () => {
                await api.toggleVenueStatus(venueId!);
                setIsActive(!isActive);
              }} />
              {isActive ? t('venue.status_active') : t('venue.status_inactive')}
            </label>
          </div>
        )}
        <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 8 }}>
          <h3 style={{ marginBottom: 12, fontSize: 15 }}>{t('venue.manager')}</h3>
          <div className="form-group">
            <label>{t('venue.username')} *</label>
            <input value={username} onChange={e => setUsername(e.target.value)} disabled={!isNew} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('venue.password')} {isNew ? '*' : ''}</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={isNew ? '' : '••••••••'} />
            </div>
            <div className="form-group">
              <label>{t('venue.confirm_password')} {isNew ? '*' : ''}</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="btn-secondary" onClick={() => navigate('/admin/venues')}>{t('common.cancel')}</button>
          <button className="btn-primary" onClick={handleSave} disabled={loading || !venueName || (isNew && (!username || !password))}>
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
