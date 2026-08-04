import { MutableRefObject, RefObject } from 'react';
import { Simulation } from 'd3';
import { Point } from 'diagram-js/lib/core/Canvas';

import { DiagramLayoutPersist, DiagramPalette } from '../../../types';
import { C4Node, ClusterMeta, EditHit, GraphCanvasRuntime, GraphEdge, LayoutNode } from '../types';
import { ClusterOffsets } from '../types/cluster';
import { ContainerTooltipState } from '../types/common';
import { EdgeLabel, EdgeLabelGeom } from '../types/geometry';
import { GeometryCache, ProgressiveEdgeInputs } from '../types/runtime';
import { GraphLink, SimNode } from '../utils/forceGraphLayout';

export type { GeometryCache } from '../types';
export type { ContainerTooltipState } from '../types/common';
export type { ProgressiveEdgeInputs } from '../types/runtime';

export interface ForceSimulationFactory {
    (nodes: C4Node[], edges: GraphEdge[], w: number, h: number, selectedId: string | null): {
        simulation: Simulation<SimNode, GraphLink>;
        simNodes: SimNode[];
    };
}

export interface LabelBoundsHint {
    x: number;
    y: number;
    text: string;
}

export interface UseGraphCanvasExportsArgs {
    simToLayout: (simNodes: SimNode[]) => LayoutNode[];

    simNodesRef: MutableRefObject<SimNode[]>;
    edgesRef: MutableRefObject<GraphEdge[]>;

    focusIdRef: MutableRefObject<string | null>;
    selectedIdRef: MutableRefObject<string | null>;

    tagCountRef: MutableRefObject<ReadonlyMap<string, number>>;
    clusterMetaRef: MutableRefObject<Map<string, ClusterMeta>>;

    clusterMemberOffsetsRef: MutableRefObject<ClusterOffsets>;

    palette: DiagramPalette;
    resolvedTheme: 'light' | 'dark';

    nodeDisplayName: (node: C4Node) => string;

    computeFullExportData: (
        layout: LayoutNode[],
        edges: GraphEdge[],
        focusId: string | null,
    ) => {
        bounds: { width: number; height: number; offsetX: number; offsetY: number };
        edgePolylines: Point[][];
        edgeDotted: boolean[];
        placedLabels: EdgeLabel[];
    } | null;

    paintDiagramNodes: (
        ctx: CanvasRenderingContext2D,
        layout: LayoutNode[],
        sel: string | null,
        tagCountByNodeId: ReadonlyMap<string, number>,
        clusterMetaById: ReadonlyMap<string, ClusterMeta>,
        palette: DiagramPalette,
        pinnedNodeIds?: ReadonlySet<string>,
    ) => void;

    paintDiagramEdges: (
        ctx: CanvasRenderingContext2D,
        edgePolylines: Point[][],
        options?: {
            hideHalo?: boolean;
            lowQuality?: boolean;
            edgeDotted?: boolean[];
            palette: DiagramPalette;
        },
    ) => void;

    drawEdgeLabelPill: (
        ctx: CanvasRenderingContext2D,
        g: EdgeLabel,
        palette: DiagramPalette,
    ) => void;

    paintClusterInnerMiniCards: (
        ctx: CanvasRenderingContext2D,
        layout: LayoutNode[],
        clusterMetaById: ReadonlyMap<string, ClusterMeta>,
        palette: DiagramPalette,
        memberOffsetsRecord?: Record<string, { dx: number; dy: number }> | null,
    ) => void;
}

export interface UseGraphCanvasSimulationParams {
    canvasRef: RefObject<HTMLCanvasElement>;

    graphKey: string;
    interactionMode: 'view' | 'edit';
    layoutPersistKey: string;
    resizeTick: number;

    visibleNodes: C4Node[];
    visibleEdges: GraphEdge[];
    selectedVisibleId: string | null;

    simToLayout: (simNodes: SimNode[]) => LayoutNode[];

    draw: () => void;

    panRef: MutableRefObject<Point>;
    zoomRef: MutableRefObject<number>;

    prevGraphKeyRef: MutableRefObject<string | null>;
    layoutVersionRef: MutableRefObject<number>;

    runtimeRef: MutableRefObject<GraphCanvasRuntime>;

    simNodesRef: MutableRefObject<SimNode[]>;
    simulationRef: MutableRefObject<Simulation<SimNode, GraphLink> | null>;

    initialLayoutRef: MutableRefObject<DiagramLayoutPersist | null>;
    focusIdRef: MutableRefObject<string | null>;

    progressiveEdgeGeometry: {
        start: () => void;
        stop: () => void;
    };

    progressiveEdgeInputsRef: MutableRefObject<ProgressiveEdgeInputs>;

    speedMediumThreshold: number;
    speedStrongThreshold: number;
    heavyModeMaxTicks: number;

    createForceSimulation: ForceSimulationFactory;
}

export interface UseCanvasViewportParams {
    canvasRef: RefObject<HTMLCanvasElement>;
    drawRef: MutableRefObject<() => void>;
    minZoom?: number;
    maxZoom?: number;
    step?: number;
}

export interface UseCanvasWheelParams {
    canvasRef: RefObject<HTMLCanvasElement>;
    panRef: MutableRefObject<{ x: number; y: number }>;
    zoomRef: MutableRefObject<number>;
    draw: () => void;
}

export interface UseGraphCanvasMouseHandlersParams {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;

    interactionModeRef: MutableRefObject<'view' | 'edit'>;
    layoutRef: MutableRefObject<LayoutNode[]>;
    clusterMetaRef: MutableRefObject<Map<string, ClusterMeta>>;
    clusterMemberOffsetsRef: MutableRefObject<Record<string, { dx: number; dy: number }>>;

    panRef: MutableRefObject<{ x: number; y: number }>;
    zoomRef: MutableRefObject<number>;

    pinnedNodeIdsRef: MutableRefObject<ReadonlySet<string> | undefined>;
    onPinToggleRef: MutableRefObject<((node: C4Node, pinned: boolean) => void) | undefined>;
    onNodeClick: (node: C4Node) => void;

    simNodesRef: MutableRefObject<
        Array<{
            id: string;
            x?: number | null;
            y?: number | null;
            fx?: number | null;
            fy?: number | null;
        }>
    >;
    layoutVersionRef: MutableRefObject<number>;
    clearGeometryCache: () => void;
    drawRef: MutableRefObject<() => void>;

    dragRef: MutableRefObject<{ dragging: boolean; lastX: number; lastY: number }>;
    editDragRef: MutableRefObject<{
        type: 'node' | 'member';
        nodeId: string;
        clusterId?: string;
        memberId?: string;
        memberIdx?: number;
        startClientX: number;
        startClientY: number;
        lastClientX: number;
        lastClientY: number;
    } | null>;
    suppressClickRef: MutableRefObject<boolean>;

    setContainerTooltip: React.Dispatch<React.SetStateAction<ContainerTooltipState>>;
    nodeDisplayName: (node: C4Node) => string;

    isClusterNode: (node: C4Node) => boolean;
    hitTestRectLast: (items: readonly LayoutNode[], x: number, y: number) => LayoutNode | null;
    hitTestPinToggle: (ln: LayoutNode, x: number, y: number) => boolean;
    hitTestEditDrag: (
        layout: LayoutNode[],
        clusterMetaById: ReadonlyMap<string, ClusterMeta>,
        x: number,
        y: number,
        memberOffsetsRecord: Record<string, { dx: number; dy: number }>,
    ) => EditHit | null;
    hitTestClusterMember: (
        ln: LayoutNode,
        clusterMeta: ClusterMeta,
        x: number,
        y: number,
        memberOffsetsRecord?: Record<string, { dx: number; dy: number }> | null,
    ) => C4Node | null;
    clampMemberOffset: (
        ln: LayoutNode,
        clusterMeta: ClusterMeta,
        memberIdx: number,
        dx: number,
        dy: number,
    ) => { dx: number; dy: number };
    clusterMemberOffsetKey: (clusterId: string, memberId: string) => string;

    isNameTruncated: (full: string, maxChars: number) => boolean;
    NODE_NAME_MAX_CHARS: number;
    CLUSTER_MEMBER_NAME_MAX_CHARS: number;

    emitLayoutPersist: () => void;
    onLayoutPersistRef: MutableRefObject<((layout: DiagramLayoutPersist) => void) | undefined>;
}

export interface UseGraphCanvasExportsParams {
    inputsRef: MutableRefObject<ProgressiveEdgeInputs>;
    chunkSize: number;
    frameDelayMs: number;
    budgetMs: number;

    layoutVersionRef: MutableRefObject<number>;
    runtimeRef: MutableRefObject<{
        geometryCache: GeometryCache | null;
        deferredFullGeometryReady: boolean;
        progressiveTimer: number | null;
    }>;
    measureCtxRef: MutableRefObject<CanvasRenderingContext2D | null>;

    draw: () => void;
    resolveEdgeLabelOverlaps: (
        ctx: CanvasRenderingContext2D,
        labels: EdgeLabelGeom[],
    ) => EdgeLabelGeom[];
}
