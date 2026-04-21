import type { C4Node, GraphEdge } from './hooks/useC4';
import type { DiagramLayoutPersist } from './hooks/useDiagramLayout';
import type { GraphCanvasHandle } from './graphCanvas.types';

export type { C4Node, DiagramLayoutPersist, GraphCanvasHandle, GraphEdge };

export type GraphData = {
    nodes: C4Node[];
    edges: GraphEdge[];
};
