import { DiagramPalette } from '../../../../types';
import { ClusterMeta, LayoutNode } from '../../types';
import { EdgeLabel } from '../../types/geometry';
import { Point } from '../gridRouter';

interface SvgBaseArgs {
    parts: string[];
    panX: number;
    panY: number;
    palette: DiagramPalette;
}

interface SvgLayoutArgs extends SvgBaseArgs {
    layout: LayoutNode[];
}

interface SvgClusterArgs extends SvgLayoutArgs {
    clusters?: Record<string, ClusterMeta>;
}

interface SvgSelectableArgs extends SvgClusterArgs {
    selectedId: string | null;
}

export interface RenderNodesSvgArgs extends SvgSelectableArgs {
    tagCounts?: Record<string, number>;
}

export interface RenderEdgesSvgArgs extends SvgBaseArgs {
    edgePolylines: Point[][];
    edgeDotted?: boolean[];
}

export interface RenderEdgeLabelsSvgArgs extends SvgBaseArgs {
    edgeLabels: EdgeLabel[];
}

export interface RenderClustersSvgArgs extends SvgSelectableArgs {}

export interface RenderClusterMembersSvgArgs extends SvgClusterArgs {
    clusterMemberOffsets?: Record<string, { dx: number; dy: number }>;
}

type OffsetMap = Record<string, { dx: number; dy: number }>;

export interface BuildDiagramSvgStringArgs {
    width: number;
    height: number;
    panX: number;
    panY: number;
    layout: LayoutNode[];
    edgePolylines: Point[][];
    edgeDotted?: boolean[];
    edgeLabels: EdgeLabel[];
    selectedId: string | null;
    tagCounts?: Record<string, number>;
    palette?: DiagramPalette;
    clusters?: Record<string, ClusterMeta>;
    clusterMemberOffsets?: OffsetMap;
}
