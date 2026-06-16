import { useMemo } from 'react';

import type { ClusterMeta } from '../types';
import { buildPlantUmlComponentDiagram } from '../utils/exportPlantUml';
import { buildDiagramSvgString } from '../utils/svg/buildDiagramSvgString';

import { UseGraphCanvasExportsArgs } from './types';

export const useGraphCanvasExports = ({
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
}: UseGraphCanvasExportsArgs) =>
    useMemo(
        () => ({
            exportPng: () => {
                const layout = simToLayout(simNodesRef.current);
                const data = computeFullExportData(layout, edgesRef.current, focusIdRef.current);
                if (!data) return;
                const { bounds, edgePolylines, edgeDotted, placedLabels } = data;
                if (bounds.width <= 0 || bounds.height <= 0) return;

                const dpr = window.devicePixelRatio || 1;
                const off = document.createElement('canvas');
                off.width = Math.ceil(bounds.width * dpr);
                off.height = Math.ceil(bounds.height * dpr);
                const ctx = off.getContext('2d');
                if (!ctx) return;
                ctx.scale(dpr, dpr);
                ctx.fillStyle = palette.canvasBg;
                ctx.fillRect(0, 0, bounds.width, bounds.height);
                ctx.save();
                ctx.translate(bounds.offsetX, bounds.offsetY);

                paintDiagramNodes(
                    ctx,
                    layout,
                    selectedIdRef.current,
                    tagCountRef.current,
                    clusterMetaRef.current,
                    palette,
                    undefined,
                );
                paintDiagramEdges(ctx, edgePolylines, { edgeDotted, palette });
                placedLabels.forEach((g) => drawEdgeLabelPill(ctx, g, palette));
                paintClusterInnerMiniCards(
                    ctx,
                    layout,
                    clusterMetaRef.current,
                    palette,
                    clusterMemberOffsetsRef.current,
                );
                ctx.restore();

                const a = document.createElement('a');
                a.href = off.toDataURL('image/png');
                a.download = 'archmap-diagram.png';
                a.click();
            },
            exportSvg: () => {
                const layout = simToLayout(simNodesRef.current);
                const data = computeFullExportData(layout, edgesRef.current, focusIdRef.current);
                if (!data) return;
                const { bounds, edgePolylines, edgeDotted, placedLabels } = data;

                const tagCounts: Record<string, number> = {};
                tagCountRef.current.forEach((n, id) => {
                    if (n > 0) tagCounts[id] = n;
                });

                const clustersExport: Record<string, ClusterMeta> = {};
                clusterMetaRef.current.forEach((meta, id) => {
                    clustersExport[id] = meta;
                });

                const svg = buildDiagramSvgString({
                    width: bounds.width,
                    height: bounds.height,
                    panX: bounds.offsetX,
                    panY: bounds.offsetY,
                    layout,
                    edgePolylines: edgePolylines.map((p) => p.map((q) => ({ ...q }))),
                    edgeDotted,
                    edgeLabels: placedLabels,
                    selectedId: selectedIdRef.current,
                    tagCounts,
                    palette,
                    clusters: clustersExport,
                    clusterMemberOffsets: clusterMemberOffsetsRef.current,
                });
                const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'archmap-diagram.svg';
                a.click();
                URL.revokeObjectURL(url);
            },
            exportJson: () => {
                const layout = simToLayout(simNodesRef.current);
                const data = computeFullExportData(layout, edgesRef.current, focusIdRef.current);
                if (!data) return;
                const { bounds, edgePolylines, edgeDotted, placedLabels } = data;
                const tagCounts: Record<string, number> = {};
                tagCountRef.current.forEach((n, id) => {
                    if (n > 0) tagCounts[id] = n;
                });
                const payload = {
                    version: 1 as const,
                    exportedAt: new Date().toISOString(),
                    theme: resolvedTheme,
                    diagramBounds: bounds,
                    focusNodeId: focusIdRef.current,
                    selectedNodeId: selectedIdRef.current,
                    nodes: layout.map((ln) => ({
                        id: ln.node.id,
                        name: nodeDisplayName(ln.node),
                        labels: ln.node.labels,
                        technology: ln.node.technology,
                        description: ln.node.description,
                        properties: ln.node.properties,
                        x: ln.x,
                        y: ln.y,
                        width: ln.width,
                        height: ln.height,
                        tagCount: tagCounts[ln.node.id] ?? 0,
                    })),
                    edges: edgesRef.current.map((e) => ({ ...e })),
                    edgeRoutes: edgePolylines.map((pl, i) => ({
                        points: pl.map((p) => ({ x: p.x, y: p.y })),
                        dotted: edgeDotted[i] ?? false,
                    })),
                    edgeLabels: placedLabels.map((g) => ({
                        text: g.text,
                        x: g.x,
                        y: g.y,
                        align: g.align,
                    })),
                    savedLayout: {
                        nodePositions: Object.fromEntries(
                            simNodesRef.current.map((sn) => [
                                sn.id,
                                {
                                    x: sn.x ?? 0,
                                    y: sn.y ?? 0,
                                },
                            ]),
                        ),
                        clusterMemberOffsets: { ...clusterMemberOffsetsRef.current },
                    },
                };
                const blob = new Blob([JSON.stringify(payload, null, 2)], {
                    type: 'application/json;charset=utf-8',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'archmap-diagram.json';
                a.click();
                URL.revokeObjectURL(url);
            },
            exportPlantUml: () => {
                const layout = simToLayout(simNodesRef.current);
                const nodes = layout.map((ln) => ln.node);
                const edges = edgesRef.current;
                if (nodes.length === 0) return;
                const text = buildPlantUmlComponentDiagram(nodes, edges);
                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'archmap-diagram.puml';
                a.click();
                URL.revokeObjectURL(url);
            },
        }),
        [
            clusterMemberOffsetsRef,
            clusterMetaRef,
            computeFullExportData,
            drawEdgeLabelPill,
            edgesRef,
            focusIdRef,
            nodeDisplayName,
            paintClusterInnerMiniCards,
            paintDiagramEdges,
            paintDiagramNodes,
            palette,
            resolvedTheme,
            selectedIdRef,
            simNodesRef,
            simToLayout,
            tagCountRef,
        ],
    );
