import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function BillsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.getAllBills().then(b => { setBills(b); setLoading(false); }); }, []);

  const formatCurrency = (v: number) => v.toLocaleString('vi-VN') + 'đ';

  return (
    <div>
      <div className="page-header">
        <h1>{t('dashboard.closed_bills')}</h1>
        <button className="btn-primary" onClick={() => navigate('/bills/manual')}>{t('nav.manual_bill')}</button>
      </div>
      {loading ? <div className="spinner" /> : (
        <div className="card">
          <table>
            <thead>
              <tr><th>{t('bill.bill_number')}</th><th>{t('bill.date')}</th><th>{t('roomdetail.room_number')}</th><th>{t('bill.customer')}</th><th>{t('bill.grand_total')}</th><th>{t('bill.payment_method')}</th></tr>
            </thead>
            <tbody>
              {bills.map((b: any) => (
                <tr key={b.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/bill-detail/${b.id}`)}>
                  <td>{b.billNumber}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td>{b.roomNumber}</td>
                  <td>{b.customerName}</td>
                  <td>{formatCurrency(b.grandTotal)}</td>
                  <td><span className={`badge badge-${b.paymentMethod === 'CASH' ? 'active' : 'inactive'}`}>{t(`bill.${b.paymentMethod.toLowerCase()}`)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
