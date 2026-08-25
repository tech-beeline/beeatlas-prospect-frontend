export interface IMapicTable {
    interfaceOption: string;
    discoveredSources: string[];

    cmdb: string;
}

export interface ISelectedMapicOperation {
    id: number | string;
    value: string;
    interfaceId: number;
}
