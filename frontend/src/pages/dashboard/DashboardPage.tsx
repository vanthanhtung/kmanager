import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dash, setDash] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.getDashboard().then(d => { setDash(d); setLoading(false); });
  };

  useEffect(() => { load(); const i = setInterval(load, 30000); return () => clearInterval(i); }, []);

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header"><h1>{t('dashboard.title')}</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="label">{t('dashboard.today_revenue')}</div>
          <div className="value">{formatCurrency(dash.todayRevenue)}</div>
        </div>
        <div className="kpi-card">
          <div className="label">{t('dashboard.active_sessions')}</div>
          <div className="value">{dash.activeSessions}</div>
        </div>
        <div className="kpi-card">
          <div className="label">{t('dashboard.bills_closed')}</div>
          <div className="value">{dash.billsClosed}</div>
        </div>
        <div className="kpi-card">
          <div className="label">{t('dashboard.utilization')}</div>
          <div className="value">{dash.totalRooms > 0 ? Math.round(dash.activeSessions / dash.totalRooms * 100) : 0}%</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>{t('dashboard.revenue_breakdown')}</h3>
        <div style={{ display: 'flex', gap: 24 }}>
          <div><span style={{ color: '#2563eb' }}>■</span> {t('dashboard.room_revenue')}: {formatCurrency(dash.roomRevenue)}</div>
          <div><span style={{ color: '#f59e0b' }}>■</span> {t('dashboard.item_revenue')}: {formatCurrency(dash.itemRevenue)}</div>
        </div>
      </div>
    </div>
  );
}
