export type DiagramLayoutPersist = {
    nodePositions: Record<string, { x: number; y: number }>;
    clusterMemberOffsets: Record<string, { dx: number; dy: number }>;
};

export function clusterMemberOffsetKey(clusterId: string, memberId: string): string {
    return `${clusterId}::${memberId}`;
}
