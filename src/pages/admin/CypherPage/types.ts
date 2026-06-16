export type ViewStats = {
    nodesCount: number;
    linksCount: number;
    rowCount: number;
};

export enum CypherTabVariants {
    TABLE = 'table',
    GRAPH = 'graph',
}

export enum CypherStatus {
    IDLE = 'idle',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface ICypherPageStore {
    successfulQueries: string[];
    addSuccessfulQuery: (query: string) => void;
    clearSuccessfulQueries: () => void;
}
