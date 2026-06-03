import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function BillDetailPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { billId } = useParams<{ billId: string }>();
  const [bill, setBill] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isVi = i18n.language.startsWith('vi');

  useEffect(() => {
    api.getBill(billId!).then(b => { setBill(b); setLoading(false); });
  }, [billId]);

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return `${h}h${String(m).padStart(2, '0')}`;
  };
  const formatDate = (iso: string) => new Date(iso).toLocaleString(isVi ? 'vi-VN' : 'en-US');

  const handlePrint = () => window.print();

  if (loading) return <div className="spinner" />;
  if (!bill) return <p>{t('common.no_data')}</p>;

  return (
    <div>
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>← {t('common.back')}</button>
        <h1>{t('bill.bill_number')}: {bill.billNumber}</h1>
        <div style={{ flex: 1 }} />
        <button className="btn-secondary" onClick={handlePrint}>🖨️ {t('bill.print')}</button>
      </div>
      <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          <strong style={{ fontSize: 18 }}>🎤 {bill.venueName || 'kmanager'}</strong>
          {bill.venueAddress && <div style={{ fontSize: 13, color: '#666' }}>{bill.venueAddress}</div>}
          {bill.venueHotline && <div style={{ fontSize: 13, color: '#666' }}>📞 {bill.venueHotline}</div>}
          {bill.venueWifi && <div style={{ fontSize: 13, color: '#666' }}>📶 WiFi: {bill.venueWifi}</div>}
          <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{t('bill.bill_number')}: {bill.billNumber}</div>
        </div>

        <div style={{ fontSize: 14, marginBottom: 12 }}>
          <div><strong>{t('roomdetail.room_number')}:</strong> {bill.roomNumber}</div>
          <div><strong>{t('bill.customer')}:</strong> {bill.customerName}</div>
          {bill.customerPhone && <div><strong>{t('bill.phone')}:</strong> {bill.customerPhone}</div>}
          <div><strong>{t('bill.start_time')}:</strong> {formatDate(bill.startedAt)}</div>
          <div><strong>{t('bill.end_time')}:</strong> {formatDate(bill.endedAt)}</div>
        </div>

        <table style={{ marginBottom: 16 }}>
          <thead>
            <tr><th>#</th><th>{t('menu.name')}</th><th>{isVi ? 'Số lượng' : 'Qty'}</th><th>{t('menu.price')}</th><th>{t('bill.grand_total')}</th></tr>
          </thead>
          <tbody>
            {bill.items?.map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{isVi ? (item.itemNameVi || item.itemNameEn) : item.itemNameEn}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.unitPrice)}</td>
                <td>{formatCurrency(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #999', fontStyle: 'italic' }}>
              <td>{bill.items ? bill.items.length + 1 : 1}</td>
              <td>{isVi ? 'Tiền phòng' : 'Room charge'}</td>
              <td>{formatTime(bill.durationSeconds)}</td>
              <td>{formatCurrency(bill.hourlyRate)}/hr</td>
              <td>{formatCurrency(bill.roomCharge)}</td>
            </tr>
          </tfoot>
        </table>

        {bill.discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
            <span>{t('bill.discount')}</span>
            <span>-{formatCurrency(bill.discount)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #333', fontSize: 18, fontWeight: 700 }}>
          <span>{t('bill.grand_total')}</span>
          <span>{formatCurrency(bill.grandTotal)}</span>
        </div>

        <div style={{ marginTop: 16, borderTop: '1px solid #eee', paddingTop: 12, fontSize: 14 }}>
          <div><strong>{t('bill.payment_method')}:</strong> {t(`bill.${bill.paymentMethod.toLowerCase()}`)}</div>
          {bill.amountTendered && <div><strong>{t('bill.amount_tendered')}:</strong> {formatCurrency(bill.amountTendered)}</div>}
          {bill.changeDue != null && (
            <div><strong>{t('bill.change_due')}:</strong> <span style={{ color: bill.changeDue < 0 ? '#dc2626' : '#16a34a' }}>{formatCurrency(bill.changeDue)}</span></div>
          )}
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {t('bill.cashier')}: {bill.createdBy} • {formatDate(bill.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
