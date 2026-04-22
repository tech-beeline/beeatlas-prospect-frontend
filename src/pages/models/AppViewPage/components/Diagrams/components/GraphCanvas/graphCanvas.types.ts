import { C4Node, GraphEdge } from './hooks/useC4';
import { DiagramLayoutPersist } from './hooks/useDiagramLayout';

export interface GraphCanvasProps {
    nodes: C4Node[];
    edges: GraphEdge[];
    focusNodeId?: string | null;
    selectedNodeId: string | null;
    tagCountByNodeId?: ReadonlyMap<string, number>;
    pinnedNodeIds?: ReadonlySet<string>;
    onPinToggle?: (node: C4Node, pinned: boolean) => void;
    onNodeClick: (node: C4Node) => void;
    interactionMode?: 'view' | 'edit';
    initialLayout?: DiagramLayoutPersist | null;
    onLayoutPersist?: (layout: DiagramLayoutPersist) => void;
    emptyHint?: string;
    loading?: boolean;
}

export interface GraphCanvasHandle {
    exportPng: () => void;
    exportSvg: () => void;
    exportJson: () => void;
    exportPlantUml: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    fitToScreen: () => void;
}
