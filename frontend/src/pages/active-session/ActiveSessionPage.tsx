import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function ActiveSessionPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const addingRef = useRef(false);
  const isVi = i18n.language.startsWith('vi');

  const getName = (item: any) => isVi ? (item.nameVi || item.nameEn) : item.nameEn;
  const getCatName = (item: any) => isVi ? (item.categoryNameVi || item.categoryNameEn) : item.categoryNameEn;

  const load = async () => {
    if (addingRef.current) return;
    const [s, items] = await Promise.all([api.getSession(sessionId!), api.getMenuItems()]);
    setSession(s);
    setMenuItems(items);
    setLoading(false);
  };

  useEffect(() => { load(); const i = setInterval(load, 15000); return () => clearInterval(i); }, [sessionId]);

  const addItem = async (menuItemId: string) => {
    addingRef.current = true;
    try {
      const updated = await api.addItem(sessionId!, menuItemId);
      setSession(updated);
    } finally {
      addingRef.current = false;
    }
  };

  const removeItem = async (itemId: string) => {
    const updated = await api.removeItem(sessionId!, itemId);
    setSession(updated);
  };

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  };

  if (loading) return <div className="spinner" />;
  if (!session) return <p>{t('common.no_data')}</p>;

  const categories = [...new Set(menuItems.map((i: any) => getCatName(i) || ''))];
  const filtered = menuItems.filter((i: any) => {
    if (search && !getName(i).toLowerCase().includes(search.toLowerCase()) && !i.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCat !== 'ALL' && getCatName(i) !== activeCat) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 96px)' }}>
      {/* Left: Menu Items */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <input placeholder={t('session.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 12 }} />
        <div className="chip-group" style={{ marginBottom: 12 }}>
          <button className={`chip ${activeCat === 'ALL' ? 'active' : ''}`} onClick={() => setActiveCat('ALL')}>{t('common.all')}</button>
          {categories.map((c: string) => (
            <button key={c} className={`chip ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {filtered.map((item: any) => (
            <div key={item.id} className="card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => addItem(item.id)}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{getName(item)}</div>
              <div style={{ fontSize: 13, color: '#666' }}>{formatCurrency(item.price)}</div>
              <button className="btn-primary btn-sm" style={{ marginTop: 8 }}>
                {t('session.add')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Running Bill */}
      <div style={{ width: 360, background: 'white', borderRadius: 8, padding: 16, boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 12 }}>
          <strong>{t('session.room')} {session.roomNumber}</strong>
          <div style={{ fontSize: 13, color: '#666' }}>{session.customerName} {session.customerPhone && '• ' + session.customerPhone}</div>
          <div style={{ fontSize: 13, color: '#666' }}>⏱ {formatTime(session.elapsedSeconds)}</div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', marginBottom: 12 }}>
          {(!session.items || session.items.length === 0) && <p style={{ fontSize: 13, color: '#666' }}>{t('session.no_items')}</p>}
          {session.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: 14 }}>
              <span>{item.quantity}× {isVi ? (item.itemNameVi || item.itemNameEn) : item.itemNameEn}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{formatCurrency(item.lineTotal)}</span>
                <button className="btn-sm" style={{ padding: '2px 6px', fontSize: 12, background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 4, cursor: 'pointer' }} onClick={() => removeItem(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '2px solid #333', paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
            <span>{t('session.items_subtotal')}</span>
            <span>{formatCurrency(session.itemSubtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span>{t('session.room_charge')} ({formatTime(session.elapsedSeconds)})</span>
            <span>{formatCurrency(session.roomCharge)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
            <span>{t('session.grand_total')}</span>
            <span>{formatCurrency(session.grandTotal)}</span>
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: 16, padding: '12px', fontWeight: 600 }} onClick={() => navigate(`/bill/${sessionId}`)}>
          {t('session.close_bill')}
        </button>
      </div>
    </div>
  );
}
