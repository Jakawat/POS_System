import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesJournal from './components/SalesJournal';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
        {/* Sidebar */}
        <div style={{ width: '280px', backgroundColor: '#e2e8f0', position: 'fixed', height: '100vh' }}>
          <h2 style={{ padding: '50px 0 20px 60px', fontWeight: '900' }}>POS SYSTEM</h2>

          <nav style={{ padding: '0 20px' }}>
            <NavLink to="/" style={({ isActive }) => ({
              display: 'block', padding: '14px 20px', borderRadius: '10px', textDecoration: 'none',
              backgroundColor: isActive ? '#fff' : 'transparent',
              color: isActive ? '#2563eb' : '#64748b', fontWeight: 'bold'
            })}>Dashboard</NavLink>

            <NavLink to="/journal" style={({ isActive }) => ({
              display: 'block', padding: '14px 20px', borderRadius: '10px', textDecoration: 'none',
              backgroundColor: isActive ? '#fff' : 'transparent',
              color: isActive ? '#2563eb' : '#64748b', fontWeight: 'bold'
            })}>Sales Journal</NavLink>
          </nav>
        </div>

        {/* Main Content */}
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