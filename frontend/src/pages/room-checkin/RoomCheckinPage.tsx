import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function RoomCheckinPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!customerName.trim()) return;
    setLoading(true);
    try {
      const session = await api.createSession(roomId!, { customerName, customerPhone, notes });
      navigate(`/session/${session.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate('/')}>← {t('common.back')}</button>
        <h1>{t('checkin.title')} — {t('checkin.room')} {roomId?.slice(0, 5)}</h1>
      </div>
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>{t('checkin.customer_name')} *</label>
          <input value={customerName} onChange={e => setCustomerName(e.target.value)} autoFocus />
        </div>
        <div className="form-group">
          <label>{t('checkin.customer_phone')}</label>
          <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{t('checkin.notes')}</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={t('checkin.notes_placeholder')} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={() => navigate('/')}>{t('common.cancel')}</button>
          <button className="btn-primary" onClick={handleStart} disabled={loading || !customerName.trim()}>
            {loading ? t('common.loading') : t('checkin.start_session')}
          </button>
        </div>
      </div>
    </div>
  );
}
