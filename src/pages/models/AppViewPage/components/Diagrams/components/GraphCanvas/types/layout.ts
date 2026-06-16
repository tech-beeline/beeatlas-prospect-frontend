import type { C4Node } from './graph';

export interface LayoutNode {
    node: C4Node;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface LayoutBox {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface SimNode {
    id: string;
    x?: number | null;
    y?: number | null;
    fx?: number | null;
    fy?: number | null;
}

export interface GraphLink {
    source: string;
    target: string;
}
