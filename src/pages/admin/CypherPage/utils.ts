import { AxiosError } from 'axios';

import { ICypherDiagram } from 'api/graph/types';

export const countNodesAndLinks = (
    records: ICypherDiagram[],
): { nodesCount: number; linksCount: number } => {
    const nodes = new Set<string>();
    const links = new Set<string>();

    for (const { m, n, r } of records) {
        if (m) nodes.add(m.properties.structurizr_dsl_identifier);
        if (n) nodes.add(n.properties.structurizr_dsl_identifier);

        if (m && n && r) {
            links.add(`${m.properties.name}-${r.type}-${n.properties.name}`);
        }
    }

    return {
        nodesCount: nodes.size,
        linksCount: links.size,
    };
};

export const getErrorMessage = (
    e: AxiosError<{ message: string; error: string }>,
    fallback: string,
): string => {
    return e?.response?.data?.message ?? e?.response?.data?.error ?? fallback;
};
