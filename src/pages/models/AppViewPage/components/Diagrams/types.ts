import { C4Node, GraphData } from './components';

export type {
    ICypherDiagram,
    ICypherNode,
    ICypherRecordValue,
    ICypherRelationship,
} from 'api/graph/types';

export interface IDiagrams {
    cmdb: string | null;
}

export type GraphTag = 'Global' | 'Local' | 'All';
export type C4Label =
    | 'SoftwareSystem'
    | 'Container'
    | 'Component'
    | 'DeploymentNode'
    | 'Environment'
    | 'ContainerInstance'
    | 'InfrastructureNode';

export type PinnedEntry = { id: string; name: string; labels: string[]; originalName?: string };
export type DiagramSnapshot = {
    graph: GraphData;
    selectedNode: C4Node;
    diagramLayout?: DiagramLayoutPersist | null;
};

export const C4_COLORS: Record<string, string> = {
    SoftwareSystem: '#1A73E8',
    Container: '#00897B',
    Component: '#7B1FA2',
    DeploymentNode: '#E65100',
    Environment: '#455A64',
    ContainerInstance: '#00897B',
    InfrastructureNode: '#6D4C41',
};

export interface DiagramLayoutPersist {
    nodePositions: Record<string, { x: number; y: number }>;
    clusterMemberOffsets: Record<string, { dx: number; dy: number }>;
}

export interface DiagramPalette {
    canvasBg: string;
    edgeHalo: string;
    edgeStroke: string;
    cardFill: string;
    cardBorder: string;
    clusterOuterBorder: string;
    clusterInnerFill: string;
    clusterInnerBorder: string;
    clusterTitleMuted: string;
    tagStrip: string;
    textPrimary: string;
    textSecondary: string;
    edgeLabelBg: string;
    edgeLabelBorder: string;
    edgeLabelText: string;
    edgeLabelTextHalo: string;
    badgeFill: string;
    badgeStroke: string;
    badgeIcon: string;
    badgeText: string;
}
