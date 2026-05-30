'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');
  const [focusContext, setFocusContext] = useState('career');

  // Interactive Personal States
  const [name, setName] = useState('');
  const [birthDay, setBirthDay] = useState('1');
  const [birthMonth, setBirthMonth] = useState('1');
  const [birthYear, setBirthYear] = useState('1980');
  const [birthTime, setBirthTime] = useState('12:00');
  const [birthPlace, setBirthPlace] = useState('');
  const [sex, setSex] = useState('Male');

  // Interactive Business States
  const [entityName, setEntityName] = useState('');
  const [incDay, setIncDay] = useState('1');
  const [incMonth, setIncMonth] = useState('1');
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
    <main style={{ maxWidth: '950px', margin: '40px auto', padding: '35px', fontFamily: '"Playfair Display", "Segoe UI", serif', color: '#f5f5f7', background: '#030303', borderRadius: '24px', border: '1px solid #111', boxShadow: '0 30px 70px rgba(0,0,0,0.9)' }}>
      
      {/* MINIMALIST HERO */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '1px', margin: '0 0 10px 0', background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Master Oracle Planner</h1>
        <p style={{ color: '#555', margin: '0', fontSize: '14px', fontFamily: 'sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>Deterministic Metaphysical Synthesis Engine</p>
      </header>

      {/* SEGMENTED TAB SELECTOR */}
      <div style={{ display: 'flex', gap: '8px', background: '#0b0b0c', padding: '6px', borderRadius: '12px', marginBottom: '35px', border: '1px solid #161618' }}>
        <button type="button" onClick={() => { setActiveTab('personal'); setResult(null); }} style={{ flex: 1, padding: '14px', fontFamily: 'sans-serif', fontSize: '14px', background: activeTab === 'personal' ? '#16161a' : 'transparent', color: activeTab === 'personal' ? '#fff' : '#555', border: activeTab === 'personal' ? '1px solid #222' : 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s' }}>
          ✨ Personal Genesis
        </button>
        <button type="button" onClick={() => { setActiveTab('business'); setResult(null); }} style={{ flex: 1, padding: '14px', fontFamily: 'sans-serif', fontSize: '14px', background: activeTab === 'business' ? '#16161a' : 'transparent', color: activeTab === 'business' ? '#fff' : '#555', border: activeTab === 'business' ? '1px solid #222' : 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s' }}>
          🏛️ Corporate Egregore
        </button>
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* ISOLATED COMPONENT FOR PERSONAL DYNAMICS */}
        {activeTab === 'personal' && (
          <div style={{ background: '#070708', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '20px', fontWeight: '400', color: '#fff', letterSpacing: '0.5px' }}>Identity Coordinates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Full Birth Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name for Gematria tracking" required style={{ width: '100%', padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Polarity Principle</label>
                  <select value={sex} onChange={(e) => setSex(e.target.value)} style={{ width: '100%', padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }}>
                    <option value="Male">Solar (Male)</option>
                    <option value="Female">Lunar (Female)</option>
                  </select>
                </div>
              </div>

              {/* INTUITIVE SCROLLABLE CALENDAR MATRICES */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Date of Incarnation</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '12px' }}>
                  <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff' }}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>Day {d}</option>)}
                  </select>
                  <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff' }}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff' }}>
                    {Array.from({ length: 100 }, (_, i) => 2026 - i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Geographic Birth Station</label>
                <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, Country (e.g. Vilnius, Lithuania)" required style={{ width: '100%', padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        {/* ISOLATED COMPONENT FOR CORPORATE DYNAMICS */}
        {activeTab === 'business' && (
          <div style={{ background: '#070708', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '20px', fontWeight: '400', color: '#fff', letterSpacing: '0.5px' }}>Corporate Coordinate Mapping</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Registered Venture Title</label>
                <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} placeholder="Enter business name for entity numerology" required style={{ width: '100%', padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Incorporation Genesis Date</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '12px' }}>
                  <select value={incDay} onChange={(e) => setIncDay(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff' }}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>Day {d}</option>)}
                  </select>
                  <select value={incMonth} onChange={(e) => setIncMonth(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff' }}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select value={incYear} onChange={(e) => setIncYear(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff' }}>
                    {Array.from({ length: 50 }, (_, i) => 2026 - i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <input type="time" value={registrationTime} onChange={(e) => setRegistrationTime(e.target.value)} style={{ padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Headquarters Node Location</label>
                <input type="text" value={headquartersLocation} onChange={(e) => setHeadquartersLocation(e.target.value)} placeholder="City, Country" required style={{ width: '100%', padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE FOCUS CONTEXT CONFIGURATION */}
        <div style={{ background: '#070708', padding: '30px', borderRadius: '16px', border: '1px solid #121214' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#888', fontWeight: '400', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Intent Focus Vector</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
            {[
              { id: 'career', title: '💼 Capital, Venture & Career', text: 'Strategic business vectors, wealth cycles, and structural milestones.' },
              { id: 'relationship', title: '❤️ Alliances & Synastry', desc: 'Relational equations, core chemistry, and dynamic human agreements.' },
              { id: 'spiritual', title: '👁️ Karmic & Spiritual Path', desc: 'Esoteric evolution parameters and tracking universal destiny maps.' },
              { id: 'crisis', title: '🔥 Hazard Mitigation & Breakthroughs', desc: 'Identifying complex strategic blocks, micro-bottlenecks, and systemic releases.' }
            ].map((item) => (
              <div key={item.id} onClick={() => setFocusContext(item.id)} style={{ padding: '20px', borderRadius: '12px', background: focusContext === item.id ? '#0d0e12' : '#09090a', border: focusContext === item.id ? '1px solid #fff' : '1px solid #161618', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontWeight: '500', fontSize: '15px', color: focusContext === item.id ? '#fff' : '#888', fontFamily: 'sans-serif' }}>{item.title}</span>
                <span style={{ fontSize: '12px', color: '#444', fontFamily: 'sans-serif', lineHeight: '1.4' }}>{item.desc || item.text}</span>
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Explicit Intention / Live Context</label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Detail your exact venture, question, or scenario context..." style={{ width: '100%', padding: '14px', fontFamily: 'sans-serif', borderRadius: '8px', border: '1px solid #1c1c1f', backgroundColor: '#0c0c0d', color: '#fff', outline: 'none' }} />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '18px', background: '#fff', color: '#000', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', fontFamily: 'sans-serif', letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s' }}>
          {loading ? 'Sifting Patterns Across Multidimensional Vectors...' : 'Compute Universal Reading'}
        </button>
      </form>

      {/* COMPREHENSIVE INTELLIGENT READOUT COMPONENT */}
      {result && result.matrix && (
        <div style={{ marginTop: '50px', padding: '35px', background: '#060607', borderRadius: '20px', border: '1px solid #161618' }}>
          <div style={{ borderBottom: '
