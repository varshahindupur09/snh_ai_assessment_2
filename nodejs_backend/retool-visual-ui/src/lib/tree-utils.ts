import { TreeNode } from './api';
import { Node, Edge } from 'react-flow-renderer';

let yOffset = 0;

export function treeToFlow(tree: TreeNode[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  function traverse(node: TreeNode, depth = 0, parentId?: string) {
    const id = node.id.toString();
    
    // Positioning: horizontal spacing by depth, vertical by yOffset
    nodes.push({
      id,
      data: { label: node.label },
      position: { x: depth * 200, y: yOffset },
    });

    yOffset += 100;

    if (parentId) {
      edges.push({
        id: `e${parentId}-${id}`,
        source: parentId,
        target: id,
      });
    }

    node.children?.forEach((child) => traverse(child, depth + 1, id));
  }

  yOffset = 0;
  tree.forEach((rootNode) => traverse(rootNode));

  return { nodes, edges };
}
