import type { MutableRefObject } from 'react';

import { DiagramPalette } from '../../types';

import { buildEdgeGeometry, buildEdgeGeometryStraight } from './geometry/edges';
import type { EdgeLabelGeom } from './types';
import type { ClusterMeta, GeometryCache, GraphCanvasRuntime, LayoutNode } from './types';
import type { GraphEdge } from './types';
import type { Point, SimNode } from './utils';
import {
    drawEdgeLabelPill,
    paintClusterInnerMiniCards,
    paintDiagramEdges,
    paintDiagramNodes,
    resolveEdgeLabelOverlaps,
} from './utils';

export function renderDiagram(args: {
    canvas: HTMLCanvasElement;
    canvasSizeRef: MutableRefObject<{
        width: number;
        height: number;
        left: number;
        top: number;
    } | null>;
    palette: DiagramPalette;
    simToLayout: (simNodes: SimNode[]) => LayoutNode[];
    simNodes: SimNode[];
    layoutRef: MutableRefObject<LayoutNode[]>;

    pan: { x: number; y: number };
    zoom: number;

    selectedId: string | null;
    focusId: string | null;

    visibleEdges: GraphEdge[];
    tagCountByNodeId: ReadonlyMap<string, number>;
    clusterMetaById: ReadonlyMap<string, ClusterMeta>;
    pinnedNodeIds?: ReadonlySet<string>;
    clusterMemberOffsets?: Record<string, { dx: number; dy: number }> | null;

    runtimeRef: MutableRefObject<GraphCanvasRuntime>;
    layoutVersion: number;
    measureCtxRef: MutableRefObject<CanvasRenderingContext2D | null>;

    lowQualitySplineEdgeThreshold: number;
}): void {
    const {
        canvas,
        canvasSizeRef,
        palette,
        simToLayout,
        simNodes,
        layoutRef,
        pan,
        zoom,
        selectedId,
        focusId,
        visibleEdges,
        tagCountByNodeId,
        clusterMetaById,
        pinnedNodeIds,
        clusterMemberOffsets,
        runtimeRef,
        layoutVersion,
        measureCtxRef,
        lowQualitySplineEdgeThreshold,
    } = args;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (!measureCtxRef.current) {
        measureCtxRef.current = document.createElement('canvas').getContext('2d');
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvasSizeRef.current ?? canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = palette.canvasBg;
    ctx.fillRect(0, 0, rect.width, rect.height);

    const layout = simToLayout(simNodes);
    layoutRef.current = layout;

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    let edgePolylines: Point[][];
    let edgeDotted: boolean[];
    let placedLabels: EdgeLabelGeom[];
    const cached = runtimeRef.current.geometryCache as GeometryCache | null;
    if (cached && cached.layoutVersion === layoutVersion && cached.focusId === focusId) {
        edgePolylines = cached.edgePolylines;
        edgeDotted = cached.edgeDotted;
        placedLabels = cached.placedLabels;
    } else {
        const useFastGeometry =
            runtimeRef.current.fastMode && !runtimeRef.current.deferredFullGeometryReady;
        const useStraightEdges = runtimeRef.current.heavyMode || runtimeRef.current.fastMode;

        const {
            edgePolylines: ep,
            edgeDotted: ed,
            labelCandidates,
        } = useFastGeometry
            ? { edgePolylines: [], edgeDotted: [], labelCandidates: [] as EdgeLabelGeom[] }
            : useStraightEdges
            ? buildEdgeGeometryStraight(layout, visibleEdges, focusId)
            : buildEdgeGeometry(layout, visibleEdges, focusId);

        const labelCtx = measureCtxRef.current;
        placedLabels =
            !useFastGeometry && !runtimeRef.current.heavyMode && labelCtx
                ? resolveEdgeLabelOverlaps(labelCtx, labelCandidates)
                : [];

        edgePolylines = ep;
        edgeDotted = ed;
        runtimeRef.current.geometryCache = {
            layoutVersion,
            focusId,
            edgePolylines,
            edgeDotted,
            placedLabels,
        };
    }

    paintDiagramNodes(
        ctx,
        layout,
        selectedId,
        tagCountByNodeId,
        clusterMetaById,
        palette,
        pinnedNodeIds,
    );

    paintDiagramEdges(ctx, edgePolylines, {
        hideHalo: runtimeRef.current.heavyMode,
        lowQuality:
            runtimeRef.current.heavyMode || edgePolylines.length >= lowQualitySplineEdgeThreshold,
        edgeDotted,
        palette,
    });

    if (!runtimeRef.current.heavyMode) {
        placedLabels.forEach((g) => drawEdgeLabelPill(ctx, g, palette));
    }

    paintClusterInnerMiniCards(ctx, layout, clusterMetaById, palette, clusterMemberOffsets);

    ctx.restore();
}
