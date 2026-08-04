import type { C4Node } from './graph';

export interface ClusterMeta {
    id: string;
    members: C4Node[];
    memberType: string;
    edgeLabel: string;
}

export interface ClusterMemberOffset {
    dx: number;
    dy: number;
}

export type ClusterOffsets = Record<string, ClusterMemberOffset>;
