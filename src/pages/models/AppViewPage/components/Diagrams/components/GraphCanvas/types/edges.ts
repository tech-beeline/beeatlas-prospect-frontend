import type { EdgeLabelGeom, Point } from './geometry';

export type EdgeRouteMode = 'astar' | 'straight';

export interface EdgeGeometryResult {
    edgePolylines: Point[][];
    /** true = пунктир (Child / Deploy) — индекс совпадает с edgePolylines */
    edgeDotted: boolean[];
    labelCandidates: EdgeLabelGeom[];
}
