'use client'

import { useState } from 'react';
import { createNode } from '@/lib/api';

export interface AddNodeFormProps {
  onNodeAdded: () => void;
}

export default function AddNodeForm({ onNodeAdded }: AddNodeFormProps) {
  const [label, setLabel] = useState('');
  const [parentId, setParentId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label) return;

    try {
      setLoading(true);
      await createNode(label, parentId === '' ? undefined : Number(parentId));
      setLabel('');
      setParentId('');
      onNodeAdded();
    } catch (err) {
      console.error('Error creating node:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="border px-2 py-1 rounded w-full"
        required
      />
      <input
        type="number"
        placeholder="Parent ID (optional)"
        value={parentId}
        onChange={(e) => setParentId(e.target.value === '' ? '' : Number(e.target.value))}
        className="border px-2 py-1 rounded w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded px-4 py-1 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Node'}
      </button>
    </form>
  );
}
