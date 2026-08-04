import { GRID_CELL } from './grid';

export const NODE_NAME_MAX_CHARS = 22;
export const CLUSTER_MEMBER_NAME_MAX_CHARS = 14;

export const PIN_TOGGLE_W = 30;
export const PIN_TOGGLE_H = 14;
export const PIN_TOGGLE_PAD_X = 8;
export const PIN_TOGGLE_PAD_BOTTOM = 6;

export const EDGE_HALO_WIDTH = 4;
export const EDGE_STROKE_WIDTH = 1.35;
export const EDGE_DOT_DASH: number[] = [2, 6];

function snapSizeToGrid(px: number): number {
    return Math.max(GRID_CELL, Math.round(px / GRID_CELL) * GRID_CELL);
}

export const NODE_W = snapSizeToGrid(200);
export const NODE_H = snapSizeToGrid(80);
export const CLUSTER_MIN_W = snapSizeToGrid(320);
export const CLUSTER_MIN_H = snapSizeToGrid(160);
