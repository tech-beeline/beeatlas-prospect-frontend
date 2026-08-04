export interface IE2EProcessRow {
    e2e: { name: string; operations: { operation: string; clients: string[] }[] };
    cmdb: string;
}
