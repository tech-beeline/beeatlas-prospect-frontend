import { DiagramLayoutPersist } from '../../types';

import type { C4Node, GraphEdge } from './types/graph';

export type { ClusterMeta } from './types/cluster';
export type { ContainerTooltipState } from './types/common';
export type { EdgeGeometryResult, EdgeRouteMode } from './types/edges';
export type { EdgeLabel, EdgeLabelGeom, Point } from './types/geometry';
export type { C4Label, C4Node, GraphData, GraphEdge, GraphNode, NodeId } from './types/graph';
export type { GraphLink, LayoutBox, LayoutNode, SimNode } from './types/layout';
export type { GeometryCache, GraphCanvasRuntime, ProgressiveEdgeInputs } from './types/runtime';

export type EditHit =
    | { kind: 'member'; clusterId: string; member: C4Node; memberIdx: number }
    | { kind: 'node'; nodeId: string };

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
