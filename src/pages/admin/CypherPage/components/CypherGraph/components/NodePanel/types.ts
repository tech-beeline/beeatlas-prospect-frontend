import type { GraphNode } from '../../types';

export interface INodePanel {
    node: GraphNode | null;
    onClose: () => void;
    width: number;
}
