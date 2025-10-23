export interface IFilterSideblock {
    isAdmin: boolean;
    onClose: () => void;
}

export interface IPatternGroupToEdit {
    name: string;
    id: number;
    parentId: number | null;
}
