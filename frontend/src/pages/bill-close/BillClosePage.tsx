import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

function toDatetimeLocal(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BillClosePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<any>(null);
  const isVi = i18n.language.startsWith('vi');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [amountTendered, setAmountTendered] = useState('');
  const [amountTouched, setAmountTouched] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');
  const [editRate, setEditRate] = useState('');
  const [discount, setDiscount] = useState('0');

  useEffect(() => {
    api.getSession(sessionId!).then(s => {
      setSession(s);
      setEditStart(toDatetimeLocal(s.startedAt));
      setEditEnd(toDatetimeLocal(new Date().toISOString()));
      setEditRate(String(s.hourlyRate));
      setAmountTendered('');
      setLoading(false);
    });
  }, [sessionId]);

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return `${h}h${String(m).padStart(2, '0')}`;
  };

  const calc = () => {
    if (!editStart || !editEnd || !editRate) return { duration: 0, roomCharge: 0, grandTotal: 0 };
    const start = new Date(editStart).getTime();
    const end = new Date(editEnd).getTime();
    if (isNaN(start) || isNaN(end)) return { duration: 0, roomCharge: 0, grandTotal: 0 };
    const seconds = Math.max(0, Math.floor((end - start) / 1000));
    const rate = parseInt(editRate) || 0;
    const roomCharge = Math.ceil(seconds / 3600 * rate);
    const itemSubtotal = session?.itemSubtotal || 0;
    const disc = parseInt(discount) || 0;
    const grandTotal = roomCharge + itemSubtotal - disc;
    return { duration: seconds, roomCharge, grandTotal };
  };

  const { duration, roomCharge, grandTotal } = calc();
  const tenderedAmount = parseInt(amountTendered) || 0;
  const changeDue = amountTendered ? tenderedAmount - grandTotal : 0;

  const canConfirm = paymentMethod !== 'CASH' || (tenderedAmount >= grandTotal && grandTotal > 0);

  const handleClose = async () => {
    const tendered = paymentMethod === 'CASH' ? parseInt(amountTendered) : undefined;
    const bill = await api.closeBill(sessionId!, paymentMethod, tendered, {
      startedAt: editStart + ':00',
      endedAt: editEnd + ':00',
      hourlyRate: parseInt(editRate),
      discount: parseInt(discount) || 0,
    });
    navigate(`/dashboard`);
  };

  const handlePrint = () => window.print();

  if (loading) return <div className="spinner" />;
  if (!session) return <p>{t('common.no_data')}</p>;

  return (
    <div>
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate(`/session/${sessionId}`)}>← {t('bill.back_session')}</button>
        <h1>{t('bill.title')} — {session.roomNumber}</h1>
        <div style={{ flex: 1 }} />
        <button className="btn-secondary" onClick={handlePrint}>🖨️ {t('bill.print')}</button>
      </div>
      <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          <strong style={{ fontSize: 18 }}>🎤 {session.venueName || 'kmanager'}</strong>
          {session.venueAddress && <div style={{ fontSize: 13, color: '#666' }}>{session.venueAddress}</div>}
          {session.venueHotline && <div style={{ fontSize: 13, color: '#666' }}>📞 {session.venueHotline}</div>}
          {session.venueWifi && <div style={{ fontSize: 13, color: '#666' }}>📶 WiFi: {session.venueWifi}</div>}
          <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{t('bill.bill_number')}: {t('bill.title')}</div>
        </div>

        <div className="form-row" style={{ marginBottom: 12 }}>
          <div className="form-group">
            <label>{t('bill.start_time')}</label>
            <input type="datetime-local" value={editStart} onChange={e => setEditStart(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('bill.end_time')}</label>
            <input type="datetime-local" value={editEnd} onChange={e => setEditEnd(e.target.value)} />
          </div>
        </div>
        <div className="form-row" style={{ marginBottom: 12 }}>
          <div className="form-group">
            <label>{t('bill.rate')} (VND/hr)</label>
            <input type="number" value={editRate} onChange={e => setEditRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('bill.duration')}</label>
            <input value={formatTime(duration)} disabled />
          </div>
        </div>

        <div style={{ fontSize: 14, marginBottom: 12 }}>
          <div><strong>{t('bill.customer')}:</strong> {session.customerName}</div>
          {session.customerPhone && <div><strong>{t('bill.phone')}:</strong> {session.customerPhone}</div>}
        </div>
        <table style={{ marginBottom: 16 }}>
          <thead>
            <tr><th>#</th><th>{t('menu.name')}</th><th>{isVi ? 'Số lượng' : 'Qty'}</th><th>{t('menu.price')}</th><th>{t('bill.grand_total')}</th></tr>
          </thead>
          <tbody>
            {session.items?.map((item: any, idx: number) => (
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
              <td>{session.items ? session.items.length + 1 : 1}</td>
              <td>{isVi ? 'Tiền phòng' : 'Room charge'}</td>
              <td>{formatTime(duration)}</td>
              <td>{formatCurrency(parseInt(editRate) || 0)}/hr</td>
              <td>{formatCurrency(roomCharge)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="form-row" style={{ padding: '8px 0', alignItems: 'center' }}>
          <label style={{ margin: 0 }}>{t('bill.discount')}</label>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} style={{ maxWidth: 150 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #333', fontSize: 18, fontWeight: 700 }}>
          <span>{t('bill.grand_total')}</span>
          <span>{formatCurrency(grandTotal)}</span>
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
                <input type="number" value={amountTendered} onFocus={() => { if (!amountTouched) { setAmountTendered(String(grandTotal)); setAmountTouched(true); } }} onChange={e => setAmountTendered(e.target.value)} style={{ maxWidth: 200 }} />
              </div>
              {amountTendered && (
                <div style={{ fontSize: 16, marginBottom: 12 }}>
                  {t('bill.change_due')}: <strong style={{ color: changeDue < 0 ? '#dc2626' : '#16a34a' }}>{formatCurrency(changeDue)}</strong>
                </div>
              )}
            </>
          )}
          <button className="btn-primary" style={{ width: '100%', padding: 12, fontSize: 16, marginTop: 8 }} onClick={handleClose}
            disabled={!canConfirm}>
            {t('bill.confirm_payment')}
          </button>
        </div>
      </div>
    </div>
  );
}
