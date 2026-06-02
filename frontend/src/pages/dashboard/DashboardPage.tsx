import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dash, setDash] = useState<any>(null);
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    Promise.all([api.getDashboard(), api.getTodayBills()]).then(([d, b]) => {
      setDash(d); setBills(b); setLoading(false);
    });
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
      <div className="card">
        <h3 style={{ marginBottom: 12 }}>{t('dashboard.closed_bills')}</h3>
        <table>
          <thead>
            <tr><th>#</th><th>{t('dashboard.bills_closed')}</th><th>{t('roomdetail.room_number')}</th><th>{t('bill.customer')}</th><th>{t('bill.grand_total')}</th><th>{t('bill.payment_method')}</th></tr>
          </thead>
          <tbody>
            {bills.map((b: any) => (
              <tr key={b.id}>
                <td>{b.billNumber}</td>
                <td>{new Date(b.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{b.roomNumber}</td>
                <td>{b.customerName}</td>
                <td>{formatCurrency(b.grandTotal)}</td>
                <td><span className={`badge badge-${b.paymentMethod === 'CASH' ? 'active' : 'cleaning'}`}>{t(`bill.${b.paymentMethod.toLowerCase()}`)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
