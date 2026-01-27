import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const [sales] = useState(() => {
    const saved = localStorage.getItem('salesJournal');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [period, setPeriod] = useState('all');

  const filteredSales = (() => {
    if (period === 'all') return sales;
    const now = new Date();
    return sales.filter(s => {
      const saleDate = new Date(s.date);
      if (period === 'daily') return saleDate.toDateString() === now.toDateString();
      if (period === 'weekly') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return saleDate >= oneWeekAgo && saleDate <= now;
      }
      return true;
    });
  })();

  const totalSales = filteredSales.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const avgSale = filteredSales.length > 0 ? totalSales / filteredSales.length : 0;

  {/*Line chart(daily trend)*/}
  const lineData = Object.values(filteredSales.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] || { date: curr.date, amount: 0 };
    acc[curr.date].amount += curr.total;
    return acc;
  }, {})).sort((a, b) => new Date(a.date) - new Date(b.date));

  {/*Pie chart(Category distribute)*/}
  const categoryData = Object.values(filteredSales.reduce((acc, curr) => {
    acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
    acc[curr.category].value += curr.total;
    return acc;
  }, {}));

  const productSales = Object.values(filteredSales.reduce((acc, curr) => {
    acc[curr.itemName] = acc[curr.itemName] || { name: curr.itemName, amount: 0 };
    acc[curr.itemName].amount += curr.total;
    return acc;
  }, {}));

  {/*Top 5 Rank*/}
  const top5 = Object.values(filteredSales.reduce((acc, curr) => {
    acc[curr.itemName] = acc[curr.itemName] || { name: curr.itemName, qty: 0 };
    acc[curr.itemName].qty += curr.quantity;
    return acc;
  }, {})).sort((a, b) => b.qty - a.qty).slice(0, 5);

  const CATEGORY_COLORS = ['#0ea5e9', '#f43f5e', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6'];

  const renderCustomizedLabel = ({ percent }) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#1e293b' }}>Overview</h1>
        
        <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '5px', borderRadius: '12px' }}>
          {['all', 'daily', 'weekly'].map((p) => (
            <button 
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 'bold',
                backgroundColor: period === p ? '#fff' : 'transparent',
                color: period === p ? '#2563eb' : '#64748b'
              }}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold' }}>TOTAL REVENUE</p>
          <h2 style={{ fontSize: '2.6rem', margin: '8px 0 0 0', color: '#1e293b' }}>฿{totalSales.toLocaleString()}</h2>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold' }}>AVG ORDER VALUE</p>
          <h2 style={{ fontSize: '2.6rem', margin: '8px 0 0 0', color: '#1e293b' }}>฿{avgSale.toLocaleString(undefined, {maximumFractionDigits: 0})}</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '20px' }}>Sales Trend</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '20px' }}>Category Distribution</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie 
                  data={categoryData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  isAnimationActive={false}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '20px' }}>Top 5 - Best Sellers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {top5.map((item, i) => (
            <div key={i} style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px' }}>RANK {i+1}</div>
              <div style={{ fontWeight: '800', fontSize: '1rem', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ color: '#2563eb', fontWeight: 'bold' }}>{item.qty} units</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '20px' }}>Product Performance List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
              <th style={{ padding: '12px', color: '#64748b', fontSize: '0.8rem' }}>PRODUCT</th>
              <th style={{ padding: '12px', color: '#64748b', fontSize: '0.8rem', textAlign: 'right' }}>TOTAL REVENUE</th>
            </tr>
          </thead>
          <tbody>
            {productSales.sort((a,b) => b.amount - a.amount).map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{p.name}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '800', color: '#2563eb' }}>฿{p.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;