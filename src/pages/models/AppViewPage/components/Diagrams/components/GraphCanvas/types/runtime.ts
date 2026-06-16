import { EdgeLabelGeom, Point } from './geometry';
import { GraphEdge } from './graph';
import { LayoutBox, LayoutNode } from './layout';

export interface GraphCanvasRuntime {
    geometryCache: GeometryCache | null;
    fastMode: boolean;
    heavyMode: boolean;
    deferredFullGeometryReady: boolean;
    progressiveTimer: number | null;
}

export interface GeometryCache {
    layoutVersion: number;
    focusId: string | null;
    edgePolylines: Point[][];
    edgeDotted: boolean[];
    placedLabels: EdgeLabelGeom[];
}

export interface ProgressiveEdgeInputs {
    enabled: boolean;
    useStraightEdges: boolean;
    focusId: string | null;
    layoutBoxes: LayoutBox[];
    edgePairs: Array<{
        edge: GraphEdge;
        src: LayoutNode;
        tgt: LayoutNode;
    }>;
}
