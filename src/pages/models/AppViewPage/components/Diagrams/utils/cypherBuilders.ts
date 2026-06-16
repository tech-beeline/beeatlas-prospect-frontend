import { C4Node } from '../components';
import { SHORTEST_PATH_MAX_HOPS } from '../const';
import { C4Label, GraphTag } from '../types';
import { escapeCypherString, graphTagPredicate } from '../utils';

export const buildSearchQuery = (tag: GraphTag, label: C4Label, name?: string): string => {
    const conditions = [graphTagPredicate('n', tag)];

    if (name?.trim()) {
        const q = escapeCypherString(name.trim());
        conditions.push(
            label === 'SoftwareSystem'
                ? `toLower(coalesce(n.cmdb,'')) = toLower('${q}')`
                : `toLower(coalesce(n.name,'')) CONTAINS toLower('${q}')`,
        );
    }

    return `
      MATCH (n:${label})
      WHERE ${conditions.join(' AND ')}
      RETURN n
      ORDER BY n.name
      LIMIT 100
    `.trim();
};

export const buildNeighborhoodQuery = (where: string): string => {
    return `
MATCH (anchor)
WHERE ${where}

OPTIONAL MATCH (anchor)-[]-(m)

WITH anchor,
     [x IN collect(DISTINCT m)
      WHERE x IS NOT NULL] AS neigh

WITH [anchor] + neigh AS nodes

UNWIND nodes AS n1
UNWIND nodes AS n2

WITH n1, n2

WHERE id(n1) < id(n2)

MATCH (n1)-[r]-(n2)

RETURN
  startNode(r) AS n,
  r,
  endNode(r) AS m

LIMIT 1000
  `.trim();
};

export const buildAnchorQuery = (where: string): string => {
    return `
  MATCH (anchor)
  WHERE ${where}
  RETURN anchor AS n
  LIMIT 1
    `.trim();
};

export const buildShortestPathQuery = (
    nodeA: C4Node,
    nodeB: C4Node,
    tag: GraphTag,
    anchorWhereClause: (node: C4Node, tag: GraphTag, alias: string) => string,
): string => {
    return `
  MATCH (a)
  WHERE ${anchorWhereClause(nodeA, tag, 'a')}
  
  MATCH (b)
  WHERE ${anchorWhereClause(nodeB, tag, 'b')}
  
  MATCH p = shortestPath(
    (a)-[*..${SHORTEST_PATH_MAX_HOPS}]-(b)
  )
  
  UNWIND relationships(p) AS r
  
  RETURN
    startNode(r) AS n,
    r,
    endNode(r) AS m
    `.trim();
};
