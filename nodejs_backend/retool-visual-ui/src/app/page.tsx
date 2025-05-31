// src/app/page.tsx

'use client';

import TreeViewer from '../components/TreeViewer';
import AddNodeForm from '@/components/AddNodeForm';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [llmPrompt, setLlmPrompt] = useState('');
  const [llmResults, setLlmResults] = useState<any[]>([]);

  const handleNodeAdded = () => {
    setRefreshKey((prev) => prev + 1); // force TreeViewer refresh
  };

  const handleAskLLM = async () => {
  try {
    const response = await axios.post('http://localhost:3000/nlp/tree-query', {
      text: llmPrompt,
    });

    const data = response.data as any[]; // 👈 cast here to match expected type
    setLlmResults(data); // ✅ No more TS error

  } catch (err) {
    console.error('❌ LLM request failed:', err);
    setLlmResults([]);
   }
  };


  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Visual Tree Builder</h1>

      <div className="flex items-center gap-2">
        <input
          type="text"
          data-testid="prompt-input"
          className="border p-2 rounded w-full"
          placeholder="Ask something like 'Show me all animals under ...'"
          value={llmPrompt}
          onChange={(e) => setLlmPrompt(e.target.value)}
        />
        <button
          onClick={handleAskLLM}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ask LLM
        </button>
      </div>

      {llmResults.length > 0 && (
        <div className="border p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">LLM Answer:</h2>
          <ul className="list-disc pl-5">
            {llmResults.map((child, idx) => (
              <li key={idx}>{child.label}</li>
            ))}
          </ul>
        </div>
      )}

      <AddNodeForm onNodeAdded={handleNodeAdded} />
      <TreeViewer key={refreshKey} />
    </main>
  );
}

