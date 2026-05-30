'use client';

import { useState } from 'react';

export default function Home() {
  // Personal State Variables
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  // Business State Variables
  const [entityName, setEntityName] = useState('');
  const [incorporationDate, setIncorporationDate] = useState('');
  const [registrationTime, setRegistrationTime] = useState('');
  const [headquartersLocation, setHeadquartersLocation] = useState('');

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
          personal: { name, birthDate, birthTime, birthPlace },
          corporate: { entityName, incorporationDate, registrationTime, headquartersLocation }
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Computation error encountered on the universal network grid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '25px', fontFamily: 'sans-serif', color: '#fff', background: '#0a0a0a', borderRadius: '16px', border: '1px solid #222' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '5px', color: '#0070f3' }}>Master Oracle Planner</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '14px' }}>Multidimensional Sacred Geometry Calculation Node</p>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* PERSONAL METADATA BLOCK */}
        <div style={{ background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #1c1c1c' }}>
          <h3 style={{ marginTop: '0', color: '#0070f3', borderBottom: '1px solid #222', paddingBottom: '8px' }}>1. Personal Core Coordinates</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Full Birth Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Birth Date</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Birth Time</label>
              <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Birthplace City/Country</label>
              <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="London, UK" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
          </div>
        </div>

        {/* CORPORATE METADATA BLOCK */}
        <div style={{ background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #1c1c1c' }}>
          <h3 style={{ marginTop: '0', color: '#00ff7f', borderBottom: '1px solid #222', paddingBottom: '8px' }}>2. Business Entity Coordinates</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Legal Entity Name</label>
              <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} placeholder="Acme Corp LLC" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Incorporation Date</label>
              <input type="date" value={incorporationDate} onChange={(e) => setIncorporationDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Registration Time</label>
              <input type="time" value={registrationTime} onChange={(e) => setRegistrationTime(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Headquarters Location</label>
              <input type="text" value={headquartersLocation} onChange={(e) => setHeadquartersLocation(e.target.value)} placeholder="New York, USA" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '15px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.2s' }}>
          {loading ? 'Executing Harmonic Wave Convergences...' : 'Compute Unified Master Forecast'}
        </button>
      </form>

      {/* MATRIX RESULTS DISPLAY LAYER */}
      {result && result.matrix && (
        <div style={{ marginTop: '35px', padding: '25px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid #0070f3' }}>
          <h2 style={{ margin: '0 0 5px 0', color: '#0070f3' }}>Calculated Seven-Matrix Spectrum</h2>
          <p style={{ color: '#555', margin: '0 0 20px 0', fontSize: '12px', fontFamily: 'monospace' }}>Harmonic Vector Seed: {result.seedUsed}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ padding: '15px', background: '#111', borderRadius: '8px', borderLeft: '4px solid #0070f3' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#0070f3' }}>Western Astrology Longitudes</h4>
                {Object.entries(result.matrix.astrology.western).map(([p, val]: any) => <p key={p} style={{ margin: '4px 0', fontSize: '13px', color: '#ccc' }}>{val}</p>)}
              </div>
              <div style={{ padding: '15px', background: '#111', borderRadius: '8px', borderLeft: '4px solid #ff4500' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#ff4500' }}>Vedic Sidereal Alignment</h4>
                {Object.entries(result.matrix.astrology.vedic).map(([p, val]: any) => <p key={p} style={{ margin: '4px 0', fontSize: '13px', color: '#ccc' }}>{val}</p>)}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ padding: '15px', background: '#111', borderRadius: '8px', borderLeft: '4px solid #00ff7f' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#00ff7f' }}>Numerology & Kabbalah Root</h4>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}><b>Digital Root Number:</b> {result.matrix.numerology.digitalRoot}</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}><b>Gematria Tree Path:</b> {result.matrix.kabbalah.activePath}</p>
              </div>
              <div style={{ padding: '15px', background: '#111', borderRadius: '8px', borderLeft: '4px solid #bf55ec' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#bf55ec' }}>Sortilege Matrix Maps</h4>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#ccc' }}><b>Tarot Layout:</b> {result.matrix.sortilege.tarot}</p>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#ccc' }}><b>I Ching Hex:</b> {result.matrix.sortilege.iching}</p>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#ccc' }}><b>Rune Cast:</b> {result.matrix.sortilege.runes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
