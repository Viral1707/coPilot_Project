import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setError(null);
    setResult(null);
    if (num1 === '' || num2 === '') {
      setError('Please enter both numbers.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2), operation })
      });
      const data = await response.json();
      if (data.result !== undefined) {
        setResult(data.result);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to backend.');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setOperation('add');
    setResult(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 8, background: '#fff' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2' }}>Calculator</h1>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>First Number</label>
        <input type="number" value={num1} onChange={e => setNum1(e.target.value)} placeholder="Enter first number" style={{ width: '100%', padding: 8, marginBottom: 8 }} />
        <label style={{ display: 'block', marginBottom: 4 }}>Operation</label>
        <select value={operation} onChange={e => setOperation(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
        <label style={{ display: 'block', marginBottom: 4 }}>Second Number</label>
        <input type="number" value={num2} onChange={e => setNum2(e.target.value)} placeholder="Enter second number" style={{ width: '100%', padding: 8, marginBottom: 8 }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleCalculate} style={{ flex: 1, padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
        <button onClick={handleClear} style={{ flex: 1, padding: 10, background: '#eee', color: '#333', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      {result !== null && <div style={{ marginTop: 20, fontSize: 18, color: '#388e3c', textAlign: 'center' }}>Result: <strong>{result}</strong></div>}
      {error && <div style={{ marginTop: 20, color: '#d32f2f', textAlign: 'center' }}>{error}</div>}
    </div>
  );
}

export default App;