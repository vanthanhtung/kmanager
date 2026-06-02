import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function BillClosePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [amountTendered, setAmountTendered] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSession(sessionId!).then(s => { setSession(s); setLoading(false); });
  }, [sessionId]);

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return `${h}h${String(m).padStart(2, '0')}`;
  };

  const handleClose = async () => {
    const tendered = paymentMethod === 'CASH' ? parseInt(amountTendered) : undefined;
    const bill = await api.closeBill(sessionId!, paymentMethod, tendered);
    navigate(`/dashboard`);
  };

  if (loading) return <div className="spinner" />;
  if (!session) return <p>{t('common.no_data')}</p>;

  const changeDue = amountTendered ? parseInt(amountTendered) - session.grandTotal : 0;

  return (
    <div>
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate(`/session/${sessionId}`)}>← {t('bill.back_session')}</button>
        <h1>{t('bill.title')} — {session.roomNumber}</h1>
      </div>
      <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          <strong style={{ fontSize: 16 }}>🎤 kmanager</strong>
          <div style={{ fontSize: 13, color: '#666' }}>{t('bill.bill_number')}: ...</div>
        </div>
        <div style={{ fontSize: 14, marginBottom: 12 }}>
          <div><strong>{t('bill.customer')}:</strong> {session.customerName}</div>
          {session.customerPhone && <div><strong>{t('bill.phone')}:</strong> {session.customerPhone}</div>}
          <div><strong>{t('bill.duration')}:</strong> {formatTime(session.elapsedSeconds)}</div>
        </div>
        <table style={{ marginBottom: 16 }}>
          <thead>
            <tr><th>#</th><th>{t('menu.name')}</th><th>Qty</th><th>{t('menu.price')}</th><th>{t('bill.grand_total')}</th></tr>
          </thead>
          <tbody>
            {session.items?.map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.itemNameEn}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.unitPrice)}</td>
                <td>{formatCurrency(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #eee', fontSize: 14 }}>
          <span>{t('bill.items_subtotal')}</span>
          <span>{formatCurrency(session.itemSubtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
          <span>{t('bill.room_charge')} ({formatTime(session.elapsedSeconds)} × {formatCurrency(session.hourlyRate)}/hr)</span>
          <span>{formatCurrency(session.roomCharge)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #333', fontSize: 18, fontWeight: 700 }}>
          <span>{t('bill.grand_total')}</span>
          <span>{formatCurrency(session.grandTotal)}</span>
        </div>

        <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 16 }}>
          <div className="form-group">
            <label>{t('bill.payment_method')}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['CASH', 'TRANSFER', 'CARD'].map(m => (
                <button key={m} className={`chip ${paymentMethod === m ? 'active' : ''}`} onClick={() => setPaymentMethod(m)}>
                  {t(`bill.${m.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>
          {paymentMethod === 'CASH' && (
            <>
              <div className="form-group">
                <label>{t('bill.amount_tendered')}</label>
                <input type="number" value={amountTendered} onChange={e => setAmountTendered(e.target.value)} style={{ maxWidth: 200 }} />
              </div>
              {amountTendered && (
                <div style={{ fontSize: 16, marginBottom: 12 }}>
                  {t('bill.change_due')}: <strong style={{ color: changeDue < 0 ? '#dc2626' : '#16a34a' }}>{formatCurrency(changeDue)}</strong>
                </div>
              )}
            </>
          )}
          <button className="btn-primary" style={{ width: '100%', padding: 12, fontSize: 16, marginTop: 8 }} onClick={handleClose}
            disabled={paymentMethod === 'CASH' && (!amountTendered || parseInt(amountTendered) < session.grandTotal)}>
            {t('bill.confirm_payment')}
          </button>
        </div>
      </div>
    </div>
  );
}
