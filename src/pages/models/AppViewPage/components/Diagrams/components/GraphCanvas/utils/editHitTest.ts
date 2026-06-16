import type { ClusterMeta, EditHit, LayoutNode } from '../types';
import type { C4Node } from '../types';

import { isClusterNode } from './cluster';
import { hitTestClusterMember } from './cluster';

export function hitTestEditDrag(
    layout: LayoutNode[],
    clusterMetaById: ReadonlyMap<string, ClusterMeta>,
    x: number,
    y: number,
    memberOffsetsRecord: Record<string, { dx: number; dy: number }>,
): EditHit | null {
    for (let i = layout.length - 1; i >= 0; i--) {
        const ln = layout[i]!;
        if (x < ln.x || x > ln.x + ln.width || y < ln.y || y > ln.y + ln.height) continue;
        const cm = clusterMetaById.get(ln.node.id);
        if (cm && isClusterNode(ln.node)) {
            const member: C4Node | null = hitTestClusterMember(ln, cm, x, y, memberOffsetsRecord);
            if (member) {
                const idx = cm.members.findIndex((m) => m.id === member.id);
                if (idx >= 0)
                    return { kind: 'member', clusterId: ln.node.id, member, memberIdx: idx };
            }
            return { kind: 'node', nodeId: ln.node.id };
        }
        return { kind: 'node', nodeId: ln.node.id };
    }
    return null;
}
