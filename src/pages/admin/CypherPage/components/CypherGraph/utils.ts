import { ICypherDiagram } from 'api/graph/types';

import { LABEL_COLORS } from './const';
import { GraphData, GraphLink, GraphNode } from './types';

export function extractGraphData(records: ICypherDiagram[]): GraphData {
    const nodesMap = new Map<string, GraphNode>();
    const links: GraphLink[] = [];

    const labelsSet = new Set<string>();
    records.forEach(({ m, n }) =>
        [m, n].forEach((node) => {
            if (!node) return;
            labelsSet.add(node.labels?.[0] ?? 'Unknown');
        }),
    );
    const labelArray = [...labelsSet].sort();
    const labelColorMap = new Map(
        labelArray.map((label, i) => [label, LABEL_COLORS[i % LABEL_COLORS.length] as string]),
    );

    for (const record of records) {
        const { m, n, r } = record;

        [m, n].forEach((node) => {
            if (!node) return;
            const id = node.properties.structurizr_dsl_identifier || node.properties.name;
            if (!id || nodesMap.has(id)) return;

            const nodeLabel = node.labels?.[0] ?? 'Unknown';

            nodesMap.set(id, {
                id,
                name: node.properties.name || id,
                label: nodeLabel,
                cmdb: node.properties.technology,
                description: node.properties.description,
                graphTag: node.properties.graphTag,
                tags: node.properties.tags,
                originalName: node.properties.originalName,
                structurizrDslIdentifier: node.properties.structurizr_dsl_identifier,
                externalName: node.properties.external_name,
                val: 10,
                color: labelColorMap.get(nodeLabel)!,
                x: undefined,
                y: undefined,
            });
        });

        if (m && n && r?.type) {
            const sourceId = m.properties.structurizr_dsl_identifier || m.properties.name;
            const targetId = n.properties.structurizr_dsl_identifier || n.properties.name;
            if (sourceId && targetId)
                links.push({ source: sourceId, target: targetId, label: r.type });
        }
    }

    return { nodes: Array.from(nodesMap.values()), links };
}
