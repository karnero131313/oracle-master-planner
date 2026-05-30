'use client';

import { useState } from 'react';

function MasterOracleDashboard() {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');
  const [focusContext, setFocusContext] = useState('career');
  const [timeScope, setTimeScope] = useState('weekly');

  const [name, setName] = useState('');
  const [birthDay, setBirthDay] = useState('10');
  const [birthMonth, setBirthMonth] = useState('04');
  const [birthYear, setBirthYear] = useState('1977');
  const [birthTime, setBirthTime] = useState('11:00');
  const [birthPlace, setBirthPlace] = useState('');
  const [sex, setSex] = useState('Male');

  const [entityName, setEntityName] = useState('');
  const [incDay, setIncDay] = useState('1');
  const [incMonth, setIncMonth] = useState('01');
  const [incYear, setIncYear] = useState('2026');
  const [registrationTime, setRegistrationTime] = useState('12:00');
  const [headquartersLocation, setHeadquartersLocation] = useState('');

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const months = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' }
  ];

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const bDate = `${birthYear}-${birthMonth}-${birthDay.padStart(2, '0')}`;
    const cDate = `${incYear}-${incMonth}-${incDay.padStart(2, '0')}`;

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeTab,
          focusContext,
          timeScope,
          query,
          personal: { name, birthDate: bDate, birthTime, birthPlace, sex },
          corporate: { entityName, incorporationDate: cDate, registrationTime, headquartersLocation }
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Error calculating matrix.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '950px', margin: '30px auto', padding: '25px', color: '#fff', background: '#000', borderRadius: '16px', border: '1px solid #222' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', margin: '0' }}>Master Oracle Planner</h1>
        <p style={{ color: '#666', fontSize: '13px', textTransform: 'uppercase' }}>Temporal Forecasting Node</p>
      </header>

      <div style={{ display: 'flex', gap: '8px', background: '#111', padding: '6px', borderRadius: '8px', marginBottom: '25px' }}>
        <button type="button" onClick={() => { setActiveTab('personal'); setResult(null); }} style={{ flex: 1, padding: '10px', background: activeTab === 'personal' ? '#222' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>
          ✨ Personal Genesis
        </button>
        <button type="button" onClick={() => { setActiveTab('business'); setResult(null); }} style={{ flex: 1, padding: '10px', background: activeTab === 'business' ? '#222' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>
          🏛️ Corporate Egregore
        </button>
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {activeTab === 'personal' && (
          <div style={{ background: '#0c0c0c', padding: '20px', borderRadius: '12px', border: '1px solid #222' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Identity Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Full Birth Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Polarity Arc</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }}>
                  <option value="Male">Solar (Male)</option>
                  <option value="Female">Lunar (Female)</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Timeline Incarnation</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                  <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>Day {d}</option>)}
                  </select>
                  <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }}>
                    {Array.from({ length: 100 }, (_, i) => 2026 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
                  </select>
                  <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }} />
                </div>
              </div>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Birth Station City/Country</label>
                <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div style={{ background: '#0c0c0c', padding: '20px', borderRadius: '12px', border: '1px solid #222' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Corporate Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Venture Name</label>
                <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }} />
              </div>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Launch Target Timeline</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                  <select value={incDay} onChange={(e) => setIncDay(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>Day {d}</option>)}
                  </select>
                  <select value={incMonth} onChange={(e) => setIncMonth(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select value={incYear} onChange={(e) => setIncYear(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }}>
                    {Array.from({ length: 50 }, (_, i) => 2026 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
                  </select>
                  <input type="time" value={registrationTime} onChange={(e) => setRegistrationTime(e.target.value)} style={{ padding: '10px', background: '#111', color: '#fff' }} />
                </div>
              </div>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#888' }}>Headquarters Location</label>
                <input type="text" value={headquartersLocation} onChange={(e) => setHeadquartersLocation(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0c0c0c', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#888' }}>Temporal Matrix Scale</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { id: 'snapshot', name: '⚡ Core Instant Arc' },
              { id: 'weekly', name: '📅 1-Week Horizon' },
              { id: 'monthly', name: '🌙 Monthly Cycle' }
            ].map(t => (
              <div key={t.id} onClick={() => setTimeScope(t.id)} style={{ padding: '12px', background: timeScope === t.id ? '#222' : '#111', border: timeScope === t.id ? '1px solid #fff' : '1px solid #333', cursor: 'pointer', textAlign: 'center', borderRadius: '6px' }}>
                <div style={{ fontSize: '13px' }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0c0c0c', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#888' }}>Intent Target Focus Vector</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            {[
              { id: 'career', title: '💼 Career & Capital' },
              { id: 'relationship', title: '❤️ Alliances & Synastry' },
              { id: 'spiritual', title: '👁️ Karmic Path Matrix' },
              { id: 'crisis', title: '🔥 Hazard Mitigation' }
            ].map((item) => (
              <div key={item.id} onClick={() => setFocusContext(item.id)} style={{ padding: '12px', background: focusContext === item.id ? '#222' : '#111', border: focusContext === item.id ? '1px solid #fff' : '1px solid #333', cursor: 'pointer', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px' }}>{item.title}</span>
              </div>
            ))}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#555' }}>Context Details</label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Scenario specifications..." style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }} />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '15px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Fusing Matrices...' : 'Compute Universal Forecast'}
        </button>
      </form>

      {result && result.matrix && (
        <div style={{ marginTop: '40px', padding: '25px', background: '#0a0a0a', borderRadius: '12px', border: '1px solid #333' }}>
          
          {result.numerologyProfile && (
            <div style={{ background: '#111', padding: '20px', borderRadius: '8px', marginBottom: '25px',
