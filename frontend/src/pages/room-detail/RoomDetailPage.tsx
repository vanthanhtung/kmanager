import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function RoomDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<any>(null);
  const [nameEn, setNameEn] = useState('');
  const [nameVi, setNameVi] = useState('');
  const [area, setArea] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.getRoom(roomId!).then(r => {
      setRoom(r); setNameEn(r.nameEn || ''); setNameVi(r.nameVi || '');
      setArea(r.area || ''); setHourlyRate(String(r.hourlyRate));
      setStatus(r.status); setNotes(r.notes || '');
    });
  }, [roomId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateRoom(roomId!, { nameEn, nameVi, area, hourlyRate: parseInt(hourlyRate), status, notes });
      setToast(t('roomdetail.save_success'));
      setTimeout(() => { setToast(''); navigate('/'); }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <div className="spinner" />;

  return (
    <div>
      {toast && <div className="toast success">{toast}</div>}
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate('/')}>← {t('roomdetail.back')}</button>
        <h1>{t('roomdetail.edit_title')} — {room.roomNumber}</h1>
      </div>
      <div className="card" style={{ maxWidth: 600 }}>
        {room.status === 'OCCUPIED' && room.hourlyRate !== parseInt(hourlyRate) && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: 14 }}>
            ⚠️ {t('roomdetail.rate_warning')}
          </div>
        )}
        <div className="form-row">
          <div className="form-group">
            <label>{t('roomdetail.room_name')}</label>
            <input value={nameEn} onChange={e => setNameEn(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('roomdetail.area')}</label>
            <input value={area} onChange={e => setArea(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t('roomdetail.hourly_rate')} *</label>
            <input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('roomdetail.status')}</label>
            <select value={status} onChange={e => setStatus(e.target.value)} disabled={status === 'OCCUPIED'}>
              <option value="AVAILABLE">{t('board.available')}</option>
              <option value="MAINTENANCE">{t('board.maintenance')}</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>{t('roomdetail.notes')}</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={t('roomdetail.notes_placeholder')} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={() => navigate('/')}>{t('common.cancel')}</button>
          <button className="btn-primary" onClick={handleSave} disabled={loading || !hourlyRate}>
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
