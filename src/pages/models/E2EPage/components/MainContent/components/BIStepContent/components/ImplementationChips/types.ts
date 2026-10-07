export interface IImplementation {
    id: string;
    label: string;
}

export interface IImplementationChips {
    implementations: IImplementation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}
