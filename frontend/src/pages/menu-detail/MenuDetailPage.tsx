import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function MenuDetailPage() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language.startsWith('vi');
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const isNew = !itemId;

  const [code, setCode] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameVi, setNameVi] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.getMenuCategories().then(setCategories);
    if (!isNew) {
      api.getMenuItem(itemId!).then(item => {
        setCode(item.code); setNameEn(item.nameEn); setNameVi(item.nameVi);
        setCategoryId(item.categoryId || ''); setPrice(String(item.price));
        setDescription(item.description || '');
      });
    }
  }, [itemId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const data: any = { code, nameEn, nameVi, categoryId, price: parseInt(price), description };
      if (isNew) await api.createMenuItem(data);
      else {
        await api.updateMenuItem(itemId!, data);
      }
      setToast(t('menuitem.save_success'));
      setTimeout(() => { setToast(''); navigate('/menu'); }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {toast && <div className="toast success">{toast}</div>}
      <div className="page-header">
        <button className="btn-secondary" onClick={() => navigate('/menu')}>← {t('menuitem.back')}</button>
        <h1>{isNew ? t('menuitem.add_title') : t('menuitem.edit_title')}</h1>
      </div>
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>{t('menuitem.code')} *</label>
          <input value={code} onChange={e => setCode(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t('menuitem.name_en')} *</label>
            <input value={nameEn} onChange={e => setNameEn(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('menuitem.name_vi')} *</label>
            <input value={nameVi} onChange={e => setNameVi(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>{t('menuitem.category')} *</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">—</option>
            {categories.map(c => <option key={c.id} value={c.id}>{isVi ? (c.nameVi || c.nameEn) : c.nameEn}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>{t('menuitem.price')} *</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{t('menuitem.description')}</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={t('menuitem.description_placeholder')} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={() => navigate('/menu')}>{t('common.cancel')}</button>
          <button className="btn-primary" onClick={handleSave} disabled={loading || !code || !nameEn || !nameVi || !categoryId || !price}>
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
