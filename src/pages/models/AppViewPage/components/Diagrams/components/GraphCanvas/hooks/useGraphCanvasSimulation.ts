import { useEffect } from 'react';

import type { GraphEdge } from '../types';
import type { LayoutBox } from '../utils/gridRouter';

import type { UseGraphCanvasSimulationParams } from './types';

export const useGraphCanvasSimulation = (params: UseGraphCanvasSimulationParams) => {
    const {
        canvasRef,
        graphKey,
        interactionMode,
        layoutPersistKey,
        resizeTick,
        visibleNodes,
        visibleEdges,
        selectedVisibleId,
        simToLayout,
        draw,
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
        speedMediumThreshold,
        speedStrongThreshold,
        heavyModeMaxTicks,
        createForceSimulation,
    } = params;

    useEffect(() => {
        progressiveEdgeGeometry.stop();
        simulationRef.current?.stop();
        simulationRef.current = null;
        simNodesRef.current = [];

        const graphChanged = prevGraphKeyRef.current !== graphKey;
        prevGraphKeyRef.current = graphKey;
        const preserveViewport = interactionMode === 'edit' && !graphChanged;
        if (!preserveViewport) {
            panRef.current = { x: 0, y: 0 };
            zoomRef.current = 1;
        }

        layoutVersionRef.current = 0;
        runtimeRef.current.geometryCache = null;
        runtimeRef.current.deferredFullGeometryReady = false;

        if (visibleNodes.length === 0) {
            draw();
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const w = Math.max(rect.width, 320);
        const h = Math.max(rect.height, 240);
        const nodeCount = visibleNodes.length;
        const speedOptMode =
            nodeCount < speedMediumThreshold
                ? 'best'
                : nodeCount <= speedStrongThreshold
                ? 'medium'
                : 'strong';

        runtimeRef.current.fastMode = speedOptMode === 'medium';
        runtimeRef.current.heavyMode = speedOptMode === 'strong';
        const useStraightEdges = speedOptMode !== 'best';

        const { simulation, simNodes } = createForceSimulation(
            visibleNodes,
            visibleEdges,
            w,
            h,
            selectedVisibleId,
        );
        simNodesRef.current = simNodes;
        simulationRef.current = simulation;

        const saved = initialLayoutRef.current?.nodePositions;
        if (saved) {
            for (const sn of simNodes) {
                const p = saved[sn.id];
                if (p) {
                    sn.x = p.x;
                    sn.y = p.y;
                    sn.fx = p.x;
                    sn.fy = p.y;
                }
            }
        }

        const onEnd = () => {
            draw();
        };

        const tick = () => {
            if (runtimeRef.current.heavyMode && simulation.alpha() < 0.055) {
                simulation.stop();
                onEnd();
                return;
            }
            layoutVersionRef.current += 1;
            runtimeRef.current.geometryCache = null;
            draw();
        };

        simulation.on('tick', tick);
        simulation.on('end', onEnd);
        simulation.alpha(1).restart();

        if (runtimeRef.current.heavyMode) {
            window.setTimeout(() => {
                if (simulationRef.current === simulation) {
                    simulation.stop();
                    onEnd();
                }
            }, heavyModeMaxTicks * 16);
        }

        if (runtimeRef.current.fastMode) {
            const layout = simToLayout(simNodesRef.current);
            const nodeMap = new Map(layout.map((ln) => [ln.node.id, ln]));
            const layoutBoxes: LayoutBox[] = layout.map((ln) => ({
                id: ln.node.id,
                x: ln.x,
                y: ln.y,
                width: ln.width,
                height: ln.height,
            }));
            const focusId = focusIdRef.current;
            const edgePairs = visibleEdges
                .map((edge) => {
                    const src = nodeMap.get(edge.source);
                    const tgt = nodeMap.get(edge.target);
                    if (!src || !tgt) return null;
                    return { edge, src, tgt };
                })
                .filter(
                    (
                        v,
                    ): v is {
                        edge: GraphEdge;
                        src: typeof layout[number];
                        tgt: typeof layout[number];
                    } => v !== null,
                );

            progressiveEdgeInputsRef.current = {
                enabled: true,
                useStraightEdges,
                focusId,
                layoutBoxes,
                edgePairs,
            };
            progressiveEdgeGeometry.start();
        } else {
            progressiveEdgeInputsRef.current = {
                enabled: false,
                useStraightEdges,
                focusId: focusIdRef.current,
                layoutBoxes: [],
                edgePairs: [],
            };
            runtimeRef.current.deferredFullGeometryReady = true;
        }

        return () => {
            progressiveEdgeGeometry.stop();
            simulation.stop();
        };
    }, [
        graphKey,
        interactionMode,
        layoutPersistKey,
        resizeTick,
        selectedVisibleId,
        visibleEdges,
        visibleNodes,
    ]);
};
