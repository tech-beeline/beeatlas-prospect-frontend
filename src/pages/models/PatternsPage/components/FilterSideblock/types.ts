export interface IFilterSideblock {
    isAdmin: boolean;
    onClose: () => void;
    onGroupsChange: (groupIds: number[]) => void;
    selectedGroups: number[];
}

export interface IPatternGroupToEdit {
    name: string;
    id: number;
    parentId: number | null;
}
