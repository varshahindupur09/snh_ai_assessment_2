'use client'

import { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';

import { fetchTree } from '@/lib/api';
import { treeToFlow } from '@/lib/tree-utils';

interface Props {
  refreshKey?: number;
}

export default function TreeViewer({ refreshKey }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTree()
      .then((tree) => {
        const { nodes, edges } = treeToFlow(tree);
        setNodes(nodes);
        setEdges(edges);
      })
      .catch((err) => {
        console.error('Failed to fetch tree:', err);
      })
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) return <div className="text-sm text-muted-foreground">Loading tree...</div>;

  return (
    <div className="w-full h-[600px] border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
