'use client';
import { useState } from 'react';

export default function LLMQueryForm() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResults([]);

    try {
      const res = await fetch('http://localhost:3000/nlp/tree-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err: any) {
      setError(err.message || 'Request failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="e.g., Show me all animals under bear"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Query LLM
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {results.length > 0 && (
        <ul className="mt-6 space-y-2">
          {results.map((child: any) => (
            <li key={child.id} className="border p-2 rounded bg-gray-100">
              {child.label} (id: {child.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
