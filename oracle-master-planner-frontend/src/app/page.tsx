'use client';

import { useState } from 'react';

export default function MasterOracleDashboard() {
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
    { value: '01', label: 'Jan' }, { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' }, { value: '04', label: 'Apr' },
    { value: '05', label: 'May' }, { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' }, { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' }, { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' }, { value: '12', label: 'Dec' }
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
      alert('Error connecting to engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', color: '#fff', background: '#000', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#0070f3' }}>Master Oracle Planner</h2>
      
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button type="button" onClick={() => setActiveTab('personal')} style={{ flex: 1, padding: '10px', background: activeTab === 'personal' ? '#222' : '#111', color: '#fff', border: '1px solid #333' }}>✨ Personal Genesis</button>
        <button type="button" onClick={() => setActiveTab('business')} style={{ flex: 1, padding: '10px', background: activeTab === 'business' ? '#222' : '#111', color: '#fff', border: '1px solid #333' }}>🏛️ Corporate Egregore</button>
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {activeTab === 'personal' ? (
          <div style={{ border: '1px solid #222', padding: '15px' }}>
            <label>Birth Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0 15px 0', background: '#111', color: '#fff' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '5px' }}>
              <select value={birthDay} onChange={e => setBirthDay(e.target.value)} style={{ padding: '8px' }}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>Day {d}</option>)}
              </select>
              <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)} style={{ padding: '8px' }}>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <select value={birthYear} onChange={e => setBirthYear(e.target.value)} style={{ padding: '8px' }}>
                {Array.from({ length: 100 }, (_, i) => 2026 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
              </select>
              <input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} style={{ padding: '8px' }} />
            </div>

            <label style={{ display: 'block', marginTop: '15px' }}>Birthplace Node:</label>
            <input type="text" value={birthPlace} onChange={e => setBirthPlace(e.target.value)} placeholder="City, Country" required style={{ width: '100%', padding: '8px', background: '#111', color: '#fff' }} />
          </div>
        ) : (
          <div style={{ border: '1px solid #222', padding: '15px' }}>
            <label>Venture Title:</label>
            <input type="text" value={entityName} onChange={e => setEntityName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0 15px 0', background: '#111', color: '#fff' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '5px' }}>
              <select value={incDay} onChange={e => setIncDay(e.target.value)} style={{ padding: '8px' }}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>Day {d}</option>)}
              </select>
              <select value={incMonth} onChange={e => setIncMonth(e.target.value)} style={{ padding: '8px' }}>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <select value={incYear} onChange={e => setIncYear(e.target.value)} style={{ padding: '8px' }}>
                {Array.from({ length: 50 }, (_, i) => 2026 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
              </select>
              <input type="time" value={registrationTime} onChange={e => setRegistrationTime(e.target.value)} style={{ padding: '8px' }} />
            </div>

            <label style={{ display: 'block', marginTop: '15px' }}>HQ Station:</label>
            <input type="text" value={headquartersLocation} onChange={e => setHeadquartersLocation(e.target.value)} required style={{ width: '100%', padding: '8px', background: '#111', color: '#fff' }} />
          </div>
        )}

        <div style={{ background: '#111', padding: '15px' }}>
          <h4>Temporal Forecast Scale</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[['snapshot', '⚡ Snapshot Arc'], ['weekly', '📅 1-Week Horizon'], ['monthly', '🌙 Monthly Cycle']].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setTimeScope(id)} style={{ flex: 1, padding: '10px', background: timeScope === id ? '#fff' : '#222', color: timeScope === id ? '#000' : '#fff', border: 'none', cursor: 'pointer' }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111', padding: '15px' }}>
          <h4>Intent Focus Vector</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            {[
              { id: 'career', name: '💼 Career/Venture' }, { id: 'relationship', name: '❤️ Alliances/Synastry' },
              { id: 'spiritual', name: '👁️ Spiritual Path' }, { id: 'crisis', name: '🔥 Hazard Mitigation' }
            ].map(f => (
              <button key={f.id} type="button" onClick={() => setFocusContext(f.id)} style={{ padding: '10px', background: focusContext === f.id ? '#fff' : '#222', color: focusContext === f.id ? '#000' : '#fff', border: 'none', cursor: 'pointer' }}>{f.name}</button>
            ))}
          </div>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Scenario parameters..." style={{ width: '100%', padding: '10px', background: '#000', color: '#fff', border: '1px solid #333' }} />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '15px', fontWeight: 'bold', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Processing Universal Calculations...' : 'Compute Universal Forecast'}
        </button>
      </form>

      {result && result.matrix && (
        <div style={{ marginTop: '30px', border: '1px solid #0070f3', padding: '20px' }}>
          <h3>Sacred Geometry Forecast Outputs</h3>
          
          {result.numerologyProfile && (
            <div style={{ padding: '15px', background: '#111', borderLeft: '4px solid #fff', marginBottom: '20px' }}>
              <h4>🧬 Alphanumeric Profile Exposition</h4>
              <p style={{ lineHeight: '1.6', color: '#ccc' }}>{result.numerologyProfile.cosmicMetaphor}</p>
            </div>
          )}

          {result.forecastTimeline && (
            <div style={{ marginBottom: '20px' }}>
              <h4>📅 Horizon Dynamic Timeline ({result.timeScopeSelected})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.forecastTimeline.map((item: any, idx: number) => (
                  <div key={idx} style={{ background: '#111', padding: '12px', border: '1px solid #222' }}>
                    <div style={{ fontWeight: 'bold', color: '#0070f3' }}>{item.period}</div>
                    <div style={{ fontSize: '13px', color: '#aaa', margin: '4px 0' }}><b>Astrology:</b> {item.transitSummary}</div>
                    <div style={{ fontSize: '13px', color: '#aaa', margin: '4px 0' }}><b>Draws:</b> {item.divinationDraw}</div>
                    <div style={{ fontSize: '13px', marginTop: '6px', fontStyle: 'italic' }}><b>Advisory:</b> {item.actionDirective}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '12px', borderTop: '1px solid #222', paddingTop: '15px' }}>
            <div>
              <h5>Western Ephemeris Coordinates</h5>
              {Object.entries(result.matrix.astrology.western).map(([p, v]: any) => <div key={p}>{p}: {v}</div>)}
            </div>
            <div>
              <h5>Vedic House Longitudes</h5>
              {Object.entries(result.matrix.astrology.vedic).map(([p, v]: any) => <div key={p}>{p}: {v}</div>)}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
