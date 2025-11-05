export interface IFilterSideblock {
    isAdmin: boolean;
    onClose: () => void;
    onGroupsChange: (groupIds: number[]) => void;
}

export interface IPatternGroupToEdit {
    name: string;
    id: number;
    parentId: number | null;
}
