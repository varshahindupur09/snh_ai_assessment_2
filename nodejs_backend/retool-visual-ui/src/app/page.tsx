'use client'

import TreeViewer from '../components/TreeViewer';
import AddNodeForm from '@/components/AddNodeForm';
import { useState } from 'react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNodeAdded = () => {
    setRefreshKey(prev => prev + 1); // force re-render of TreeViewer
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Visual Tree Builder</h1>
      <AddNodeForm onNodeAdded={handleNodeAdded} />
      <TreeViewer key={refreshKey} />
    </main>
  );
}
