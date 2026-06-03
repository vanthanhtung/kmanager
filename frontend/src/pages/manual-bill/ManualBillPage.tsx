import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ManualBillPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isVi = i18n.language.startsWith('vi');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [editStart, setEditStart] = useState(toDatetimeLocal(new Date().toISOString()));
  const [editEnd, setEditEnd] = useState(toDatetimeLocal(new Date().toISOString()));
  const [editRate, setEditRate] = useState('200000');
  const [discount, setDiscount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [amountTendered, setAmountTendered] = useState('');
  const [amountTouched, setAmountTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Manual items
  const [items, setItems] = useState<{ nameEn: string; nameVi: string; quantity: number; unitPrice: number }[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [newItemPrice, setNewItemPrice] = useState('');

  const addItem = () => {
    if (!newItemName || !newItemPrice) return;
    setItems([...items, {
      nameEn: newItemName,
      nameVi: newItemName,
      quantity: parseInt(newItemQty) || 1,
      unitPrice: parseInt(newItemPrice) || 0,
    }]);
    setNewItemName('');
    setNewItemQty('1');
    setNewItemPrice('');
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return `${h}h${String(m).padStart(2, '0')}`;
  };

  const calc = () => {
    if (!editStart || !editEnd || !editRate) return { duration: 0, roomCharge: 0, itemSubtotal: 0, grandTotal: 0 };
    const start = new Date(editStart).getTime();
    const end = new Date(editEnd).getTime();
    if (isNaN(start) || isNaN(end)) return { duration: 0, roomCharge: 0, itemSubtotal: 0, grandTotal: 0 };
    const seconds = Math.max(0, Math.floor((end - start) / 1000));
    const rate = parseInt(editRate) || 0;
    const roomCharge = Math.ceil(seconds / 3600 * rate);
    const itemSubtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const disc = parseInt(discount) || 0;
    const grandTotal = roomCharge + itemSubtotal - disc;
    return { duration: seconds, roomCharge, itemSubtotal, grandTotal };
  };

  const { duration, roomCharge, itemSubtotal, grandTotal } = calc();
  const tenderedAmount = parseInt(amountTendered) || 0;
  const changeDue = amountTendered ? tenderedAmount - grandTotal : 0;
  const canConfirm = paymentMethod !== 'CASH' || (tenderedAmount >= grandTotal && grandTotal > 0);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.createManualBill({
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        roomNumber: roomNumber || undefined,
        startedAt: editStart + ':00',
        endedAt: editEnd + ':00',
        hourlyRate: parseInt(editRate),
        discount: parseInt(discount) || 0,
        paymentMethod,
        amountTendered: paymentMethod === 'CASH' ? tenderedAmount : undefined,
        items: items.map(i => ({
          itemNameEn: i.nameEn,
          itemNameVi: i.nameVi,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
      });
      navigate('/bills');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate('/bills')}>← {t('common.back')}</button>
        <h1>{t('nav.manual_bill')}</h1>
        <div style={{ flex: 1 }} />
        <button className="btn-secondary" onClick={handlePrint}>🖨️ {t('bill.print')}</button>
      </div>
      <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          <strong style={{ fontSize: 18 }}>🎤 kmanager</strong>
          <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{t('nav.manual_bill')}</div>
        </div>

        <div className="form-row" style={{ marginBottom: 12 }}>
          <div className="form-group">
            <label>{t('bill.customer')}</label>
            <input value={customerName} onChange={e => setCustomerName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('bill.phone')}</label>
            <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 12 }}>
          <label>{t('roomdetail.room_number')}</label>
          <input value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
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

        {/* Items */}
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 8 }}>{t('menu.title')}</h4>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <input placeholder={t('menu.name')} value={newItemName} onChange={e => setNewItemName(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
            <input type="number" placeholder={isVi ? 'SL' : 'Qty'} value={newItemQty} onChange={e => setNewItemQty(e.target.value)} style={{ width: 60 }} />
            <input type="number" placeholder={t('menu.price')} value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} style={{ width: 120 }} />
            <button className="btn-primary btn-sm" onClick={addItem}>{t('common.add')}</button>
          </div>
          {items.length > 0 && (
            <table style={{ marginBottom: 8 }}>
              <thead><tr><th>#</th><th>{t('menu.name')}</th><th>{isVi ? 'Số lượng' : 'Qty'}</th><th>{t('menu.price')}</th><th>{t('bill.grand_total')}</th><th></th></tr></thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.nameEn}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.unitPrice)}</td>
                    <td>{formatCurrency(item.quantity * item.unitPrice)}</td>
                    <td><button className="btn-sm" style={{ padding: '2px 6px', fontSize: 12, background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 4, cursor: 'pointer' }} onClick={() => removeItem(idx)}>✕</button></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #999', fontStyle: 'italic' }}>
                  <td>{items.length + 1}</td>
                  <td>{isVi ? 'Tiền phòng' : 'Room charge'}</td>
                  <td>{formatTime(duration)}</td>
                  <td>{formatCurrency(parseInt(editRate) || 0)}/hr</td>
                  <td>{formatCurrency(roomCharge)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

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
          <button className="btn-primary" style={{ width: '100%', padding: 12, fontSize: 16, marginTop: 8 }} onClick={handleSave}
            disabled={loading || !canConfirm}>
            {t('bill.confirm_payment')}
          </button>
        </div>
      </div>
    </div>
  );
}
