import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function MenuListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');

  const load = () => api.getMenuItems(false).then(r => { setItems(r); setLoading(false); });
  useEffect(() => { load(); }, []);

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const categories = [...new Set(items.map((i: any) => i.categoryNameEn || ''))];

  const filtered = items.filter((i: any) => {
    if (search && !i.nameEn.toLowerCase().includes(search.toLowerCase()) && !i.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== 'ALL' && i.category?.nameEn !== catFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <h1>{t('menu.title')}</h1>
        <button className="btn-primary" onClick={() => navigate('/menu/new')}>{t('menu.add_item')}</button>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input placeholder={t('menu.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
      </div>
      <div className="chip-group" style={{ marginBottom: 16 }}>
        <button className={`chip ${catFilter === 'ALL' ? 'active' : ''}`} onClick={() => setCatFilter('ALL')}>{t('common.all')}</button>
        {categories.map((c: string) => (
          <button key={c} className={`chip ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>{c}</button>
        ))}
      </div>
      {loading ? <div className="spinner" /> : (
        <table>
          <thead>
            <tr><th>{t('menu.code')}</th><th>{t('menu.name')}</th><th>{t('menu.category')}</th><th>{t('menu.price')}</th><th>{t('menu.status')}</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#666' }}>{t('menu.no_items')}</td></tr>}
            {filtered.map(item => (
              <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/menu/${item.id}`)}>
                <td style={{ fontFamily: 'monospace' }}>{item.code}</td>
                <td>{item.nameEn}</td>
                <td><span className="badge badge-cleaning">{item.categoryNameEn}</span></td>
                <td>{formatCurrency(item.price)}</td>
                <td>
                  <span className={`badge ${item.isActive ? 'badge-active' : 'badge-inactive'}`}>
                    {item.isActive ? t('common.active') : t('common.inactive')}
                  </span>
                </td>
                <td><button className="btn-secondary btn-sm" onClick={e => { e.stopPropagation(); navigate(`/menu/${item.id}`); }}>✏️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
