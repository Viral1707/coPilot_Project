import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    setError(null);
    setResult(null);
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
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Calculator</h1>
      <div>
        <input type="number" value={num1} onChange={e => setNum1(e.target.value)} placeholder="First number" />
        <select value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
        <input type="number" value={num2} onChange={e => setNum2(e.target.value)} placeholder="Second number" />
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {result !== null && <div>Result: {result}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default App;