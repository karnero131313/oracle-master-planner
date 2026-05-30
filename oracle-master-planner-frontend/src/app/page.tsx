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

    const composedBirthDate = `${birthYear}-${birthMonth}-${birthDay.padStart(2, '0')}`;
    const composedIncDate = `${incYear}-${incMonth}-${incDay.padStart(2, '0')}`;

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeTab,
          focusContext,
          timeScope,
          query,
          personal: { name, birthDate: composedBirthDate, birthTime, birthPlace, sex },
          corporate: { entityName, incorporationDate: composedIncDate, registrationTime, headquartersLocation }
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('An error occurred during calculation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '35px', fontFamily: 'sans-serif', color: '#f5f5f7', background: '#020202', borderRadius: '24px', border: '1px solid #141416' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', margin: '0' }}>Master Oracle Planner</h1>
        <p style={{ color: '#444', margin: '5px 0 0 0', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Deterministic Metaphysical Temporal Forecasting Engine</p>
      </header>

      <div style={{ display: 'flex', gap: '8px', background: '#09090a', padding: '6px', borderRadius: '12px', marginBottom: '35px', border: '1px solid #141416' }}>
        <button type="button" onClick={() => { setActiveTab('personal'); setResult(null); }} style={{ flex: 1, padding: '14px', fontSize: '14px', background: activeTab === 'personal' ? '#141418' : 'transparent', color: activeTab === 'personal' ? '#fff' : '#444', border: activeTab === 'personal' ? '1px solid #222' : 'none', borderRadius: '10px', cursor: 'pointer' }}>
          ✨ Personal Genesis Map
        </button>
        <button type="button" onClick={() => { setActiveTab('business'); setResult(null); }} style={{ flex: 1, padding: '14px', fontSize: '14px', background: activeTab === 'business' ? '#141418' : 'transparent', color: activeTab === 'business' ? '#fff' : '#444', border: activeTab === 'business' ? '1px solid #222' : 'none', borderRadius: '10px', cursor: 'pointer' }}>
          🏛️ Corporate Egregore Conduit
        </button>
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {activeTab === 'personal' && (
          <div style={{ background: '#050506', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '18px', color: '#fff' }}>Identity Coordinates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Full Birth Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name for tracking" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Polarity Arc</label>
                  <select value={sex} onChange={(e) => setSex(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    <option value="Male">Solar (Male)</option>
                    <option value="Female">Lunar (Female)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Incarnation Timeline</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '12px' }}>
                  <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>Day {d}</option>)}
                  </select>
                  <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    {Array.from({ length: 100 }, (_, i) => 2026 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
                  </select>
                  <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Geographic Coordinate Station</label>
                <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, Country" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div style={{ background: '#050506', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '18px', color: '#fff' }}>Corporate Mapping Coordinates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Registered Venture Title</label>
                <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} placeholder="Enter business title" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Incorporation Launch Window</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '12px' }}>
                  <select value={incDay} onChange={(e) => setIncDay(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>Day {d}</option>)}
                  </select>
                  <select value={incMonth} onChange={(e) => setIncMonth(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select value={incYear} onChange={(e) => setIncYear(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }}>
                    {Array.from({ length: 50 }, (_, i) => 2026 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
                  </select>
                  <input type="time" value={registrationTime} onChange={(e) => setRegistrationTime(e.target.value)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Headquarters Node Station</label>
                <input type="text" value={headquartersLocation} onChange={(e) => setHeadquartersLocation(e.target.value)} placeholder="City, Country" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#09090a', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#050506', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase' }}>Temporal Matrix Target</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            {[
              { id: 'snapshot', name: '⚡ Core Instant Arc', sub: 'Single situational snapshot' },
              { id: 'weekly', name: '📅 1-Week Horizon', sub: '7-Day sequential forecast layout' },
              { id: 'monthly', name: '🌙 Monthly Cycle', sub: '4-Week cyclical tracker matrix' }
            ].map(t => (
              <div key={t.id} onClick={() => setTimeScope(t.id)} style={{ padding: '15px', borderRadius: '10px', background: timeScope === t.id ? '#0d0d10' : '#080809', border: timeScope === t.id ? '1px solid #fff' : '1px solid #161618', cursor: 'pointer' }}>
                <div style={{ fontWeight: '500', fontSize: '14px', color: timeScope === t.id ? '#fff' : '#666' }}>{t.name}</div>
                <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#050506', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase' }}>Intent Focus Vector</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
            {[
              { id: 'career', title: '💼 Capital, Venture & Career', desc: 'Strategic operations, wealth windows & milestones.' },
              { id: 'relationship', title: '❤️ Alliances & Synastry', desc: 'Relational equations and dynamic agreements.' },
              { id: 'spiritual', title: '👁️ Karmic & Spiritual Path', desc: 'Universal footprints and evolutionary parameters.' },
              { id: 'crisis', title: '🔥 Hazard & Breakthroughs', desc: 'Isolating systemic bottlenecks and structural breakthroughs.' }
            ].map((item) => (
              <div key={item.id} onClick={() => setFocusContext(item.id)} style={{ padding: '18px', borderRadius: '12px', background: focusContext === item.id ? '#0d0e12' : '#080809', border: focusContext === item.id ? '1px solid #fff' : '1px solid #161618', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: '500', fontSize: '14px', color: focusContext === item.id ? '#fff' : '#666' }}>{item.title}</span>
                <span style={{ fontSize: '11px', color: '#333', lineHeight: '1.4' }}>{item.desc}</span>
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>Focus Clarification Context</label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type specific
