import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { Simulation } from 'd3-force';
import { useThemeStore } from 'features/theme/store';

import { TooltipContainer } from 'components/interaction';

import { nodeDisplayName } from '../../utils';
import { getDiagramPalette } from '../../utils/theme';

import {
    CLUSTER_MEMBER_NAME_MAX_CHARS,
    HEAVY_MODE_MAX_TICKS,
    LOW_QUALITY_SPLINE_EDGE_THRESHOLD,
    NODE_NAME_MAX_CHARS,
    PROGRESSIVE_EDGE_BUDGET_MS,
    PROGRESSIVE_EDGE_CHUNK_SIZE,
    SPEED_OPT_MEDIUM_NODE_THRESHOLD,
    SPEED_OPT_STRONG_NODE_THRESHOLD,
} from './const';
import {
    type ContainerTooltipState,
    type ProgressiveEdgeInputs,
    useCanvasViewport,
    useGraphCanvasExports,
    useGraphCanvasSimulation,
    useResizeTick,
} from './hooks';
import { renderDiagram } from './render';
import {
    ClusterMeta,
    GraphCanvasHandle,
    GraphCanvasProps,
    GraphCanvasRuntime,
    LayoutNode,
} from './types';
import * as S from './units';
import {
    type GraphLink,
    type SimNode,
    clampMemberOffset,
    clusterMemberOffsetKey,
    collapseDenseSimilarNodes,
    computeFullExportData,
    computePanToCenterFocus,
    createForceSimulation,
    drawEdgeLabelPill,
    hashGraphKey,
    hitTestClusterMember,
    hitTestEditDrag,
    hitTestPinToggle,
    hitTestRectLast,
    isClusterNode,
    isNameTruncated,
    paintClusterInnerMiniCards,
    paintDiagramEdges,
    paintDiagramNodes,
    resolveEdgeLabelOverlaps,
    useGraphCanvasMouseHandlers,
    useProgressiveEdgeGeometry,
} from './utils';

export const GraphCanvas = forwardRef<GraphCanvasHandle, GraphCanvasProps>(function GraphCanvas(
    {
        nodes,
        edges,
        focusNodeId = null,
        selectedNodeId,
        tagCountByNodeId,
        pinnedNodeIds,
        onPinToggle,
        onNodeClick,
        interactionMode = 'view',
        initialLayout = null,
        onLayoutPersist,
        emptyHint,
        loading,
    },
    ref,
) {
    const themeIsDark = useThemeStore((state) => state.themeIsDark);
    const resolvedTheme = themeIsDark ? 'dark' : 'light';
    const palette = useMemo(() => getDiagramPalette(themeIsDark), [themeIsDark]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const layoutRef = useRef<LayoutNode[]>([]);
    const pinnedNodeIdsRef = useRef(pinnedNodeIds);
    pinnedNodeIdsRef.current = pinnedNodeIds;
    const onPinToggleRef = useRef(onPinToggle);
    onPinToggleRef.current = onPinToggle;
    const interactionModeRef = useRef(interactionMode);
    interactionModeRef.current = interactionMode;
    const initialLayoutRef = useRef(initialLayout);
    initialLayoutRef.current = initialLayout;
    const onLayoutPersistRef = useRef(onLayoutPersist);
    onLayoutPersistRef.current = onLayoutPersist;
    const clusterMemberOffsetsRef = useRef<Record<string, { dx: number; dy: number }>>({});
    const editDragRef = useRef<{
        type: 'node' | 'member';
        nodeId: string;
        clusterId?: string;
        memberId?: string;
        memberIdx?: number;
        startClientX: number;
        startClientY: number;
        lastClientX: number;
        lastClientY: number;
    } | null>(null);
    const suppressClickRef = useRef(false);
    const collapsedGraph = useMemo(
        () => collapseDenseSimilarNodes(nodes, edges, selectedNodeId, pinnedNodeIds),
        [nodes, edges, selectedNodeId, pinnedNodeIds],
    );
    const { nodes: visibleNodes, edges: visibleEdges, selectedVisibleId } = collapsedGraph;
    const clusterMetaRef = useRef<Map<string, ClusterMeta>>(new Map());
    clusterMetaRef.current = collapsedGraph.clusters;
    const edgesRef = useRef(visibleEdges);
    edgesRef.current = visibleEdges;
    const tagCountRef = useRef<ReadonlyMap<string, number>>(tagCountByNodeId ?? new Map());
    tagCountRef.current = tagCountByNodeId ?? new Map();
    const simNodesRef = useRef<SimNode[]>([]);
    const simulationRef = useRef<Simulation<SimNode, GraphLink> | null>(null);
    const prevGraphKeyRef = useRef<string | null>(null);
    const layoutVersionRef = useRef(0);
    const runtimeRef = useRef<GraphCanvasRuntime>({
        geometryCache: null,
        fastMode: false,
        heavyMode: false,
        deferredFullGeometryReady: false,
        progressiveTimer: null,
    });
    const progressiveEdgeInputsRef = useRef<ProgressiveEdgeInputs>({
        enabled: false,
        useStraightEdges: false,
        focusId: null,
        layoutBoxes: [],
        edgePairs: [],
    });
    const dragRef = useRef<{ dragging: boolean; lastX: number; lastY: number }>({
        dragging: false,
        lastX: 0,
        lastY: 0,
    });
    const selectedIdRef = useRef<string | null>(selectedVisibleId);
    selectedIdRef.current = selectedVisibleId;
    const focusIdRef = useRef<string | null>(focusNodeId ?? null);
    focusIdRef.current = focusNodeId ?? null;
    const drawRef = useRef<() => void>(() => undefined);
    const measureCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const { panRef, zoomRef, zoomIn, zoomOut, resetZoom } = useCanvasViewport({
        canvasRef,
        drawRef,
    });

    const [containerTooltip, setContainerTooltip] = useState<ContainerTooltipState>({
        open: false,
        x: 0,
        y: 0,
        text: '',
    });

    const canvasSizeRef = useRef<{
        width: number;
        height: number;
        left: number;
        top: number;
    } | null>(null);

    const graphKey = useMemo(
        () => hashGraphKey(visibleNodes, visibleEdges),
        [visibleNodes, visibleEdges],
    );

    const layoutPersistKey = useMemo(
        () => (initialLayout ? JSON.stringify(initialLayout) : ''),
        [initialLayout],
    );

    useEffect(() => {
        clusterMemberOffsetsRef.current = { ...(initialLayout?.clusterMemberOffsets ?? {}) };
    }, [graphKey, initialLayout]);

    const emitLayoutPersist = useCallback(() => {
        const cb = onLayoutPersistRef.current;
        if (!cb) return;
        const positions: Record<string, { x: number; y: number }> = {};
        for (const sn of simNodesRef.current) {
            positions[sn.id] = { x: sn.x ?? 0, y: sn.y ?? 0 };
        }
        cb({
            nodePositions: positions,
            clusterMemberOffsets: { ...clusterMemberOffsetsRef.current },
        });
    }, []);

    const resizeTick = useResizeTick(canvasRef);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvasSizeRef.current = {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            top: rect.top,
        };
    }, [resizeTick]);

    const simToLayout = useCallback((simNodes: SimNode[]): LayoutNode[] => {
        return simNodes.map((s) => ({
            node: s.node,
            x: s.x ?? 0,
            y: s.y ?? 0,
            width: s.width,
            height: s.height,
        }));
    }, []);

    const fitToScreen = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const layout = simToLayout(simNodesRef.current);
        if (layout.length === 0) return;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        layout.forEach((ln) => {
            minX = Math.min(minX, ln.x);
            minY = Math.min(minY, ln.y);
            maxX = Math.max(maxX, ln.x + ln.width);
            maxY = Math.max(maxY, ln.y + ln.height);
        });
        const worldW = Math.max(1, maxX - minX);
        const worldH = Math.max(1, maxY - minY);
        const rect = canvas.getBoundingClientRect();
        const fitScale = Math.min(
            1.4,
            Math.max(0.45, Math.min((rect.width * 0.9) / worldW, (rect.height * 0.9) / worldH)),
        );
        zoomRef.current = fitScale;
        const worldCx = (minX + maxX) / 2;
        const worldCy = (minY + maxY) / 2;
        panRef.current = {
            x: rect.width / 2 - worldCx * fitScale,
            y: rect.height / 2 - worldCy * fitScale,
        };
        drawRef.current();
    }, [simToLayout]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        renderDiagram({
            canvas,
            canvasSizeRef,
            palette,
            simToLayout,
            simNodes: simNodesRef.current,
            layoutRef,
            pan: panRef.current,
            zoom: zoomRef.current,
            selectedId: selectedIdRef.current,
            focusId: focusIdRef.current,
            visibleEdges,
            tagCountByNodeId: tagCountRef.current,
            clusterMetaById: clusterMetaRef.current,
            pinnedNodeIds: pinnedNodeIdsRef.current,
            clusterMemberOffsets: clusterMemberOffsetsRef.current,
            runtimeRef,
            layoutVersion: layoutVersionRef.current,
            measureCtxRef,
            lowQualitySplineEdgeThreshold: LOW_QUALITY_SPLINE_EDGE_THRESHOLD,
        });
    }, [palette, simToLayout, visibleEdges]);

    drawRef.current = draw;

    useEffect(() => {
        drawRef.current();
    }, [palette, pinnedNodeIds, interactionMode]);

    const graphCanvasExports = useGraphCanvasExports({
        simToLayout,
        simNodesRef,
        edgesRef,
        focusIdRef,
        selectedIdRef,
        tagCountRef,
        clusterMetaRef,
        clusterMemberOffsetsRef,
        palette,
        resolvedTheme,
        nodeDisplayName,
        computeFullExportData,
        paintDiagramNodes,
        paintDiagramEdges,
        drawEdgeLabelPill,
        paintClusterInnerMiniCards,
    });

    useImperativeHandle(
        ref,
        () => ({
            ...graphCanvasExports,
            zoomIn,
            zoomOut,
            resetZoom: () => {
                const canvas = canvasRef.current;
                if (canvas && focusIdRef.current) {
                    const layout = simToLayout(simNodesRef.current);
                    const p = computePanToCenterFocus(canvas, layout, focusIdRef.current, 1);
                    resetZoom({ pan: p });
                    return;
                }
                resetZoom();
            },
            fitToScreen,
        }),
        [fitToScreen, graphCanvasExports, resetZoom, simToLayout, zoomIn, zoomOut],
    );

    const progressiveEdgeGeometry = useProgressiveEdgeGeometry({
        inputsRef: progressiveEdgeInputsRef,
        chunkSize: PROGRESSIVE_EDGE_CHUNK_SIZE,
        frameDelayMs: 16,
        budgetMs: PROGRESSIVE_EDGE_BUDGET_MS,
        layoutVersionRef,
        runtimeRef,
        measureCtxRef,

        draw: () => drawRef.current(),
        resolveEdgeLabelOverlaps,
    });

    useGraphCanvasSimulation({
        canvasRef,
        graphKey,
        interactionMode,
        layoutPersistKey,
        resizeTick,
        visibleNodes,
        visibleEdges,
        selectedVisibleId,
        simToLayout,
        draw: () => drawRef.current(),
        panRef,
        zoomRef,
        prevGraphKeyRef,
        layoutVersionRef,
        runtimeRef,
        simNodesRef,
        simulationRef,
        initialLayoutRef,
        focusIdRef,
        progressiveEdgeGeometry,
        progressiveEdgeInputsRef,
        speedMediumThreshold: SPEED_OPT_MEDIUM_NODE_THRESHOLD,
        speedStrongThreshold: SPEED_OPT_STRONG_NODE_THRESHOLD,
        heavyModeMaxTicks: HEAVY_MODE_MAX_TICKS,
        createForceSimulation,
    });

    useEffect(() => {
        drawRef.current();
    }, [selectedVisibleId, focusNodeId, tagCountByNodeId, pinnedNodeIds]);

    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseHover,
        handleClick,
        handleMouseLeave,
    } = useGraphCanvasMouseHandlers({
        canvasRef,
        interactionModeRef,
        layoutRef,
        clusterMetaRef,
        clusterMemberOffsetsRef,
        panRef,
        zoomRef,
        pinnedNodeIdsRef,
        onPinToggleRef,
        onNodeClick,
        simNodesRef,
        layoutVersionRef,
        clearGeometryCache: () => {
            runtimeRef.current.geometryCache = null;
        },
        drawRef,
        dragRef,
        editDragRef,
        suppressClickRef,
        setContainerTooltip,
        nodeDisplayName,
        isClusterNode,
        hitTestRectLast,
        hitTestPinToggle,
        hitTestEditDrag,
        hitTestClusterMember,
        clampMemberOffset,
        clusterMemberOffsetKey,
        isNameTruncated,
        NODE_NAME_MAX_CHARS,
        CLUSTER_MEMBER_NAME_MAX_CHARS,
        emitLayoutPersist,
        onLayoutPersistRef,
    });

    return (
        <S.Root>
            {containerTooltip.open && (
                <>
                    <div
                        style={{
                            position: 'absolute',
                            left: containerTooltip.x,
                            top: containerTooltip.y,
                            width: 1,
                            height: 1,
                            pointerEvents: 'none',
                        }}
                        data-tooltip-id="graph-container-tooltip"
                    />
                    <TooltipContainer
                        noArrow
                        id="graph-container-tooltip"
                        isOpen
                        offset={8}
                        place="top"
                    >
                        {containerTooltip.text}
                    </TooltipContainer>
                </>
            )}
            <S.Canvas
                ref={canvasRef}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseOver={handleMouseHover}
                onMouseEnter={handleMouseHover}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            />
            {visibleNodes.length === 0 && (
                <S.EmptyState>
                    {loading ? (
                        <div>&gt; загрузка диаграммы…</div>
                    ) : (
                        <>
                            <div>&gt; нет узлов на диаграмме</div>
                            {emptyHint ? (
                                <S.EmptyHint>{emptyHint}</S.EmptyHint>
                            ) : (
                                <div>
                                    &gt; нет связей у выбранной системы или слишком узкий фильтр
                                </div>
                            )}
                        </>
                    )}
                </S.EmptyState>
            )}
        </S.Root>
    );
});

GraphCanvas.displayName = 'GraphCanvas';
