'use client';

import { useState } from 'react';

export default function Home() {
  // Navigation & UI View Controls
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');
  const [focusContext, setFocusContext] = useState('career');

  // Input Data States
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [sex, setSex] = useState('unspecified');

  const [entityName, setEntityName] = useState('');
  const [incorporationDate, setIncorporationDate] = useState('');
  const [registrationTime, setRegistrationTime] = useState('');
  const [headquartersLocation, setHeadquartersLocation] = useState('');

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeTab,
          focusContext,
          query,
          personal: { name, birthDate, birthTime, birthPlace, sex },
          corporate: { entityName, incorporationDate, registrationTime, headquartersLocation }
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
    <main style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', fontFamily: '"Segoe UI", Roboto, sans-serif', color: '#fff', background: '#050505', borderRadius: '20px', border: '1px solid #151515', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
      
      {/* HEADER HERO */}
      <header style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.5px', margin: '0 0 8px 0', background: 'linear-gradient(90deg, #0070f3, #00ff7f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Master Oracle Planner</h1>
        <p style={{ color: '#666', margin: '0', fontSize: '15px' }}>Universal Divination Engine & Sacred Geometry Calculator</p>
      </header>

      {/* CORE CONFIGURATION MODE SELECTOR */}
      <div style={{ display: 'flex', gap: '10px', background: '#111', padding: '6px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #1c1c1c' }}>
        <button type="button" onClick={() => { setActiveTab('personal'); setResult(null); }} style={{ flex: 1, padding: '12px', background: activeTab === 'personal' ? '#1f1f1f' : 'transparent', color: activeTab === 'personal' ? '#0070f3' : '#888', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>
          ✨ Personal Life Path Matrix
        </button>
        <button type="button" onClick={() => { setActiveTab('business'); setResult(null); }} style={{ flex: 1, padding: '12px', background: activeTab === 'business' ? '#1f1f1f' : 'transparent', color: activeTab === 'business' ? '#00ff7f' : '#888', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>
          📈 Enterprise Destiny Coordinates
        </button>
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* TAB 1: PERSONAL COORDINATES FORM */}
        {activeTab === 'personal' && (
          <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '14px', border: '1px solid #1a1a1a' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#0070f3', display: 'flex', alignItems: 'center', gap: '8px' }}>Identity Genesis Calibration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Full Birth Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name for Gematria pathing" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Assigned Biological Sex</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }}>
                  <option value="unspecified">Select Sex Arcana...</option>
                  <option value="Male">Male Principle (Solar)</option>
                  <option value="Female">Female Principle (Lunar)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Birth Date</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Exact Time of Birth</label>
                <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Birthplace Coordinates (City, Country)</label>
                <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="e.g. Vilnius, Lithuania (For Astrological Ascendants)" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CORPORATE COORDINATES FORM */}
        {activeTab === 'business' && (
          <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '14px', border: '1px solid #1a1a1a' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00ff7f', display: 'flex', alignItems: 'center', gap: '8px' }}>Egregore & Corporate Genesis Calibration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Registered Entity Name</label>
                <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} placeholder="Legal registration name for Corporate Numerology" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Incorporation Date</label>
                <input type="date" value={incorporationDate} onChange={(e) => setIncorporationDate(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Moment of Registration / Launch Time</label>
                <input type="time" value={registrationTime} onChange={(e) => setRegistrationTime(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Corporate Headquarters (City, Country)</label>
                <input type="text" value={headquartersLocation} onChange={(e) => setHeadquartersLocation(e.target.value)} placeholder="e.g. New York, USA" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FOCUS VECTOR & DESTINY INTENT (TICS) */}
        <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '14px', border: '1px solid #1a1a1a' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#aaa' }}>Select Analytical Focus Vector</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { id: 'career', label: '💼 Career & Capital', desc: 'Strategic operations, wealth cycles & growth' },
              { id: 'relationship', label: '❤️ Love & Alliances', desc: 'Synastry links, chemistry, and relational harmony' },
              { id: 'spiritual', label: '👁️ Spiritual Path', desc: 'Esoteric path mapping & karmic alignment' },
              { id: 'crisis', label: '🔥 Crisis Vector', desc: 'Hazard mitigation, bottlenecks & breakthroughs' }
            ].map((node) => (
              <div key={node.id} onClick={() => setFocusContext(node.id)} style={{ padding: '14px', borderRadius: '10px', background: focusContext === node.id ? '#141923' : '#111', border: focusContext === node.id ? '2px solid #0070f3' : '2px solid #1a1a1a', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: '600', fontSize: '14px', color: focusContext === node.id ? '#0070f3' : '#fff' }}>{node.label}</span>
                <span style={{ fontSize: '11px', color: '#666', lineHeight: '1.3' }}>{node.desc}</span>
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>Explicit Focus Clarification / Concrete Question (Optional)</label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a specific problem or inquiry context here..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#141414', color: '#fff', outline: 'none' }} />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '16px', background: activeTab === 'personal' ? '#0070f3' : '#00ff7f', color: '#000', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', letterSpacing: '0.5px', transition: 'all 0.2s' }}>
          {loading ? 'Fusing Multidimensional Sacred Matrices...' : `Generate Custom ${activeTab === 'personal' ? 'Personal' : 'Enterprise'} Forecast`}
        </button>
      </form>

      {/* INTELLIGENT, ACCESSBLE RENDER COMPONENT */}
      {result && result.matrix && (
        <div style={{ marginTop: '40px', padding: '30px', background: '#09090b', borderRadius: '16px', border: '1px solid #222' }}>
          <div style={{ borderBottom: '1px solid #1f1f23', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: '0', fontSize: '24px', fontWeight: '700' }}>Oracle Interpretation Synthesis</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#555', fontFamily: 'monospace' }}>Calculated Matrix Seed Reference: {result.seedUsed}</p>
            </div>
            <span style={{ padding: '6px 14px', borderRadius: '20px', background: '#1c1c24', border: '1px solid #333', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#00ff7f', fontWeight: 'bold' }}>
              Focus: {focusContext}
            </span>
          </div>

          {/* ELEGANT INTELLECTUAL READOUT */}
          <div style={{ background: 'linear-gradient(135deg, #111 0%, #07070a 100%)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #0070f3', marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#0070f3', fontSize: '18px' }}>📜 The Core Archetypal Alignment</h3>
            <p style={{ margin: '0', fontSize: '15px', color: '#ddd', lineHeight: '1.6', fontStyle: 'italic' }}>
              "{result.interpretation.summary}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div style={{ padding: '20px', background: '#111', borderRadius: '10px', border: '1px solid #1a1a22' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#0070f3', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🌌 Astronomical Chart Longitudes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#555', display: 'block' }}>Tropical Western System</span>
                  {Object.entries(result.matrix.astrology.western).map(([p, val]: any) => <p key={p} style={{ margin: '2px 0', fontSize: '13px', color: '#ccc' }}>• {val}</p>)}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#555', display: 'block' }}>Sidereal Vedic System</span>
                  {Object.entries(result.matrix.astrology.vedic).map(([p, val]: any) => <p key={p} style={{ margin: '2px 0', fontSize: '13px', color: '#ccc' }}>• {val}</p>)}
                </div>
              </div>
            </div>

            <div style={{ padding: '20px', background: '#111', borderRadius: '10px', border: '1px solid #1a1a22' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#00ff7f', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🔑 Alphanumeric Geometries</h4>
              <p style={{ margin: '6px 0', fontSize: '14px', color: '#ccc' }}><b>Numerology Digital Root:</b> <span style={{ color: '#00ff7f' }}>{result.matrix.numerology.digitalRoot}</span></p>
              <p style={{ margin: '6px 0', fontSize: '14px', color: '#ccc' }}><b>Gematria Tree of Life Path:</b> <span style={{ color: '#00ff7f' }}>{result.matrix.kabbalah.activePath}</span></p>
              <div style={{ marginTop: '15px', background: '#161616', padding: '10px', borderRadius: '6px', fontSize: '12px', color: '#888', lineHeight: '1.4' }}>
                <b>Root Architecture Impact:</b> {result.interpretation.numerologyDetails}
              </div>
            </div>
          </div>

          {/* DYNAMIC SORTILEGE ANCHORS */}
          <div style={{ padding: '20px', background: '#111', borderRadius: '10px', border: '1px solid #1a1a22' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#bf55ec', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🃏 Synchronized Sortilege Vectors</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div style={{ background: '#161622', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#bf55ec', fontWeight: 'bold' }}>TAROT ARC</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#fff', fontWeight: '600' }}>{result.matrix.sortilege.tarot}</p>
              </div>
              <div style={{ background: '#161622', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#bf55ec', fontWeight: 'bold' }}>I CHING VECTOR</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#fff', fontWeight: '600' }}>{result.matrix.sortilege.iching}</p>
              </div>
              <div style={{ background: '#161622', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#bf55ec', fontWeight: 'bold' }}>RUNIC TIMELINE</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#fff', fontWeight: '600' }}>{result.matrix.sortilege.runes}</p>
              </div>
            </div>
            <div style={{ marginTop: '15px', padding: '12px', background: '#1a1423', borderRadius: '8px', fontSize: '13px', lineHeight: '1.5', color: '#dcbbf2' }}>
              <b>Temporal Action Advisory:</b> {result.interpretation.sortilegeDetails}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}
