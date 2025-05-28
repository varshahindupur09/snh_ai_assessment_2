import { API_BASE_URL } from './config';

export interface TreeNode {
  id: number;
  label: string;
  parentId?: number | null;
  children?: TreeNode[];
}

export async function fetchTree(): Promise<TreeNode[]> {
  const res = await fetch(`${API_BASE_URL}/api/tree`);
  if (!res.ok) throw new Error('Failed to fetch tree data');
  return res.json();
}

export async function createNode(label: string, parentId?: number) {
  const res = await fetch(`${API_BASE_URL}/api/tree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label, parentId }),
  });

  if (!res.ok) throw new Error('Failed to create node');
  return res.json();
}
