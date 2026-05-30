'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [system, setSystem] = useState('tarot');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return alert('Please enter your question!');
    
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, system }),
      });

      if (!res.ok) throw new Error(`Server returned error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Failed to connect to the Oracle engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', color: '#fff', background: '#000', borderRadius: '12px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Oracle & Calendar Master Planner</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Ask the Oracle:</label>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Choose Divination Matrix:</label>
          <select 
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
          >
            <option value="tarot">Tarot Spread (3 Cards)</option>
            <option value="iching">I Ching (6-Line Hexagram)</option>
            <option value="runes">Runes Norns Timeline</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Consulting the Cosmic Grid...' : 'Cast Reading'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', background: '#111', color: '#fff', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginTop: '0' }}>Oracle Response Matrix</h2>
          
          {/* TAROT DISPLAY MATRIX */}
          {system === 'tarot' && result.cards && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {result.cards.map((card: any, idx: number) => (
                <div key={idx} style={{ padding: '12px', borderLeft: '4px solid #0070f3', background: '#1c1c1c', borderRadius: '0 4px 4px 0' }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{card.name} <span style={{ fontSize: '14px', color: '#aaa' }}>({card.orientation})</span></h3>
                  <p style={{ margin: '0', color: '#ccc' }}>{card.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* I-CHING DISPLAY MATRIX */}
          {system === 'iching' && (
            <div style={{ marginTop: '15px' }}>
              <h3>{result.hexagram}</h3>
              <p style={{ fontFamily: 'monospace', color: '#0070f3', background: '#1c1c1c', padding: '6px', borderRadius: '4px' }}>Pattern Code: {result.binary}</p>
              <p style={{ fontStyle: 'italic', marginTop: '10px', color: '#ccc' }}>Advisory: {result.advisory}</p>
            </div>
          )}

          {/* RUNES DISPLAY MATRIX */}
          {system === 'runes' && result.norns && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {['urd', 'verdandi', 'skuld'].map((timeNode) => {
                const node = result.norns[timeNode];
                return (
                  <div key={timeNode} style={{ padding: '12px', borderLeft: '4px solid #00ff7f', background: '#1c1c1c', borderRadius: '0 4px 4px 0' }}>
                    <h3 style={{ margin: '0 0 5px 0' }}>{node.name}</h3>
                    <p style={{ margin: '0', color: '#ccc' }}>Interpretation: {node.interpretation}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
