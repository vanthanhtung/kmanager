import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function RoomBoardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [showCreate, setShowCreate] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomRate, setNewRoomRate] = useState('200000');
  const [newRoomArea, setNewRoomArea] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => api.getRooms().then(r => { setRooms(r); setLoading(false); });
  useEffect(() => { load(); const i = setInterval(load, 10000); return () => clearInterval(i); }, []);

  const handleCreate = async () => {
    if (!newRoomNumber || !newRoomRate) return;
    setSaving(true);
    try {
      await api.createRoom({ roomNumber: newRoomNumber, nameEn: newRoomName, nameVi: newRoomName, hourlyRate: parseInt(newRoomRate), area: newRoomArea });
      setShowCreate(false);
      setNewRoomNumber(''); setNewRoomName(''); setNewRoomRate('200000'); setNewRoomArea('');
      load();
    } finally { setSaving(false); }
  };

  const handleStartSession = async (roomId: string) => {
    try {
      const session = await api.getRoomActiveSession(roomId);
      navigate(`/session/${session.id}`);
    } catch {
      // fallback if no active session
    }
  };

  const filtered = rooms.filter(r => {
    if (search && !r.roomNumber.includes(search) && !(r.nameEn || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    return true;
  });

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const statusLabel = (s: string) => t('board.' + s.toLowerCase());

  return (
    <div>
      <div className="page-header">
        <h1>{t('board.title')}</h1>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>{t('board.add_room')}</button>
      </div>

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3 style={{ marginBottom: 16 }}>{t('board.modal_title')}</h3>
            <div className="form-group">
              <label>{t('board.room_number')} *</label>
              <input value={newRoomNumber} onChange={e => setNewRoomNumber(e.target.value)} autoFocus />
            </div>
            <div className="form-group">
              <label>{t('board.room_name')}</label>
              <input value={newRoomName} onChange={e => setNewRoomName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('board.area')}</label>
              <input value={newRoomArea} onChange={e => setNewRoomArea(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('board.hourly_rate')} *</label>
              <input type="number" value={newRoomRate} onChange={e => setNewRoomRate(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn-secondary" onClick={() => setShowCreate(false)}>{t('common.cancel')}</button>
              <button className="btn-primary" onClick={handleCreate} disabled={saving || !newRoomNumber || !newRoomRate}>{t('common.save')}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <input placeholder={t('board.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 250 }} />
        <div className="chip-group">
          {['ALL', 'AVAILABLE', 'OCCUPIED', 'MAINTENANCE'].map(s => (
            <button key={s} className={`chip ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'ALL' ? t('common.all') : statusLabel(s)}
            </button>
          ))}
        </div>
      </div>
      {loading ? <div className="spinner" /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.length === 0 && !showCreate && <p style={{ color: '#666' }}>{t('board.no_rooms')}</p>}
          {filtered.map(room => (
            <div
              key={room.id}
              className="card"
              style={{ borderLeft: `4px solid var(--color-${room.status.toLowerCase()})` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong>{room.roomNumber}</strong>
                <span className={`badge badge-${room.status.toLowerCase()}`}>{statusLabel(room.status)}</span>
              </div>
              <div style={{ fontSize: 13, color: '#666' }}>
                {room.nameEn && <div>{room.nameEn}</div>}
                {room.area && <div>{room.area}</div>}
                <div>{formatCurrency(room.hourlyRate)}{t('board.rate')}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {room.status === 'AVAILABLE' && (
                  <button className="btn-primary" style={{ flex: 1 }} onClick={() => navigate(`/checkin/${room.id}`)}>
                    {t('board.check_in')}
                  </button>
                )}
                {room.status === 'OCCUPIED' && (
                  <button className="btn-primary" style={{ flex: 1 }} onClick={() => handleStartSession(room.id)}>
                    {t('board.view_room')}
                  </button>
                )}
                {room.status !== 'OCCUPIED' && (
                  <button className="btn-secondary" onClick={() => navigate(`/rooms/${room.id}`)}>
                    {t('common.edit')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
