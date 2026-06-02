import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function VenueListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => { api.getVenues().then(v => { setVenues(v); setLoading(false); }); }, []);

  const filtered = venues.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    return true;
  });

  const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('vi-VN') : '—';

  return (
    <div>
      <div className="page-header">
        <h1>{t('venue.title')}</h1>
        <button className="btn-primary" onClick={() => navigate('/admin/venues/new')}>{t('venue.add_venue')}</button>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input placeholder={t('venue.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
        <div className="chip-group">
          {['ALL', 'ACTIVE', 'INACTIVE'].map(s => (
            <button key={s} className={`chip ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'ALL' ? t('common.all') : t(`venue.status_${s.toLowerCase()}`)}
            </button>
          ))}
        </div>
      </div>
      {loading ? <div className="spinner" /> : (
        <table>
          <thead>
            <tr><th>{t('venue.name')}</th><th>{t('venue.manager')}</th><th>{t('venue.rooms')}</th><th>{t('venue.menu_items')}</th><th>{t('venue.last_activity')}</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#666' }}>{t('venue.no_venues')}</td></tr>}
            {filtered.map(v => (
              <tr key={v.id}>
                <td>
                  <span style={{ marginRight: 8 }}>{v.status === 'ACTIVE' ? '🟢' : '⚫'}</span>
                  <strong>{v.name}</strong>
                  {v.address && <div style={{ fontSize: 12, color: '#666' }}>{v.address}</div>}
                </td>
                <td>{v.managerUsername || '—'}</td>
                <td>{v.roomCount}</td>
                <td>{v.menuItemCount}</td>
                <td style={{ fontSize: 13 }}>{formatDate(v.lastActivity)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn-secondary btn-sm" onClick={() => navigate(`/admin/venues/${v.id}`)}>✏️</button>
                    <button className="btn-secondary btn-sm" onClick={async () => { await api.toggleVenueStatus(v.id); window.location.reload(); }}>
                      {v.status === 'ACTIVE' ? '⏸' : '▶'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
