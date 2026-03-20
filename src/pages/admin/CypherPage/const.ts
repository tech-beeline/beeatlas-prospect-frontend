import { CypherTabVariants, ViewStats } from './types';

export const DEFAULT_VIEW_MODE = CypherTabVariants.GRAPH;

export const CYPHER_TABS: readonly {
    id: CypherTabVariants;
    label: (stats: ViewStats) => string;
}[] = [
    {
        id: CypherTabVariants.GRAPH,
        label: ({ nodesCount, linksCount }) => `Граф (${nodesCount} узлов, ${linksCount} связей)`,
    },
    {
        id: CypherTabVariants.TABLE,
        label: ({ rowCount }) => `Таблица (${rowCount} записей)`,
    },
];

export const CYPHER_QUERY_EXAMPLES = [
    'MATCH (n) RETURN n LIMIT 25',
    'MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 50',
    'MATCH (n:SoftwareSystem) RETURN n LIMIT 20',
    'MATCH (n:DeploymentNode)-[r:Child]->(m) RETURN n, r, m LIMIT 30',
] as const;

export const MAX_SUCCESSFUL_QUERIES = 5;
export const SUCCESSFUL_QUERIES_SESSION_KEY = 'cypher:successful-queries';
