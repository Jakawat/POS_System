import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesJournal from './components/SalesJournal';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
        {/*Sidebar container*/}
        <div style={{ 
          width: '280px', 
          backgroundColor: '#e2e8f0', 
          padding: '50px 0', 
          position: 'fixed', 
          height: '100vh',
          borderRight: '1px solid #cbd5e1',
          boxShadow: '2px 0 5px rgba(0,0,0,0.02)'
        }}>
          {/*Title*/}
          <h2 style={{ 
            fontSize: '1.4rem', 
            color: '#1e293b', 
            marginBottom: '50px', 
            fontWeight: '900',
            paddingLeft: '60px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            POS SYSTEM
          </h2>
          
          <nav style={{ padding: '0 20px' }}>
            <NavLink to="/" style={({isActive}) => ({
              display: 'block', 
              padding: '14px 20px', 
              borderRadius: '10px', 
              textDecoration: 'none',
              backgroundColor: isActive ? '#fff' : 'transparent',
              color: isActive ? '#2563eb' : '#64748b',
              fontWeight: 'bold', 
              marginBottom: '12px',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.1)' : 'none'
            })}>Dashboard</NavLink>
            
            <NavLink to="/journal" style={({isActive}) => ({
              display: 'block', 
              padding: '14px 20px', 
              borderRadius: '10px', 
              textDecoration: 'none',
              backgroundColor: isActive ? '#fff' : 'transparent',
              color: isActive ? '#2563eb' : '#64748b',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.1)' : 'none'
            })}>Sales Journal</NavLink>
          </nav>
        </div>

        {/*Headline*/}
        <div style={{ marginLeft: '280px', flex: 1, padding: '60px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<SalesJournal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;