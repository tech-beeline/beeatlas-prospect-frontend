import { computeSingleEdgeGeometry } from '../geometry/edges';
import type { UseGraphCanvasExportsParams } from '../hooks/types';
import type { EdgeLabelGeom } from '../types';

import type { Point } from './gridRouter';

export const useProgressiveEdgeGeometry = (params: UseGraphCanvasExportsParams) => {
    const {
        inputsRef,
        chunkSize,
        frameDelayMs,
        budgetMs,
        layoutVersionRef,
        runtimeRef,
        measureCtxRef,
        draw,
        resolveEdgeLabelOverlaps,
    } = params;

    const stop = () => {
        if (runtimeRef.current.progressiveTimer !== null) {
            window.clearTimeout(runtimeRef.current.progressiveTimer);
            runtimeRef.current.progressiveTimer = null;
        }
    };

    const start = () => {
        stop();
        const inputs = inputsRef.current;
        if (!inputs.enabled) {
            runtimeRef.current.deferredFullGeometryReady = true;
            return stop;
        }
        const { focusId, layoutBoxes, edgePairs, useStraightEdges } = inputs;

        let cursor = 0;
        const progressivePolylines: Point[][] = [];
        const progressiveDotted: boolean[] = [];
        const labelCandidates: EdgeLabelGeom[] = [];

        runtimeRef.current.geometryCache = {
            layoutVersion: layoutVersionRef.current,
            focusId,
            edgePolylines: [],
            edgeDotted: [],
            placedLabels: [],
        };
        draw();

        const runChunk = () => {
            const t0 = performance.now();
            let processed = 0;
            while (
                cursor < edgePairs.length &&
                processed < chunkSize &&
                performance.now() - t0 < budgetMs
            ) {
                const { edge, src, tgt } = edgePairs[cursor]!;
                const { points, dotted, labelCandidate } = computeSingleEdgeGeometry({
                    edge,
                    src,
                    tgt,
                    layoutBoxes,
                    focusId,
                    mode: useStraightEdges ? 'straight' : 'astar',
                });
                progressivePolylines.push(points);
                progressiveDotted.push(dotted);
                if (labelCandidate) labelCandidates.push(labelCandidate);
                cursor += 1;
                processed += 1;
            }

            runtimeRef.current.geometryCache = {
                layoutVersion: layoutVersionRef.current,
                focusId,
                edgePolylines: [...progressivePolylines],
                edgeDotted: [...progressiveDotted],
                placedLabels: [],
            };
            draw();

            if (cursor < edgePairs.length) {
                runtimeRef.current.progressiveTimer = window.setTimeout(runChunk, frameDelayMs);
                return;
            }

            const labelCtx = measureCtxRef.current;
            const placedLabels = labelCtx
                ? resolveEdgeLabelOverlaps(labelCtx, labelCandidates)
                : [];
            runtimeRef.current.geometryCache = {
                layoutVersion: layoutVersionRef.current,
                focusId,
                edgePolylines: progressivePolylines,
                edgeDotted: progressiveDotted,
                placedLabels,
            };
            runtimeRef.current.deferredFullGeometryReady = true;
            runtimeRef.current.progressiveTimer = null;
            draw();
        };

        runtimeRef.current.progressiveTimer = window.setTimeout(runChunk, 0);
        return stop;
    };

    return { start, stop };
};
