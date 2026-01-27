import React, { useState } from 'react';
import products from '../data/product-item.json';

const SalesJournal = () => {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('salesJournal');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ 
    itemName: '', 
    quantity: 1, 
    date: new Date().toISOString().split('T')[0] 
  });

  {/*Auto Calc*/}
  const selectedProduct = products.find(p => p.itemName === form.itemName);
  const currentTotal = selectedProduct ? selectedProduct.unitPrice * form.quantity : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert("Select a product");

    const newEntry = {
      ...form,
      id: Date.now(),
      category: selectedProduct.category,
      unitPrice: selectedProduct.unitPrice,
      total: currentTotal
    };

    const updated = [newEntry, ...sales];
    setSales(updated);
    localStorage.setItem('salesJournal', JSON.stringify(updated));
    setForm({ ...form, itemName: '', quantity: 1, date: form.date });
  };

  const inputStyle = {
    width: '100%',
    height: '45px',
    padding: '0 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.7rem',
    color: '#64748b',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '30px', fontWeight: '800' }}>Sales Journal</h1>
      
      {/* GRID LAYOUT*/}
      <form onSubmit={handleSubmit} style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '16px', 
        border: '1px solid #e2e8f0',
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
        gap: '20px',
        alignItems: 'end'
      }}>
        
        <div>
          <label style={labelStyle}>SELECT ITEM</label>
          <select style={inputStyle} value={form.itemName} onChange={e => setForm({...form, itemName: e.target.value})} required>
            <option value="">Choose...</option>
            {products.map((p, i) => <option key={i} value={p.itemName}>{p.itemName}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>QUANTITY NUMBER</label>
          <input style={inputStyle} type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: parseInt(e.target.value) || 1})} />
        </div>

        <div>
          <label style={labelStyle}>DATE</label>
          <input style={inputStyle} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
        </div>

        <div>
          <label style={labelStyle}>TOTAL PRICE</label>
          <div style={{ ...inputStyle, backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            {currentTotal.toLocaleString()} baht
          </div>
        </div>

        <button type="submit" style={{ 
          ...inputStyle, 
          backgroundColor: '#2563eb', 
          color: 'white', 
          border: 'none', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}>
          ADD SALE
        </button>
      </form>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '18px 24px', textAlign: 'left', color: '#64748b', fontSize: '0.7rem' }}>DATE</th>
              <th style={{ padding: '18px 24px', textAlign: 'left', color: '#64748b', fontSize: '0.7rem' }}>ITEM NAME</th>
              <th style={{ padding: '18px 24px', textAlign: 'center', color: '#64748b', fontSize: '0.7rem' }}>QTY</th>
              <th style={{ padding: '18px 24px', textAlign: 'right', color: '#64748b', fontSize: '0.7rem' }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? sales.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '18px 24px', color: '#64748b' }}>{s.date}</td>
                <td style={{ padding: '18px 24px', fontWeight: '600' }}>{s.itemName}</td>
                <td style={{ padding: '18px 24px', textAlign: 'center' }}>{s.quantity}</td>
                <td style={{ padding: '18px 24px', textAlign: 'right', fontWeight: '800', color: '#2563eb' }}>
                  {s.total.toLocaleString()} baht
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No data in history.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesJournal;