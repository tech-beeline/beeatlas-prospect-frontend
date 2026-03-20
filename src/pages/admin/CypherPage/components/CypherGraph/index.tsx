import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { useThemeStore } from 'features/theme';

import { NodePanel } from './components';
import {
    GRAPH_CANVAS_BACKGROUND,
    GRAPH_LINK_COLOR_RESOLVED,
    GRAPH_MIN_WIDTH,
    GRAPH_NODE_DEGREE_SIZE_CAP,
    LINK_DISTANCE,
    LINK_STRENGTH,
    PANEL_DEFAULT_WIDTH,
    PANEL_MAX_WIDTH,
    PANEL_MIN_WIDTH,
    PANEL_RESIZE_HANDLE_WIDTH,
    ZOOM_DURATION,
} from './const';
import { GraphData, GraphLink, GraphNode, ICypherGraph } from './types';
import * as S from './units';
import { extractGraphData } from './utils';

export const CypherGraph: FC<ICypherGraph> = ({ data }) => {
    const graphData: GraphData = useMemo(() => extractGraphData(data), [data]);

    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [panelWidth, setPanelWidth] = useState(PANEL_DEFAULT_WIDTH);
    const [graphSize, setGraphSize] = useState({ width: 800, height: 500 });

    const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink>>(null!);
    const graphContainerRef = useRef<HTMLDivElement>(null);
    const graphRowRef = useRef<HTMLDivElement>(null);

    const themeIsDark = useThemeStore((i) => i.themeIsDark);
    useEffect(() => {
        const el = graphContainerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setGraphSize({ width: Math.max(1, width), height: Math.max(1, height) });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!graphData.nodes.length || !graphRef.current) return;
        const g = graphRef.current as ForceGraphMethods<GraphNode, GraphLink>;
        const linkForce = g.d3Force?.('link');
        if (linkForce?.distance) linkForce.distance(LINK_DISTANCE);
        if (linkForce?.strength) linkForce.strength(LINK_STRENGTH);
        g.d3ReheatSimulation?.();
    }, [graphData]);

    useEffect(() => {
        if (!graphData.nodes.length) return;
        const row = graphRowRef.current;
        if (!row) return;
        const maxW = Math.min(
            PANEL_MAX_WIDTH,
            row.clientWidth - GRAPH_MIN_WIDTH - PANEL_RESIZE_HANDLE_WIDTH,
        );
        if (maxW < PANEL_MIN_WIDTH) return;
        setPanelWidth((w) => Math.min(maxW, Math.max(PANEL_MIN_WIDTH, w)));
    }, [graphData.nodes.length, graphSize.width]);

    const onPanelResizePointerDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = panelWidth;
        const rowEl = graphRowRef.current;
        if (!rowEl) return;

        const onMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientX - startX;
            const rowW = rowEl.clientWidth;
            const maxPanel = Math.min(
                PANEL_MAX_WIDTH,
                rowW - GRAPH_MIN_WIDTH - PANEL_RESIZE_HANDLE_WIDTH,
            );
            const next = Math.min(maxPanel, Math.max(PANEL_MIN_WIDTH, startWidth - delta));
            setPanelWidth(next);
        };

        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            document.body.style.removeProperty('cursor');
            document.body.style.removeProperty('user-select');
        };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    return (
        <S.GraphLayout>
            <S.GraphRow ref={graphRowRef}>
                {graphData.nodes.length > 0 && (
                    <>
                        <S.GraphLeftColumn>
                            <S.Legend>
                                {[
                                    ...new Map(
                                        graphData.nodes
                                            .filter((n) => n.label)
                                            .map((n) => [n.label, n.color]),
                                    ),
                                ].map(([label, color]) => (
                                    <S.LegendItem
                                        key={label}
                                        style={{ '--legend-color': color } as React.CSSProperties}
                                    >
                                        {label}
                                    </S.LegendItem>
                                ))}
                            </S.Legend>
                            <S.CanvasArea ref={graphContainerRef}>
                                <ForceGraph2D<GraphNode, GraphLink>
                                    ref={graphRef}
                                    graphData={graphData}
                                    nodeLabel={(n) => n.name ?? n.id}
                                    linkLabel={(l) => l.label ?? ''}
                                    linkColor={() =>
                                        GRAPH_LINK_COLOR_RESOLVED[themeIsDark ? 'dark' : 'light']
                                    }
                                    linkWidth={1.2}
                                    nodeColor={(n) => n.color!}
                                    nodeVal={(n) => {
                                        const nodeId = n.id;
                                        const degree = graphData.links.filter(
                                            (l) =>
                                                (typeof l.source === 'object'
                                                    ? l.source.id
                                                    : l.source) === nodeId ||
                                                (typeof l.target === 'object'
                                                    ? l.target.id
                                                    : l.target) === nodeId,
                                        ).length;
                                        const d = Math.min(
                                            Math.max(degree, 0),
                                            GRAPH_NODE_DEGREE_SIZE_CAP,
                                        );
                                        return (40 + d ** 2) / 150;
                                    }}
                                    nodeRelSize={10}
                                    onNodeClick={(n) =>
                                        setSelectedNode((prev) => (prev?.id === n.id ? null : n))
                                    }
                                    onBackgroundClick={() => setSelectedNode(null)}
                                    onEngineStop={() =>
                                        graphRef.current?.zoomToFit(ZOOM_DURATION, 50)
                                    }
                                    backgroundColor={GRAPH_CANVAS_BACKGROUND}
                                    width={graphSize.width}
                                    height={graphSize.height}
                                />
                            </S.CanvasArea>
                        </S.GraphLeftColumn>

                        <S.PaneResizeHandle
                            type="button"
                            onPointerDown={onPanelResizePointerDown}
                        />
                        <NodePanel
                            width={panelWidth}
                            node={selectedNode}
                            onClose={() => setSelectedNode(null)}
                        />
                    </>
                )}
            </S.GraphRow>
        </S.GraphLayout>
    );
};
